'use client';

import { useMemo, useState, type MouseEvent } from "react";
import { motion, useMotionValue, useMotionValueEvent, useScroll, useTransform } from "framer-motion";

const CLIP_COUNT = 12;

const clipPool = [
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
];

function generateClips() {
  return Array.from({ length: CLIP_COUNT }, (_, idx) => clipPool[idx % clipPool.length]);
}

const RibbonClip = ({ clip, index, compact }: { clip: string; index: number; compact?: boolean }) => (
  <motion.div
    initial={{ y: 0 }}
    animate={{
      y: [0, -8, 0],
      rotateZ: [0, -0.4, 0]
    }}
    transition={{
      duration: 6 + (index % 3),
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [-2, 2, -2] }}
      transition={{ duration: 6 + (index % 5), repeat: Infinity, ease: "easeInOut" }}
      className="
        group relative overflow-hidden
        h-[260px] w-[175px]
        rounded-[26px]
        border border-white/10
        bg-white/5
        shadow-[0_8px_25px_rgba(0,0,0,0.55)]
        transition-transform duration-[1200ms]
        hover:scale-[1.05]
        will-change-transform
      "
    >
      <video
        src={clip}
        muted
        loop
        playsInline
        autoPlay
        preload="none"
        className="h-full w-full object-cover rounded-[26px]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent rounded-[26px] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 rounded-[26px] pointer-events-none" />
    </motion.div>
  </motion.div>
);

export default function Hero() {
  const clips = useMemo(() => generateClips(), []);
  const { scrollYProgress } = useScroll();

  const slowFactor = useTransform(scrollYProgress, [0, 1], [1, 0.6]);
  const ribbonOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.75]);
  const ribbonShift = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const logoScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const titleLift = useTransform(scrollYProgress, [0, 1], [0, 8]);
  const mobileRibbonShift = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const [desktopDuration, setDesktopDuration] = useState(32);
  const [mobileDuration, setMobileDuration] = useState(46);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const parallaxX = useTransform(mouseX, [-0.5, 0.5], ["-38px", "38px"]);
  const parallaxY = useTransform(mouseY, [-0.5, 0.5], ["-18px", "18px"]);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const { innerWidth, innerHeight } = window;
    const offsetX = event.clientX / innerWidth - 0.5;
    const offsetY = event.clientY / innerHeight - 0.5;
    mouseX.set(offsetX);
    mouseY.set(offsetY);
  };

  useMotionValueEvent(slowFactor, "change", (value) => {
    const safe = Math.max(0.35, value);
    setDesktopDuration(32 / safe);
    setMobileDuration(46 / safe);
  });

  return (
    <section
      className="relative h-screen w-full overflow-hidden bg-brand-bg-primary text-brand-text-soft"
      onMouseMove={handleMouseMove}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.045),transparent_58%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/75" />
      <div className="absolute inset-0 bg-[url('/grain.png')] opacity-[0.08] mix-blend-overlay pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0)_45%,rgba(0,0,0,0.25)_100%)] z-20" />
      <motion.div
        initial={{ x: "-150%", opacity: 0 }}
        animate={{ x: "150%", opacity: 0.45 }}
        transition={{ duration: 2.2, ease: "easeOut" }}
        className="absolute top-0 left-0 w-[40%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent blur-[60px] pointer-events-none z-[50]"
      />

      <div className="absolute inset-0 flex items-start justify-center pt-28 overflow-hidden">
        <motion.div
          className="hidden md:flex h-[45vh] items-center justify-center translate-y-[14vh] will-change-transform"
          style={{
            opacity: ribbonOpacity,
            x: ribbonShift,
            ["--ribbon-duration" as any]: `${desktopDuration}s`,
            willChange: "transform"
          }}
        >
          <div className="ribbon-mask absolute inset-0 z-10" />
          <div className="flex gap-6 md:gap-8 animate-ribbon-scroll will-change-transform">
            {/* ORIGINAL CLIPS */}
            {clips.map((clip, idx) => (
              <motion.div
                key={idx}
                className="relative"
                style={{
                  filter: idx === Math.floor(clips.length / 2) ? "none" : "blur(1.2px)",
                  scale: 1 - Math.abs(Math.floor(clips.length / 2) - idx) * 0.06,
                  y: Math.abs(Math.floor(clips.length / 2) - idx) * 6,
                  rotateY: idx < Math.floor(clips.length / 2) ? -7 : idx > Math.floor(clips.length / 2) ? 7 : 0
                }}
              >
                <RibbonClip clip={clip} index={idx} />
              </motion.div>
            ))}

            {/* DUPLICATE CLIPS FOR LOOP */}
            {clips.map((clip, idx) => (
              <motion.div
                key={idx}
                className="relative"
                style={{
                  filter: idx === Math.floor(clips.length / 2) ? "none" : "blur(1.2px)",
                  scale: 1 - Math.abs(Math.floor(clips.length / 2) - idx) * 0.06,
                  y: Math.abs(Math.floor(clips.length / 2) - idx) * 6,
                  rotateY: idx < Math.floor(clips.length / 2) ? -7 : idx > Math.floor(clips.length / 2) ? 7 : 0
                }}
              >
                <RibbonClip clip={clip} index={idx} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="flex h-[110vh] w-full items-center justify-center md:hidden"
          style={{ opacity: ribbonOpacity, y: mobileRibbonShift }}
        >
          <div className="ribbon-mask absolute inset-0 z-10" />
          <motion.div
            className="flex h-[140%] flex-col gap-5 will-change-transform"
            animate={{ y: ["0%", "-24%", "0%"] }}
            transition={{ repeat: Infinity, duration: mobileDuration, ease: "easeInOut" }}
          >
            {clips.map((clip, idx) => (
              <motion.div
                key={idx}
                className="relative"
                style={{
                  filter: idx === Math.floor(clips.length / 2) ? "none" : "blur(1.2px)",
                  scale: 1 - Math.abs(Math.floor(clips.length / 2) - idx) * 0.06,
                  y: Math.abs(Math.floor(clips.length / 2) - idx) * 6,
                  rotateY: idx < Math.floor(clips.length / 2) ? -7 : idx > Math.floor(clips.length / 2) ? 7 : 0
                }}
              >
                <RibbonClip clip={clip} index={idx} compact />
              </motion.div>
            ))}
            {clips.map((clip, idx) => (
              <motion.div
                key={idx}
                className="relative"
                style={{
                  filter: idx === Math.floor(clips.length / 2) ? "none" : "blur(1.2px)",
                  scale: 1 - Math.abs(Math.floor(clips.length / 2) - idx) * 0.06,
                  y: Math.abs(Math.floor(clips.length / 2) - idx) * 6,
                  rotateY: idx < Math.floor(clips.length / 2) ? -7 : idx > Math.floor(clips.length / 2) ? 7 : 0
                }}
              >
                <RibbonClip clip={clip} index={idx} compact />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
