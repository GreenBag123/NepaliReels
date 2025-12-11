'use client';

import { useEffect, useState } from "react";

type ModalPlayerProps = {
  open: boolean;
  videoId: string | null;
  title?: string;
  onClose: () => void;
};

/**
 * Reusable modal player for YouTube videos with smooth fade in/out.
 */
export default function ModalPlayer({
  open,
  videoId,
  title,
  onClose
}: ModalPlayerProps) {
  const [visible, setVisible] = useState(open);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (open) {
      setVisible(true);
      setIsClosing(false);
    } else if (visible) {
      setIsClosing(true);
      const timeout = setTimeout(() => {
        setVisible(false);
        setIsClosing(false);
      }, 220);
      return () => clearTimeout(timeout);
    }
  }, [open, visible]);

  useEffect(() => {
    if (!visible) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [visible, onClose]);

  if (!visible || !videoId) return null;

  const backdropClass = isClosing ? "opacity-0" : "opacity-100";
  const panelClass = isClosing
    ? "opacity-0 translate-y-2 scale-[0.98]"
    : "opacity-100 translate-y-0 scale-100";

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm transition-opacity duration-200 ${backdropClass}`}
      role="dialog"
      aria-modal="true"
      aria-label={title || "Video modal"}
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-4xl overflow-hidden rounded-xl border border-white/10 bg-bg-primary/95 shadow-2xl transition-all duration-200 ${panelClass}`}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="absolute right-3 top-3 rounded-full border border-logoBlue/30 bg-logoBlue/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:border-logoBlue/60 hover:bg-logoBlue/20"
          onClick={onClose}
        >
          Close
        </button>
        <div className="relative aspect-video w-full overflow-hidden bg-bg-secondary">
          <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title || "YouTube player"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
