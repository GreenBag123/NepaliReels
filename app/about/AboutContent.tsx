'use client';

import Link from "next/link";
import { motion } from "framer-motion";

const pillars = [
  { title: "Quietly Cinematic", desc: "Slow pans, lingering frames, and a patient lens that lets moments breathe." },
  { title: "People First", desc: "Faces, voices, and rituals of Nepali life—captured with respect and calm curiosity." },
  { title: "Craft Over Hype", desc: "Intentional color, restrained motion, and sound design that supports the story." }
];

const timeline = [
  { year: "2023", title: "Frames of Home", detail: "Shot the first reels documenting everyday Kathmandu mornings." },
  { year: "2024", title: "Across Borders", detail: "Followed Nepali diaspora stories from Doha to Dallas." },
  { year: "2025", title: "Cinematic Nepal", detail: "Building a living library of human, atmospheric micro-stories." }
];

const stats = [
  { label: "Reels Published", value: "180+" },
  { label: "Cities Filmed", value: "24" },
  { label: "Hours on foot", value: "900+" },
  { label: "Community", value: "100k+" }
];

export default function AboutContent() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-brand-bg-primary text-brand-text-soft">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(0,84,166,0.18),transparent_45%),radial-gradient(circle_at_78%_12%,rgba(214,40,40,0.12),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-bg-primary via-brand-bg-primary/70 to-brand-bg-secondary" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay bg-[url('/grain.png')]" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-16 px-6 pb-20 pt-24 md:pt-28">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6 text-center"
        >
          <span className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.32em] text-white/80">
            About
          </span>
          <h1 className="text-4xl font-semibold leading-tight text-brand-text-strong sm:text-5xl">
            Calm, cinematic stories from Nepal and beyond.
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-brand-text-soft/90">
            Nepali Reels is a studio-built-in-public: a living ribbon of people, rituals, rain-soaked streets,
            foggy plains, and diaspora moments—crafted with restraint and intention.
          </p>
        </motion.section>

        <section className="grid gap-5 md:grid-cols-3">
          {pillars.map((item) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            className="rounded-2xl border border-white/8 bg-brand-bg-secondary/70 px-5 py-6 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur"
            >
              <h3 className="text-lg font-semibold text-brand-text-strong">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-text-soft/90">{item.desc}</p>
            </motion.div>
          ))}
        </section>

        <section className="rounded-[28px] border border-white/10 bg-gradient-to-br from-brand-bg-secondary/80 via-brand-bg-secondary/60 to-brand-bg-primary px-6 py-10 shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.3em] text-logoBlue">Trajectory</p>
              <h2 className="text-2xl font-semibold text-brand-text-strong md:text-3xl">How we got here</h2>
              <p className="max-w-xl text-sm leading-relaxed text-brand-text-soft">
                From Thamel footpaths to diaspora kitchens, each reel is built like a scene: composed, graded, and paced to invite calm attention.
              </p>
            </div>
            <div className="grid w-full gap-4 sm:grid-cols-2">
              {stats.map((item) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="rounded-xl border border-white/8 bg-brand-bg-secondary/70 px-4 py-4 text-left shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
                >
                  <p className="text-sm uppercase tracking-[0.22em] text-logoBlue/80">{item.label}</p>
                  <p className="mt-2 text-2xl font-semibold text-brand-text-strong">{item.value}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {timeline.map((entry) => (
              <motion.div
                key={entry.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="rounded-2xl border border-white/8 bg-brand-bg-secondary/70 px-5 py-5"
              >
                <p className="text-xs uppercase tracking-[0.25em] text-logoBlue/80">{entry.year}</p>
                <h3 className="mt-2 text-lg font-semibold text-brand-text-strong">{entry.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-text-soft/90">{entry.detail}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden rounded-[28px] border border-white/10 bg-brand-bg-secondary/80 px-6 py-10 shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(200,154,102,0.18),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.06),transparent_40%)]" />
          <div className="relative flex flex-col gap-6 text-left md:flex-row md:items-center md:justify-between">
            <div className="space-y-3 max-w-xl">
              <p className="text-xs uppercase tracking-[0.3em] text-logoBlue">Join the reel</p>
              <h3 className="text-2xl font-semibold text-brand-text-strong md:text-3xl">Watch, follow, and build with us.</h3>
              <p className="text-sm leading-relaxed text-brand-text-soft">
                Subscribe for slow, thoughtful reels. If you create, shoot, or produce in Nepal, we&apos;d love to collaborate.
              </p>
            </div>
            <div className="flex flex-col gap-3 text-sm font-semibold">
              <Link
                href="https://www.youtube.com/@nepalireelsglobal"
                target="_blank"
                className="rounded-full border border-logoBlue/60 bg-logoBlue/15 px-6 py-3 text-brand-text-strong transition hover:-translate-y-[2px] hover:border-logoBlue hover:bg-logoBlue/25"
              >
                Watch on YouTube
              </Link>
              <Link
                href="/explore"
                className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-brand-text-strong transition hover:-translate-y-[2px] hover:border-logoBlue/60 hover:text-logoBlue"
              >
                Explore reels
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
