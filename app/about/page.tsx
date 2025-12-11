import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About | Nepali Reels",
  description: "The story, ethos, and craft behind Nepali Reels."
};

export default function AboutPage() {
  return <AboutContent />;
}
