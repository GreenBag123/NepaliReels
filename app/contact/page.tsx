import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact | Nepali Reels",
  description: "Collaborate, share stories, or reach the Nepali Reels team."
};

export default function ContactPage() {
  return <ContactContent />;
}
