import Link from "next/link";
import { getLatestVideos, type LatestVideo } from "@/lib/youtube";
import ReelGrid from "@/components/ReelGrid";

export const revalidate = 300;

const featuredVideos: LatestVideo[] = [
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
  }
];

function pickStableSet<T>(items: T[], count: number, windowDays = 2): T[] {
  if (!items || items.length === 0 || count <= 0) return [];
  const windowIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24 * windowDays));
  const result: T[] = [];
  for (let i = 0; i < count && i < items.length; i++) {
    const idx = (windowIndex + i) % items.length;
    result.push(items[idx]);
  }
  return result;
}

export default async function Page() {
  const { landscape, shorts } = await getLatestVideos();
  const latest = landscape.slice(0, 6);
  const latestShorts = shorts.slice(0, 6);
  const dynamicFeatured = pickStableSet(landscape, 3);

  const featuredList = [...dynamicFeatured, ...featuredVideos].reduce<LatestVideo[]>((acc, item) => {
    if (acc.some((v) => v.videoId === item.videoId)) return acc;
    acc.push(item);
    return acc;
  }, []).slice(0, 3);

  return (
    <div className="bg-bg-primary">
      <div className="relative overflow-hidden bg-bg-primary">
        <section className="relative min-h-screen w-full overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[url('/hero-baclground.png')] bg-cover bg-center" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/35 to-black/80" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_55%)]" />

          <div className="relative mx-auto max-w-6xl md:max-w-7xl px-6 md:px-10 pt-24 pb-16">
            <div className="max-w-3xl space-y-5">
              <p className="text-xs uppercase tracking-[0.28em] text-logoBlue/70">Featured</p>
              <h1 className="text-4xl md:text-5xl font-semibold text-white leading-tight">
                Stories of Nepal and the Nepali People
              </h1>
              <p className="text-base md:text-lg text-textsoft">
                Documenting Nepali life, culture, memory, and migration - from villages and cities to Nepali communities around the world.
              </p>
              <p className="text-sm text-textsoft">
                Selected long-form episodes documenting Nepali life, culture, and memory.
              </p>
            </div>

            <div className="mt-10">
              <ReelGrid
                videos={featuredList}
                gridClassName="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                cardAspectClassName="aspect-[16/9]"
                cardClassName="rounded-3xl md:rounded-[26px]"
                staggerMs={90}
              />
            </div>
          </div>
        </section>

        <div className="relative">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[340px] bg-gradient-to-b from-logoBlue/18 via-transparent to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[320px] bg-gradient-to-t from-bg-secondary via-transparent to-transparent" />

          <div className="relative mx-auto max-w-6xl md:max-w-7xl px-6 md:px-10 pb-24 space-y-16">

          <div className="pointer-events-none h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent" />

          <section className="space-y-6">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.28em] text-logoBlue/70">Explore</p>
                <h2 className="text-2xl md:text-3xl font-semibold text-white">
                  Latest episodes
                </h2>
                <p className="text-sm text-textsoft max-w-2xl">
                  Fresh, chronological drops in landscape for a calmer viewing run.
                </p>
              </div>
              <Link
                href="/explore"
                className="rounded-full bg-logoBlue px-4 py-2 text-sm font-semibold text-white transition hover:bg-logoBlue/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-logoBlue/60"
              >
                View all
              </Link>
            </div>
            <ReelGrid
              videos={latest}
              gridClassName="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 md:gap-6"
              cardAspectClassName="aspect-video"
              staggerMs={70}
              emptyText="No latest videos yet."
            />
          </section>

          <div className="pointer-events-none h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent" />

          <section className="space-y-5">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.28em] text-logoBlue/70">Shorts</p>
                <h2 className="text-2xl md:text-3xl font-semibold text-white">
                  Browse our shorts
                </h2>
                <p className="text-sm text-textsoft max-w-xl">
                  Quick vertical moments, separate from our long-form focus.
                </p>
              </div>
              <Link
                href="/explore#shorts"
                className="rounded-full bg-logoBlue px-4 py-2 text-sm font-semibold text-white transition hover:bg-logoBlue/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-logoBlue/60"
              >
                View all shorts
              </Link>
            </div>
            <ReelGrid
              videos={latestShorts}
              gridClassName="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6"
              cardAspectClassName="aspect-[9/16]"
              cardClassName="rounded-2xl"
              staggerMs={40}
              emptyText="No shorts yet."
            />
          </section>

          <section className="mt-20 relative overflow-hidden rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_18%_18%,rgba(0,84,166,0.14),transparent),linear-gradient(145deg,rgba(255,255,255,0.03),rgba(255,255,255,0))] px-6 py-12 md:px-10 md:py-16 lg:px-14 lg:py-20 shadow-blueGlow">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
            <div className="relative mx-auto flex max-w-3xl flex-col gap-5 text-left md:text-center">
              <div className="flex flex-col items-start gap-3 md:items-center">
                <span className="text-xs uppercase tracking-[0.28em] text-logoBlue/70">
                  About
                </span>
                <h2 className="relative text-3xl font-semibold leading-tight text-white md:text-4xl after:content-[''] after:block after:w-24 after:h-[2px] after:bg-gradient-to-r after:from-logoBlue after:to-logoRed after:mt-3">
                  Crafted for calm, cinematic moments
                </h2>
              </div>
              <p className="text-lg font-light leading-relaxed text-textsoft md:text-xl">
                Stories of Nepali life from Kathmandu streets to the global diaspora, captured with honesty, calm, and cinematic clarity.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
    </div>
  );
}
