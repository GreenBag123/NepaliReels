'use client';

import Link from "next/link";
import { motion } from "framer-motion";

const contactCards = [
  {
    title: "Collaborations",
    desc: "Creators, filmmakers, and musicians who want to build a reel or series together.",
    cta: { label: "Email collaborations", href: "mailto:hello@nepalireels.com?subject=Collaboration%20Request" }
  },
  {
    title: "Press & Features",
    desc: "Interviews, features, and showcases about Nepali Reels and the stories we film.",
    cta: { label: "Press contact", href: "mailto:press@nepalireels.com?subject=Press%20Inquiry" }
  },
  {
    title: "Community",
    desc: "Tips, locations, or people we should film. Share a lead and we’ll follow up.",
    cta: { label: "Share a story", href: "mailto:stories@nepalireels.com?subject=Story%20Suggestion" }
  }
];

const quickLinks = [
  { label: "Watch on YouTube", href: "https://www.youtube.com/@nepalireelsglobal", external: true },
  { label: "Explore reels", href: "/explore" },
  { label: "Instagram", href: "https://www.instagram.com", external: true }
];

export default function ContactContent() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-brand-bg-primary text-brand-text-soft">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,84,166,0.18),transparent_45%),radial-gradient(circle_at_78%_15%,rgba(214,40,40,0.14),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-bg-primary via-brand-bg-primary/70 to-brand-bg-secondary" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay bg-[url('/grain.png')]" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-14 px-6 pb-20 pt-24 md:pt-28">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-5 text-center"
        >
          <span className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.32em] text-white/80">
            Contact
          </span>
          <h1 className="text-4xl font-semibold leading-tight text-brand-text-strong sm:text-5xl">
            Let&apos;s make the next reel unforgettable.
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-brand-text-soft/90">
            Collaborations, stories, press, or community leads—reach out and we&apos;ll respond with care.
          </p>
        </motion.section>

        <section className="grid gap-5 md:grid-cols-3">
          {contactCards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: idx * 0.05 }}
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-6 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur"
            >
              <h3 className="text-lg font-semibold text-brand-text-strong">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-text-soft/90">{card.desc}</p>
              <Link
                href={card.cta.href}
                target={card.cta.href.startsWith("http") ? "_blank" : undefined}
                className="mt-4 inline-flex items-center justify-center rounded-full border border-logoBlue/50 bg-logoBlue/15 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-[2px] hover:border-logoBlue hover:bg-logoBlue/25"
              >
                {card.cta.label}
              </Link>
            </motion.div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <motion.form
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="rounded-[28px] border border-white/10 bg-brand-bg-secondary/80 px-6 py-8 shadow-[0_18px_60px_rgba(0,0,0,0.35)] space-y-5"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-logoBlue">Write to us</p>
              <h2 className="text-2xl font-semibold text-brand-text-strong md:text-3xl">Drop a note</h2>
              <p className="text-sm leading-relaxed text-brand-text-soft">
                We read every message. Keep it concise; share links if helpful.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm font-semibold text-brand-text-strong/90">
                Name
                <input
                  type="text"
                  name="name"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-brand-text-soft/70 focus:border-logoBlue/60 focus:outline-none focus:ring-1 focus:ring-logoBlue/50"
                  placeholder="Your name"
                  required
                />
              </label>
              <label className="space-y-2 text-sm font-semibold text-brand-text-strong/90">
                Email
                <input
                  type="email"
                  name="email"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-brand-text-soft/70 focus:border-logoBlue/60 focus:outline-none focus:ring-1 focus:ring-logoBlue/50"
                  placeholder="you@example.com"
                  required
                />
              </label>
            </div>

            <label className="space-y-2 text-sm font-semibold text-brand-text-strong/90">
              Message
              <textarea
                name="message"
                rows={4}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-brand-text-soft/70 focus:border-logoBlue/60 focus:outline-none focus:ring-1 focus:ring-logoBlue/50"
                placeholder="Tell us about your idea, story, or request."
                required
              />
            </label>

            <div className="flex flex-wrap gap-3 text-sm font-semibold">
              <button
                type="submit"
                className="rounded-full border border-logoBlue/60 bg-logoBlue/20 px-5 py-3 text-white transition hover:-translate-y-[1px] hover:border-logoBlue hover:bg-logoBlue/30"
              >
                Send message
              </button>
              <Link
                href="mailto:hello@nepalireels.com"
                className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-white transition hover:-translate-y-[1px] hover:border-logoRed/60 hover:bg-logoRed/15"
              >
                Email directly
              </Link>
            </div>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="rounded-[24px] border border-white/10 bg-white/5 px-5 py-6 shadow-[0_14px_45px_rgba(0,0,0,0.35)] backdrop-blur"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-logoBlue">Quick links</p>
            <div className="mt-4 flex flex-col gap-3 text-sm font-semibold">
              {quickLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-bg-secondary/70 px-4 py-3 text-white transition hover:-translate-y-[1px] hover:border-logoBlue/50 hover:bg-logoBlue/10"
                >
                  <span>{item.label}</span>
                  <span className="text-xs uppercase tracking-[0.22em] text-logoRed/80">Go</span>
                </Link>
              ))}
            </div>
            <div className="mt-6 rounded-xl border border-logoRed/30 bg-logoRed/10 px-4 py-4 text-sm text-white shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
              Prefer a quick note? Email <span className="font-semibold">hello@nepalireels.com</span>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
