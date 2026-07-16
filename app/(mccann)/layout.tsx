import type { Metadata } from "next";
import Script from "next/script";
import "../globals.css";

// Root layout for the Hebrew, RTL McCann page. The site has two root layouts
// (route groups): this one, and app/(primis)/layout.tsx which serves the
// English LTR /primis route in Primis's visual language.
export const metadata: Metadata = {
  metadataBase: new URL("https://bar-for-mccann.vercel.app"),
};

export default function McCannLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body>
    <Script
      src="https://bar-for-companies.vercel.app/track.js"
      data-bar-for-id="mccann"
      strategy="afterInteractive"
    />
{children}</body>
    </html>
  );
}
