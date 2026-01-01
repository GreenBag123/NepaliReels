'use client';

import type { LatestVideo } from "@/lib/youtube";
import ReelGrid from "@/components/ReelGrid";
import { useMemo, useState } from "react";

type Props = {
  videos: LatestVideo[];
  gridClassName?: string;
  cardAspectClassName?: string;
  cardClassName?: string;
  staggerMs?: number;
  emptyText?: string;
};

export default function VideoGrid({
  videos,
  gridClassName,
  cardAspectClassName,
  cardClassName,
  staggerMs,
  emptyText
}: Props) {
  const INITIAL_COUNT = 6;
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const shown = useMemo(() => videos.slice(0, visibleCount), [videos, visibleCount]);
  const canLoadMore = visibleCount < videos.length;

  return (
    <div className="space-y-6">
      <ReelGrid
        videos={shown}
        gridClassName={gridClassName || "grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 md:gap-7"}
        cardAspectClassName={cardAspectClassName}
        cardClassName={cardClassName}
        staggerMs={staggerMs}
        emptyText={emptyText || "No videos found. Check your YouTube API key or try again later."}
      />
      {videos.length > 0 && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => {
              if (!canLoadMore) return;
              setVisibleCount((prev) => Math.min(prev + 6, videos.length));
            }}
            disabled={!canLoadMore}
            className={`rounded-full border px-5 py-2 text-sm font-semibold transition ${
              canLoadMore
                ? "border-white/15 bg-white/5 text-brand-text-strong hover:-translate-y-[2px] hover:border-logoBlue/60 hover:text-logoBlue"
                : "cursor-not-allowed border-white/10 bg-white/5 text-brand-text-soft/60"
            }`}
          >
            {canLoadMore ? "Load more" : "All caught up"}
          </button>
        </div>
      )}
    </div>
  );
}
