export const dynamic = "force-dynamic";
import { Metadata } from "next";
import { getLatestVideos, type LatestVideo } from "@/lib/youtube";
import VideoGrid from "./video-grid";

export const metadata: Metadata = {
  title: "Explore | Nepali Reels",
  description: "Latest cinematic reels from Nepali Reels."
};

export const revalidate = 300;

export default async function ExplorePage() {
  const videos = await getLatestVideos();

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

        <VideoGrid videos={videos} />
      </div>
    </main>
  );
}
