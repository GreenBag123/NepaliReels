'use client';

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export default function GlobalBackground() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();

  const factor = prefersReducedMotion ? 0 : 1;
  const redY = useTransform(scrollY, [0, 1200], [0, -40 * factor]);
  const redX = useTransform(scrollY, [0, 1200], [0, -20 * factor]);
  const redScale = useTransform(scrollY, [0, 1200], [1, 1.04]);

  const blueY = useTransform(scrollY, [0, 1200], [0, 36 * factor]);
  const blueX = useTransform(scrollY, [0, 1200], [0, 18 * factor]);
  const blueScale = useTransform(scrollY, [0, 1200], [1, 1.03]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/75" aria-hidden />

      <motion.div
        aria-hidden
        className="absolute -left-[18vw] top-[6vh] h-[60vw] w-[60vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,42,86,0.16),rgba(255,42,86,0)_62%)] blur-[140px] md:blur-[180px] opacity-80"
        style={{ x: redX, y: redY, scale: redScale }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.6 }}
      />

      <motion.div
        aria-hidden
        className="absolute -right-[20vw] bottom-[-4vh] h-[66vw] w-[66vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(20,108,255,0.16),rgba(20,108,255,0)_64%)] blur-[150px] md:blur-[200px] opacity-75"
        style={{ x: blueX, y: blueY, scale: blueScale }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.6 }}
      />
    </div>
  );
}
