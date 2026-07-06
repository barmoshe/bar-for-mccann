import type { Metadata } from "next";
import "./globals.css";

// Root layout. The page-level metadata (rich OG card, fonts, copy) lives in
// app/page.tsx; this just establishes the document shell. Hebrew, RTL — the
// page is a replica of mccann.co.il, McCann Tel Aviv's own site.
export const metadata: Metadata = {
  metadataBase: new URL("https://bar-for-mccann.vercel.app"),
};

export default function RootLayout({
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
