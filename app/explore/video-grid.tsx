'use client';

import type { LatestVideo } from "@/lib/youtube";
import ReelGrid from "@/components/ReelGrid";

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
  return (
    <ReelGrid
      videos={videos}
      gridClassName={gridClassName || "grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 md:gap-7"}
      cardAspectClassName={cardAspectClassName}
      cardClassName={cardClassName}
      staggerMs={staggerMs}
      emptyText={emptyText || "No videos found. Check your YouTube API key or try again later."}
    />
  );
}
