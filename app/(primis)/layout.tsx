import type { Metadata } from "next";
import "../globals.css";

// Root layout for the English, LTR /primis route (Primis, McCann's adtech
// sub-company, speaks English on primis.tech). Sibling root layout to
// app/(mccann)/layout.tsx, which serves the Hebrew RTL page at /.
export const metadata: Metadata = {
  metadataBase: new URL("https://bar-for-mccann.vercel.app"),
};

export default function PrimisLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      {/* primis navy behind the app so there's no #141114 flash on /primis */}
      <body style={{ background: "#00152a" }}>{children}</body>
    </html>
  );
}
