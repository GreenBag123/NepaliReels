'use client';

import { useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { LatestVideo } from "@/lib/youtube";

const FALLBACK_SHORTS: LatestVideo[] = [
  {
    title: "Terrace lightfall",
    videoId: "zvq7S0R6fV4",
    thumbnail: "https://i.ytimg.com/vi/zvq7S0R6fV4/hqdefault.jpg",
    publishedAt: "2024-04-01T00:00:00Z"
  },
  {
    title: "Alleys at dusk",
    videoId: "8ZpCqT56Uv8",
    thumbnail: "https://i.ytimg.com/vi/8ZpCqT56Uv8/hqdefault.jpg",
    publishedAt: "2024-03-14T00:00:00Z"
  },
  {
    title: "Lakeside still",
    videoId: "C0DPdy98e4c",
    thumbnail: "https://i.ytimg.com/vi/C0DPdy98e4c/hqdefault.jpg",
    publishedAt: "2024-02-20T00:00:00Z"
  },
  {
    title: "Patience on the terrace",
    videoId: "Jsg8UmP0Fx8",
    thumbnail: "https://i.ytimg.com/vi/Jsg8UmP0Fx8/hqdefault.jpg",
    publishedAt: "2023-11-05T00:00:00Z"
  }
];

function buildEmbedUrl(videoId: string) {
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&playsinline=1&modestbranding=1&rel=0&showinfo=0`;
}

type HeroProps = {
  shorts?: LatestVideo[];
};

export default function Hero({ shorts }: HeroProps) {
  const { scrollYProgress } = useScroll();
  const float = useTransform(scrollYProgress, [0, 1], [0, -12]);

  const framedShorts = useMemo(
    () => (shorts && shorts.length > 0 ? shorts.slice(0, 5) : FALLBACK_SHORTS.slice(0, 4)),
    [shorts]
  );

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-brand-bg-primary text-brand-text-soft">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.045),transparent_58%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/75" />
      <div className="absolute inset-0 bg-[url('/grain.png')] opacity-[0.08] mix-blend-overlay pointer-events-none" />

      <div className="absolute -left-10 top-10 h-[340px] w-[340px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,0,80,0.18),transparent_60%)] blur-3xl md:blur-[120px] opacity-70" />
      <div className="absolute -right-16 bottom-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,102,204,0.18),transparent_65%)] blur-3xl md:blur-[140px] opacity-70" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl md:max-w-7xl flex-col justify-center px-6 py-16 md:flex-row md:items-center md:justify-between md:px-10 md:py-24 gap-12 md:gap-16">
        <div className="relative z-10 max-w-xl space-y-4">
          <p className="text-xs uppercase tracking-[0.28em] text-logoBlue/70">Nepali Reels</p>
          <h1 className="text-4xl md:text-5xl font-semibold text-white leading-tight">
            Calm, cinematic shorts.
          </h1>
          <p className="text-base md:text-lg text-textsoft/80 max-w-lg">
            Quiet, vertical glimpses—muted, looping, ready to skim.
          </p>
        </div>

        <motion.div
          className="relative z-10 flex w-full max-w-2xl items-center justify-end gap-4 md:gap-6"
          style={{ y: float }}
        >
          {framedShorts.map((video, index) => (
            <motion.div
              key={video.videoId}
              className="relative aspect-[9/16] w-28 overflow-hidden rounded-3xl border border-white/10 bg-black/30 shadow-[0_18px_38px_rgba(0,0,0,0.35)] backdrop-blur-md md:w-32 lg:w-36"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.8, ease: "easeOut" }}
            >
              <iframe
                src={buildEmbedUrl(video.videoId)}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="h-full w-full scale-[1.02] transform-gpu pointer-events-none"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/35" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
