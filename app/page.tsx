import type { Metadata } from "next";
import { Heebo, Inter } from "next/font/google";
import McCannApp from "@/src/marketing/mccann/McCannApp";

// mccann.co.il (McCann Tel Aviv) sets its Hebrew in Almoni Neue, a commercial
// face, and its huge stacked English display words ("TRUTH WELL TOLD",
// "WORLD CLASS AGENCY") in Inter 600 at a tight ~0.85 leading. Almoni has no
// free web license, so Heebo (a clean Hebrew grotesque) carries the Hebrew
// register and Inter is used exactly as they use it: all-caps display.
const hebrew = Heebo({
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-mc-heb",
  display: "swap",
});
const display = Inter({
  subsets: ["latin"],
  weight: ["200", "400", "600", "700"],
  variable: "--font-mc-en",
  display: "swap",
});

// Ad-hoc, personalized application page for Bar Moshe's generic application
// to McCann Tel Aviv, rebuilt as a faithful replica of mccann.co.il's own
// visual language, read live in Chrome (2026-07-06): the near-black canvas
// (#141114) with off-white section flips (#F7F8F6), the electric blue accent
// (#3021F5), huge stacked all-caps Inter display words at ~0.85 leading,
// giant Hebrew section headlines, the RTL nav with "/" separators and a dot
// over the active item, circular outlined arrow buttons, a hero rail of
// circular thumbnails, grayscale marquee rows split by blue dashes, campaign
// cards with underline-rule captions, and their numbered job cards
// ("01/02/03...") with a hand-drawn sketch underline. Hebrew, RTL, noindex,
// a shareable link. Every glyph is original SVG; no McCann asset is used.
const ogTitle = "בר עבור מקאן";
const ogDescription =
  "אני בר משה, ובמקום קורות חיים בניתי למקאן עמוד עובד בשפה של Truth Well Told. עבודות אמיתיות, קישורים חיים.";

export const metadata: Metadata = {
  title: ogTitle,
  description: ogDescription,
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    siteName: "בר עבור מקאן",
    title: ogTitle,
    description: ogDescription,
    locale: "he_IL",
  },
  twitter: {
    card: "summary_large_image",
    site: "@barmoshe1",
    creator: "@barmoshe1",
    title: ogTitle,
    description: ogDescription,
  },
};

export default function McCannPage() {
  return (
    <div className={`${hebrew.variable} ${display.variable}`}>
      <McCannApp />
    </div>
  );
}
