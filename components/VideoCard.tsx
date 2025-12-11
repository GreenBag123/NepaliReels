'use client';

import { useMemo } from "react";
import type { CSSProperties } from "react";

type VideoCardProps = {
  title: string;
  thumbnail: string;
  videoId: string;
  publishedAt: string;
  onOpen?: () => void;
  style?: CSSProperties;
  className?: string;
  aspectClassName?: string;
};

export default function VideoCard({
  title,
  thumbnail,
  videoId,
  publishedAt,
  onOpen,
  style,
  className,
  aspectClassName
}: VideoCardProps) {
  const publishedLabel = useMemo(
    () =>
      new Date(publishedAt).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric"
      }),
    [publishedAt]
  );

  const handleOpen = () => {
    onOpen?.();
  };

  return (
    <button
      type="button"
      onClick={handleOpen}
      className={`group relative block overflow-hidden rounded-2xl border border-transparent bg-bg-secondary/70 shadow-soft transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:scale-[1.02] hover:shadow-blueGlow hover:border-logoBlue/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-logoBlue/80 animate-fade-up ${className || ""}`}
      style={style}
    >
      <span className="sr-only">Open {title}</span>
      <div className={`relative w-full overflow-hidden ${aspectClassName || "aspect-video"}`}>
        <div
          className="absolute inset-0 bg-cover bg-center transition duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.03]"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(10, 11, 13, 0.1), rgba(10, 11, 13, 0.3)), url(${thumbnail})`
          }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-bg-primary/40 to-transparent" />
        <div className="absolute inset-x-4 bottom-4 flex items-start justify-between gap-3 rounded-2xl bg-bg-secondary/70 px-4 py-3 backdrop-blur-lg ring-1 ring-white/10 transition group-hover:ring-logoBlue/40">
          <div className="space-y-1 text-left">
            <p className="text-xs uppercase tracking-[0.18em] text-logoBlue/70">
              {publishedLabel}
            </p>
            <h3 className="text-lg font-semibold leading-tight text-white line-clamp-2">
              {title}
            </h3>
          </div>
          <div className="glass rounded-full border-logoBlue/40 bg-logoBlue/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-logoBlue">
            Play
          </div>
        </div>
      </div>
    </button>
  );
}
