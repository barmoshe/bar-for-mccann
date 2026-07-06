import { ImageResponse } from 'next/og';

// Dynamic share card for the bar-for-mccann application page, matching the
// page's mccann.co.il look (read live 2026-07-06): the near-black canvas,
// the huge stacked all-caps display words at tight leading, and the electric
// blue accent. Text is kept Latin so Satori renders reliably without loading
// a Hebrew webfont at the edge. Flexbox-only CSS, plain hex colours.

// statically generated at build time so the GH_PAGES static export works too
export const dynamic = 'force-static';

export const alt =
  'bar for McCann — a Hebrew application page in McCann\'s own visual language. Real shipped work, live links.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '56px 72px 48px',
          backgroundColor: '#141114',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              display: 'flex',
              width: 22,
              height: 22,
              borderRadius: 999,
              backgroundColor: '#3021F5',
            }}
          />
          <div style={{ display: 'flex', fontSize: 38, fontWeight: 700, letterSpacing: -1 }}>
            bar for McCANN
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: 128,
            fontWeight: 700,
            lineHeight: 0.92,
            letterSpacing: -2,
          }}
        >
          <div style={{ display: 'flex' }}>WORK</div>
          <div style={{ display: 'flex' }}>WELL</div>
          <div style={{ display: 'flex', color: '#3021F5' }}>BUILT.</div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div
            style={{
              display: 'flex',
              backgroundColor: '#3021F5',
              color: '#ffffff',
              borderRadius: 999,
              padding: '15px 34px',
              fontSize: 27,
              fontWeight: 700,
            }}
          >
            bar-for-mccann.vercel.app
          </div>
          <div style={{ display: 'flex', fontSize: 26, color: '#c9c9c9' }}>
            Bar Moshe · Hebrew, RTL · every build a live link
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
