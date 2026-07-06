import type { NextConfig } from "next";

// GH_PAGES=1 builds the GitHub Pages mirror (static export under the
// /bar-for-mccann subpath) — the fallback surface for when Vercel's free-tier
// daily deploy cap blocks production deploys. The plain build stays rooted at
// / for Vercel. The page is fully static, so export costs nothing.
const ghPages = process.env.GH_PAGES === "1";

const nextConfig: NextConfig = {
  // Pin the workspace root: sibling repos live under a shared parent that may
  // carry a lockfile, which Next would otherwise infer as the workspace root.
  turbopack: { root: __dirname },
  ...(ghPages
    ? {
        output: "export" as const,
        basePath: "/bar-for-mccann",
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
