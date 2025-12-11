'use client';

import type { LatestVideo } from "@/lib/youtube";
import ReelGrid from "@/components/ReelGrid";

type Props = {
  videos: LatestVideo[];
};

export default function VideoGrid({ videos }: Props) {
  return (
    <ReelGrid
      videos={videos}
      gridClassName="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 md:gap-7"
      emptyText="No videos found. Check your YouTube API key or try again later."
    />
  );
}
