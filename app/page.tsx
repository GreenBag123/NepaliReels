import Link from "next/link";
import { getLatestVideos, type LatestVideo } from "@/lib/youtube";
import ReelGrid from "@/components/ReelGrid";
import Hero from "./(components)/Hero";

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

export default async function Page() {
  const { landscape, shorts } = await getLatestVideos();
  const latest = landscape.slice(0, 6);
  const latestShorts = shorts.slice(0, 6);

  return (
    <div className="bg-bg-primary">
      <Hero shorts={latestShorts} />

      <div className="relative overflow-hidden bg-bg-primary">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[340px] bg-gradient-to-b from-logoBlue/18 via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[320px] bg-gradient-to-t from-bg-secondary via-transparent to-transparent" />

        <div className="relative mx-auto max-w-6xl md:max-w-7xl px-6 md:px-10 pb-28 space-y-20">
          <section className="pt-10 space-y-8">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.28em] text-logoBlue/70">Featured</p>
                <h2 className="text-3xl md:text-4xl font-semibold text-white relative after:content-[''] after:block after:w-24 after:h-[2px] after:bg-gradient-to-r after:from-logoBlue after:to-logoRed after:mt-3">
                  Signature reels
                </h2>
                <p className="text-sm text-textsoft max-w-2xl">
                  A tighter, handpicked set of long-form cuts that set the tone.
                </p>
              </div>
            </div>
            <ReelGrid
              videos={featuredVideos}
              gridClassName="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              cardAspectClassName="aspect-[16/9]"
              cardClassName="rounded-3xl md:rounded-[26px]"
              staggerMs={90}
            />
          </section>

          <div className="pointer-events-none h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent" />

          <section className="space-y-6">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.28em] text-logoBlue/70">Explore</p>
                <h2 className="text-2xl md:text-3xl font-semibold text-white">
                  Latest reels
                </h2>
                <p className="text-sm text-textsoft max-w-2xl">
                  Fresh, chronological drops in landscape for a calmer viewing run.
                </p>
              </div>
              <Link
                href="/explore"
                className="text-sm font-semibold text-logoBlue underline-offset-4 transition hover:text-logoBlue/80 hover:underline"
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
                  Latest shorts
                </h2>
                <p className="text-sm text-textsoft max-w-xl">
                  Quick, vertical moments—compact and easy to skim.
                </p>
              </div>
              <Link
                href="/explore#shorts"
                className="text-sm font-semibold text-logoBlue underline-offset-4 transition hover:text-logoBlue/80 hover:underline"
              >
                View all shorts
              </Link>
            </div>
            <ReelGrid
              videos={latestShorts}
              gridClassName="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4"
              cardAspectClassName="aspect-[9/16]"
              staggerMs={50}
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
  );
}
