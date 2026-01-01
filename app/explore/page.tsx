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
  const { landscape } = await getLatestVideos();

  return (
    <main className="relative min-h-screen overflow-hidden bg-brand-bg-primary text-brand-text-soft pb-18">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(0,84,166,0.18),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(214,40,40,0.12),transparent_42%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-bg-primary via-brand-bg-primary/70 to-brand-bg-secondary" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay bg-[url('/grain.png')]" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 pb-20 pt-24 md:pt-28">
        <header className="space-y-5 text-center md:text-left">
          <div className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-white/80">
            Explore
          </div>
          <div className="space-y-3">
            <h1 className="text-4xl font-semibold leading-tight text-brand-text-strong sm:text-5xl">
              Full-length reels, in one place.
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-brand-text-soft/90 md:mx-0">
              Calm, cinematic landscapes—no shorts here. Drift through the latest long-form drops.
            </p>
          </div>
        </header>

        <section className="rounded-[28px] border border-white/10 bg-gradient-to-br from-brand-bg-secondary/80 via-brand-bg-secondary/60 to-brand-bg-primary px-6 py-10 shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.28em] text-logoBlue">Landscape</p>
              <h2 className="text-2xl font-semibold text-brand-text-strong md:text-3xl">Latest reels</h2>
              <p className="text-sm text-brand-text-soft/90">Full-length frames with room to breathe.</p>
            </div>
          </div>

          <div className="mt-8">
            <VideoGrid videos={landscape} />
          </div>
        </section>
      </div>
    </main>
  );
}
