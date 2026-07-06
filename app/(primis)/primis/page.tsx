import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import PrimisApp from "@/src/marketing/primis/PrimisApp";

// primis.tech runs Poppins everywhere: 400/500 for the big navy headings,
// the 72px white hero display, and the body. One family, genuinely free.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-pr",
  display: "swap",
});

// Ad-hoc, personalized application route for Bar Moshe's application to
// Primis, McCann's adtech sub-company (the tech side of the house), reached
// through a friend at McCann who can pass the CV. Built as a faithful replica
// of primis.tech's own visual language, read live in Chrome (2026-07-06):
// deep navy #00152A, hot pink #FF1455, Poppins, full-bleed heroes with a
// rotating pink word ("PUSH FOR MORE views / monetization..."), fully-round
// pink pill CTAs with arrows, the [primis] bracket wordmark and a
// </sellers.guide> code-styled nav item, diagonal arrows, a tilted outlined
// video-player card, an isometric line-art centerpiece with four dotted
// n/4 callouts, pill category tabs filtering a media row, a navy band with
// a pink line chart, and their Open Positions hairline-row list. English,
// LTR, noindex. Every drawing is original SVG/CSS; no Primis asset is used.
const ogTitle = "Bar for Primis";
const ogDescription =
  "I'm Bar Moshe, applying to Primis in Primis's own visual language: push for more shipped work, every build a live link.";

export const metadata: Metadata = {
  title: ogTitle,
  description: ogDescription,
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    siteName: "Bar for Primis",
    title: ogTitle,
    description: ogDescription,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@barmoshe1",
    creator: "@barmoshe1",
    title: ogTitle,
    description: ogDescription,
  },
};

export default function PrimisPage() {
  return (
    <div className={poppins.variable}>
      <PrimisApp />
    </div>
  );
}
