'use client';

import { useState } from "react";
import type { LatestVideo } from "@/lib/youtube";
import VideoCard from "@/components/VideoCard";
import ModalPlayer from "@/components/ModalPlayer";

type Props = {
  videos: LatestVideo[];
  gridClassName?: string;
  cardAspectClassName?: string;
  cardClassName?: string;
  staggerMs?: number;
  emptyText?: string;
};

/**
 * Client-side grid of videos that opens ModalPlayer on click.
 */
export default function ReelGrid({
  videos,
  gridClassName = "grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 md:gap-7",
  cardAspectClassName,
  cardClassName,
  staggerMs = 70,
  emptyText = "No videos found."
}: Props) {
  const [active, setActive] = useState<LatestVideo | null>(null);

  return (
    <>
      <div className={gridClassName}>
        {videos.map((video, index) => (
          <VideoCard
            key={video.videoId}
            title={video.title}
            thumbnail={video.thumbnail}
            videoId={video.videoId}
            publishedAt={video.publishedAt}
            onOpen={() => setActive(video)}
            className={cardClassName}
            aspectClassName={cardAspectClassName}
            style={{ animationDelay: `${index * staggerMs}ms` }}
          />
        ))}
        {videos.length === 0 && (
      <div className="col-span-full rounded-2xl border border-white/10 bg-logoBlue/5 px-6 py-10 text-center text-textsoft">
        {emptyText}
      </div>
        )}
      </div>

      <ModalPlayer
        open={!!active}
        videoId={active?.videoId || null}
        title={active?.title}
        onClose={() => setActive(null)}
      />
    </>
  );
}
