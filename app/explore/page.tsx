export const dynamic = "force-dynamic";
import { Metadata } from "next";
import { getLatestVideos } from "@/lib/youtube";
import VideoGrid from "./video-grid";

export const metadata: Metadata = {
  title: "Explore | Nepali Reels",
  description: "Latest cinematic reels from Nepali Reels."
};

export const revalidate = 300;

export default async function ExplorePage() {
  const { landscape, shorts } = await getLatestVideos();

  return (
    <main className="relative min-h-screen bg-bg-primary pb-16 pt-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[360px] bg-gradient-to-b from-logoBlue/18 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[280px] bg-gradient-to-t from-bg-secondary via-transparent to-transparent" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6">
        <header className="space-y-4 animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-logoBlue/40 bg-logoBlue/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-logoBlue/80 shadow-blueGlow">
            Explore
          </div>
          <div className="space-y-3">
            <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
              Latest from Nepali Reels
            </h1>
              <p className="max-w-2xl text-lg font-light leading-relaxed text-textsoft">
                Calm, cinematic frames from Nepal. Slow fades, rounded corners, and a
                minimal grid built for focus.
              </p>
          </div>
        </header>

        <section className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.28em] text-logoBlue/70">Landscape</p>
            <h2 className="text-2xl font-semibold text-white md:text-3xl">
              Latest reels
            </h2>
          </div>
          <VideoGrid videos={landscape} />
        </section>

        <section id="shorts" className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.28em] text-logoBlue/70">Shorts</p>
            <h2 className="text-2xl font-semibold text-white md:text-3xl">
              Latest shorts
            </h2>
            <p className="max-w-2xl text-base text-textsoft">
              Quick vertical clips straight from the feed.
            </p>
          </div>
          <VideoGrid
            videos={shorts}
            gridClassName="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-6"
            cardAspectClassName="aspect-[9/16]"
          />
        </section>
      </div>
    </main>
  );
}
