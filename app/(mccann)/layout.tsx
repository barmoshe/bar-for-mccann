import type { Metadata } from "next";
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
      <body>{children}</body>
    </html>
  );
}
