'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/images/logo.png";

const navItems = [
  { label: "Explore", href: "/explore" },
  { label: "YouTube", href: "https://www.youtube.com/@nepalireelsglobal", external: true },
  { label: "About", href: "/about" }
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative sticky top-0 z-40 h-[70px] w-full border-b border-white/5 bg-bg-primary/80 backdrop-blur-2xl transition-opacity duration-700 animate-fade-in">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-5 md:px-6">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-full px-2 py-1 text-white transition hover:text-logoBlue"
        >
          <Image
            src={logo}
            alt="Nepali Reels"
            className="h-8 w-auto"
            priority
          />
          <span className="text-lg font-semibold tracking-wide">Nepali Reels</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-textsoft">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
              className="relative border-b border-transparent pb-1 transition duration-200 opacity-80 hover:opacity-100 hover:border-logoBlue/70 hover:text-logoBlue/80 aria-[current=page]:text-logoBlue aria-[current=page]:font-medium aria-[current=page]:border-logoBlue"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
          className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-logoBlue/60 hover:bg-logoBlue/10 md:hidden"
        >
          <span
            className={`block h-[2px] w-5 rounded bg-white transition-transform duration-200 ${
              open ? "translate-y-1 rotate-45" : "-translate-y-[6px]"
            }`}
          />
          <span
            className={`block h-[2px] w-5 rounded bg-white transition-opacity duration-200 ${
              open ? "opacity-0" : "opacity-70"
            }`}
          />
          <span
            className={`block h-[2px] w-5 rounded bg-white transition-transform duration-200 ${
              open ? "-translate-y-1 -rotate-45" : "translate-y-[6px]"
            }`}
          />
        </button>
      </div>

      <div
        className={`md:hidden origin-top transform border-b border-white/5 bg-bg-primary/90 backdrop-blur-xl transition-all duration-200 ${
          open ? "scale-y-100 opacity-100" : "scale-y-95 opacity-0 pointer-events-none"
        }`}
      >
        <div className="mx-auto flex max-w-6xl flex-col px-5 pb-4 pt-2 text-sm font-semibold text-textsoft">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
              className="py-2 border-b border-transparent transition-colors duration-200 opacity-80 hover:opacity-100 hover:text-logoBlue aria-[current=page]:text-logoBlue aria-[current=page]:font-medium aria-[current=page]:border-logoBlue"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-logoBlue to-logoRed opacity-70" />
    </header>
  );
}
