export type LatestVideo = {
  title: string;
  videoId: string;
  thumbnail: string;
  publishedAt: string;
};

export type LatestVideosByType = {
  landscape: LatestVideo[];
  shorts: LatestVideo[];
};

const MAX_RESULTS = 12;
const CHANNEL_ID = "UCP51fTdeBJXWGMhDssJ-wIw";
const RSS_FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
const SHORT_MAX_SECONDS = 60;
const YT_API_URL = "https://www.googleapis.com/youtube/v3/videos";
const YT_BATCH_SIZE = 50; // API limit is 50 ids per call

const FALLBACK_VIDEOS: LatestVideo[] = [
  {
    title: "Himalayan Dawn",
    videoId: "zvq7S0R6fV4",
    publishedAt: "2024-04-01T00:00:00Z",
    thumbnail: "https://i.ytimg.com/vi/zvq7S0R6fV4/hqdefault.jpg"
  },
  {
    title: "Kathmandu Alleys at Dusk",
    videoId: "8ZpCqT56Uv8",
    publishedAt: "2024-03-14T00:00:00Z",
    thumbnail: "https://i.ytimg.com/vi/8ZpCqT56Uv8/hqdefault.jpg"
  },
  {
    title: "Lakeside Silence in Pokhara",
    videoId: "C0DPdy98e4c",
    publishedAt: "2024-02-20T00:00:00Z",
    thumbnail: "https://i.ytimg.com/vi/C0DPdy98e4c/hqdefault.jpg"
  },
  {
    title: "Patience on the Terrace",
    videoId: "Jsg8UmP0Fx8",
    publishedAt: "2023-11-05T00:00:00Z",
    thumbnail: "https://i.ytimg.com/vi/Jsg8UmP0Fx8/hqdefault.jpg"
  },
  {
    title: "Mist Over Nagarkot",
    videoId: "4xDzrJKXOOY",
    publishedAt: "2023-08-18T00:00:00Z",
    thumbnail: "https://i.ytimg.com/vi/4xDzrJKXOOY/hqdefault.jpg"
  },
  {
    title: "Quiet Market Morning",
    videoId: "7wtfhZwyrcc",
    publishedAt: "2023-05-02T00:00:00Z",
    thumbnail: "https://i.ytimg.com/vi/7wtfhZwyrcc/hqdefault.jpg"
  }
];

function decodeHtmlEntities(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) =>
      String.fromCharCode(Number.parseInt(hex, 16))
    )
    .replace(/&#(\d+);/g, (_, dec) =>
      String.fromCharCode(Number.parseInt(dec, 10))
    );
}

function parseRssFeed(xml: string): LatestVideo[] {
  // Manual regex loop to avoid `matchAll` so builds don't require downlevel iteration support.
  const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
  const entries: string[] = [];
  let match: RegExpExecArray | null;
  while ((match = entryRegex.exec(xml)) !== null) {
    entries.push(match[1]);
  }

  const videos =
    entries
      .map((entry) => {
        const get = (pattern: RegExp) => entry.match(pattern)?.[1]?.trim() || "";
        const videoId = get(/<yt:videoId>([^<]+)<\/yt:videoId>/);
        const title = decodeHtmlEntities(get(/<title>([^<]+)<\/title>/));
        const publishedAt = get(/<published>([^<]+)<\/published>/);
        const thumbnail =
          get(/<media:thumbnail[^>]*url="([^"]+)"/) ||
          (videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : "");

        if (!videoId || !title || !publishedAt) return null;

        return { title, videoId, thumbnail, publishedAt } satisfies LatestVideo;
      })
      .filter((item): item is LatestVideo => Boolean(item)) || [];

  return videos
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() -
        new Date(a.publishedAt).getTime()
    )
    .slice(0, MAX_RESULTS);
}

function parseIsoDurationToSeconds(duration: string): number {
  const match = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/i.exec(duration);
  if (!match) return Number.POSITIVE_INFINITY;
  const [, h, m, s] = match;
  return (Number(h || 0) * 3600) + (Number(m || 0) * 60) + Number(s || 0);
}

async function fetchDurations(videoIds: string[]): Promise<Record<string, number>> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey || videoIds.length === 0) return {};

  const idChunks: string[][] = [];
  for (let i = 0; i < videoIds.length; i += YT_BATCH_SIZE) {
    idChunks.push(videoIds.slice(i, i + YT_BATCH_SIZE));
  }

  const durations: Record<string, number> = {};
  for (const chunk of idChunks) {
    const params = new URLSearchParams({
      part: "contentDetails",
      id: chunk.join(","),
      key: apiKey
    });

    const response = await fetch(`${YT_API_URL}?${params.toString()}`, {
      next: { revalidate: 300 }
    });

    if (!response.ok) {
      console.warn("YouTube duration lookup failed", response.status, response.statusText);
      continue;
    }

    const data = await response.json();
    for (const item of data.items || []) {
      const id = item.id as string | undefined;
      const isoDuration = item.contentDetails?.duration as string | undefined;
      if (!id || !isoDuration) continue;
      durations[id] = parseIsoDurationToSeconds(isoDuration);
    }
  }

  return durations;
}

function splitByDuration(videos: LatestVideo[], durations: Record<string, number>): LatestVideosByType {
  const landscape: LatestVideo[] = [];
  const shorts: LatestVideo[] = [];

  for (const video of videos) {
    const seconds = durations[video.videoId];
    const isShort = Number.isFinite(seconds) && seconds <= SHORT_MAX_SECONDS;
    if (isShort) {
      shorts.push(video);
    } else {
      landscape.push(video);
    }
  }

  return { landscape, shorts };
}

async function fetchText(url: string): Promise<string> {
  const response = await fetch(url, { next: { revalidate: 300 } });
  if (!response.ok) {
    throw new Error(`YouTube feed request failed: ${response.status} ${response.statusText}`);
  }
  return response.text();
}

/**
 * Fetch the latest videos for Nepali Reels via the public RSS feed.
 * Falls back to a local list when the feed is unavailable.
 */
export async function getLatestVideos(): Promise<LatestVideosByType> {
  try {
    const xml = await fetchText(RSS_FEED_URL);
    const videos = parseRssFeed(xml);
    if (videos.length === 0) {
      return { landscape: FALLBACK_VIDEOS.slice(0, MAX_RESULTS), shorts: [] };
    }

    try {
      const durations = await fetchDurations(videos.map((v) => v.videoId));
      const split = splitByDuration(videos, durations);
      if (split.landscape.length + split.shorts.length > 0) {
        return split;
      }
    } catch (durationError) {
      console.warn("Falling back to unsplit videos; duration lookup failed.", durationError);
    }

    return { landscape: videos, shorts: [] };
  } catch (error) {
    console.warn("Using fallback videos because the YouTube feed is unavailable.", error);
  }

  return { landscape: FALLBACK_VIDEOS.slice(0, MAX_RESULTS), shorts: [] };
}
