import { ImageResponse } from 'next/og';

// Dynamic share card for the /primis application route, matching the page's
// primis.tech look (read live 2026-07-06): deep navy canvas, Poppins-ish
// rounded sans (Satori default kept), the [bracket] wordmark register and the
// hot pink accent. Flexbox-only CSS, plain hex colours.

// statically generated at build time so the GH_PAGES static export works too
export const dynamic = 'force-static';

export const alt =
  'Bar for Primis — an application page in Primis\'s own visual language. Push for more shipped work, every build a live link.';
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
          backgroundColor: '#00152a',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', fontSize: 40, fontWeight: 700, fontStyle: 'italic' }}>
          [ bar for primis ]
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: 104,
            fontWeight: 600,
            lineHeight: 1.02,
            letterSpacing: -1,
          }}
        >
          <div style={{ display: 'flex' }}>PUSH FOR</div>
          <div style={{ display: 'flex' }}>
            MORE&nbsp;<span style={{ color: '#ff1455' }}>SHIPPING</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div
            style={{
              display: 'flex',
              backgroundColor: '#ff1455',
              color: '#ffffff',
              borderRadius: 999,
              padding: '15px 34px',
              fontSize: 27,
              fontWeight: 600,
            }}
          >
            bar-for-mccann.vercel.app/primis
          </div>
          <div style={{ display: 'flex', fontSize: 26, color: '#c2ccd6' }}>
            Bar Moshe · every build a live link
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
