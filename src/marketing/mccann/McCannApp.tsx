'use client';

import { useEffect, useRef, useState } from 'react';
import './marketing-base.css';
import './mccann.css';

/**
 * McCannApp — Bar Moshe's generic application page to McCann Tel Aviv,
 * rebuilt as a faithful Hebrew, right-to-left replica of mccann.co.il,
 * read live in Chrome (2026-07-06):
 *
 *   - A near-black canvas (#141114) with an off-white section flip
 *     (#F7F8F6) and one loud electric blue (#3021F5).
 *   - A full-viewport hero: a small wordmark that slides in above a huge
 *     stacked all-caps Inter display ("WORK WELL BUILT", riffing on their
 *     "TRUTH WELL TOLD"), a Hebrew first-person subline, a circular
 *     outlined down-arrow, and a rail of circular project thumbnails
 *     where their video circles sit.
 *   - "מי אני": about text beside original "sub-brand" lockups in their
 *     McCANN ADVERTISING / DIGITAL wall style, then a WORLD-CLASS-style
 *     stats block with blue # figures.
 *   - "העבודות": the off-white flip with a grayscale marquee of Bar's
 *     stack split by blue dashes (their client-logo wall, pause circle
 *     included), then ten campaign cards with underline-rule captions.
 *   - "בואו לעבוד ביחד": their numbered-jobs board, with Bar as the one
 *     opening they haven't posted (a big "05" with a hand-drawn sketch
 *     underline) and numbered contact cards.
 *   - A black footer in their column layout with the non-affiliation note.
 *
 * Every glyph below is original SVG; no McCann asset is used anywhere.
 * Copy is Bar's plain first-person Hebrew, addressing מקאן directly, no em
 * dashes. Motion is gated on prefers-reduced-motion; the page is fully
 * legible with no JS.
 */

const EMAIL = 'mailto:1barmoshe1@gmail.com?subject=בר עבור מקאן';
const CV = '/Bar_Moshe_CV_McCann.pdf';
/* the GitHub Pages mirror serves under /bar-for-mccann; basePath does not
   rewrite plain hrefs, so public-asset links get this build-time prefix.
   CV stays a plain string constant for cv-forge's rewiring. */
const CV_HREF = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${CV}`;
const LINKEDIN = 'https://www.linkedin.com/in/barmoshe/';
const GITHUB = 'https://github.com/barmoshe';
const WHATSAPP = 'https://wa.me/972546561465';

/* ── Nav, RTL, split by "/" like theirs. ────────────────────────────────── */
const NAV_LINKS: { label: string; href: string }[] = [
  { label: 'עמוד הבית', href: '#mc-hero' },
  { label: 'מי אני', href: '#mc-who' },
  { label: 'העבודות', href: '#mc-work' },
  { label: 'בואו נדבר', href: '#mc-close' },
];

/* ── The marquee wall: Bar's stack in their client-logo register. ───────── */
const STACK = [
  'TypeScript',
  'React',
  'Next.js',
  'Node',
  'Python',
  'Go',
  'AWS',
  'Docker',
  'Kubernetes',
  'CI/CD',
  'Temporal',
  'AI agents',
  'MCP',
  'PostgreSQL',
  'MongoDB',
  'WebGL',
];

/* ── Sub-brand lockups: the why-me trio in their brand-wall style. ──────── */
const LOCKUPS: { mark: string; sub: string; p: string }[] = [
  {
    mark: 'BAR',
    sub: 'Full Stack',
    p: 'TypeScript, React, Next.js ו-Node, עם הענן מסביב: AWS, Docker, Kubernetes ו-CI/CD. אני בונה את המוצר כולו ומחזיק אותו באוויר.',
  },
  {
    mark: 'BAR',
    sub: 'AI Native',
    p: 'סוכנים, פלאגינים ופייפליינים הם כלי העבודה היומיומיים שלי, לא תוספת. חלק מהעבודות למטה הן כלי AI שתכננתי ושלחתי בעצמי.',
  },
  {
    mark: 'BAR',
    sub: 'Production',
    p: 'בג\'ומסי, סטארטאפ בשלב מוקדם, אני מפתח הפול סטאק וה-DevOps המרכזי בצוות של חמישה. אני שולח, מנטר ומדבג טראפיק אמיתי.',
  },
];

/* ── The work grid: the locked roster, framed as campaign cards. ────────── */
type Glyph =
  | 'deck'
  | 'flow'
  | 'logic'
  | 'harness'
  | 'film'
  | 'home'
  | 'plane'
  | 'flower'
  | 'wave'
  | 'silk';

const WORKS: { name: string; tag: string; href: string; glyph: Glyph }[] = [
  {
    name: 'MDP',
    tag: 'קומפיילר · כלי AI',
    href: 'https://barmoshe.github.io/mdp/',
    glyph: 'deck',
  },
  {
    name: 'Temporal Data Service',
    tag: 'תהליכים עמידים',
    href: 'https://temporal.io/code-exchange/cross-language-data-processing-service-with-temporal',
    glyph: 'flow',
  },
  {
    name: 'Entailer',
    tag: 'AI · לוגיקה פורמלית',
    href: 'https://barmoshe.github.io/entailer/',
    glyph: 'logic',
  },
  {
    name: 'Creative Harness',
    tag: 'סוכני AI · מערכות',
    href: 'https://github.com/barmoshe/claude-creative-stack',
    glyph: 'harness',
  },
  {
    name: 'Catalogue Orchestrator',
    tag: 'וידאו AI · אורקסטרציה',
    href: 'https://barmoshe.github.io/catalogue-orchestrator/',
    glyph: 'film',
  },
  {
    name: 'Apartment Hunter',
    tag: 'מוצר · אפליקציית ווב',
    href: 'https://apartment-hunter-one.vercel.app',
    glyph: 'home',
  },
  {
    name: 'Trip Planner',
    tag: 'מוצר · אפליקציית ווב',
    href: 'https://trip-planner-six-iota.vercel.app',
    glyph: 'plane',
  },
  {
    name: 'Bloom Garden',
    tag: 'ראייה ממוחשבת · משחק',
    href: 'https://bloom-garden-five.vercel.app',
    glyph: 'flower',
  },
  {
    name: 'Biome Synth',
    tag: 'גנרטיבי · אודיו',
    href: 'https://biome-synth.lovable.app',
    glyph: 'wave',
  },
  {
    name: 'Aurora',
    tag: 'WebGL · גרפיקה',
    href: 'https://aurora-eight-iota.vercel.app',
    glyph: 'silk',
  },
];

/* the hero rail: five circular thumbs, their video-circle rail */
const RAIL: { name: string; href: string; glyph: Glyph }[] = [
  { name: 'MDP', href: 'https://barmoshe.github.io/mdp/', glyph: 'deck' },
  {
    name: 'Temporal Data Service',
    href: 'https://temporal.io/code-exchange/cross-language-data-processing-service-with-temporal',
    glyph: 'flow',
  },
  { name: 'Entailer', href: 'https://barmoshe.github.io/entailer/', glyph: 'logic' },
  { name: 'Biome Synth', href: 'https://biome-synth.lovable.app', glyph: 'wave' },
  { name: 'Apartment Hunter', href: 'https://apartment-hunter-one.vercel.app', glyph: 'home' },
];

/* ── Scroll reveal: adds .is-in when a [data-reveal] enters the viewport. */
function useReveal(rootRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = Array.from(root.querySelectorAll('[data-reveal]'));
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [rootRef]);
}

/* ── Line glyphs for posters, rail, and cards. ──────────────────────────── */
function WorkGlyph({ g }: { g: Glyph }) {
  const s = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  } as const;
  switch (g) {
    case 'deck':
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <rect x="5" y="7" width="22" height="15" rx="2.5" {...s} />
          <path d="M11 27h10M13 13h10M13 17h6" {...s} />
        </svg>
      );
    case 'flow':
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <circle cx="8" cy="8" r="4" {...s} />
          <circle cx="24" cy="16" r="4" {...s} />
          <circle cx="8" cy="24" r="4" {...s} />
          <path d="M12 9.5 20 14M12 22.5 20 18" {...s} />
        </svg>
      );
    case 'logic':
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M6 10h8l4 6-4 6H6M18 16h8" {...s} />
          <path d="M23 12l4 4-4 4" {...s} />
        </svg>
      );
    case 'harness':
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <rect x="10" y="10" width="12" height="12" rx="3" {...s} />
          <path d="M16 4v6M16 22v6M4 16h6M22 16h6" {...s} />
        </svg>
      );
    case 'film':
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <rect x="5" y="8" width="22" height="16" rx="3" {...s} />
          <path d="M5 13h22M10 8v16M22 8v16" {...s} />
        </svg>
      );
    case 'home':
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M6 15 16 6l10 9M9 13v12h14V13" {...s} />
          <path d="M13 25v-7h6v7" {...s} />
        </svg>
      );
    case 'plane':
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M4 18 28 8l-7 18-5-7-8 4 5-6Z" {...s} />
        </svg>
      );
    case 'flower':
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <circle cx="16" cy="13" r="3.5" {...s} />
          <path d="M16 5v4M16 17v10M9 10l4 2M23 10l-4 2M10 26c2-4 4-5 6-5s4 1 6 5" {...s} />
        </svg>
      );
    case 'wave':
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M4 16c3-7 6-7 8 0s5 7 8 0 5-7 8 0" {...s} />
        </svg>
      );
    case 'silk':
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M5 22c6-3 8-9 6-14 7 1 11 6 11 12M9 27c8-1 14-6 16-13" {...s} />
        </svg>
      );
  }
}

/* down arrow inside the hero circle */
function ArrowDown() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M12 4v15M6 13l6 6 6-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* the RTL "forward" arrow on the contact cards (points left) */
function ArrowStart() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M20 12H5M11 6l-6 6 6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PauseIcon({ paused }: { paused: boolean }) {
  return paused ? (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M8 5v14l11-7-11-7Z" fill="currentColor" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M7 5h3.4v14H7zM13.6 5H17v14h-3.4z" fill="currentColor" />
    </svg>
  );
}

/* the hand-drawn sketch underline, their numbered-job doodle */
function SketchUnderline() {
  return (
    <svg viewBox="0 0 120 26" aria-hidden="true" focusable="false" preserveAspectRatio="none">
      <path
        d="M4 14c22-6 58-9 112-7M2 20c30-7 66-9 104-6M14 24c26-5 54-6 88-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ */

export default function McCannApp() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [marked, setMarked] = useState(false);
  const [paused, setPaused] = useState(false);
  useReveal(rootRef);

  /* the wordmark slides in above the headline on first scroll (their hero
     behavior), or after a beat if the visitor never scrolls */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setMarked(true);
      return;
    }
    const onScroll = () => setMarked(true);
    const t = window.setTimeout(() => setMarked(true), 2200);
    window.addEventListener('scroll', onScroll, { once: true, passive: true });
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const marqueeRow = (reverse: boolean, offset: number) => {
    const items = [...STACK.slice(offset), ...STACK.slice(0, offset)];
    return (
      <div className={`mc-marquee${reverse ? ' is-reverse' : ''}`} aria-hidden="true">
        <div className="mc-marquee-track">
          {[0, 1].map((copy) => (
            <span key={copy} className="mc-marq-item">
              {items.map((t) => (
                <span key={t} className="mc-marq-item">
                  {t}
                  <i className="mc-dash" />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={`mp-root mc-root${paused ? ' is-paused' : ''}`} ref={rootRef}>
      <a className="skip-link" href="#mc-main">
        דלגו לתוכן
      </a>

      {/* ── Nav: RTL items split by "/", wordmark at the start. ─────────── */}
      <header className="mc-nav">
        <div className="mc-nav-inner">
          <a className="mc-wordmark" href="#mc-hero" aria-label="בר עבור מקאן, חזרה למעלה">
            bar for <b>McCANN</b>
          </a>
          <nav className="mc-nav-links" aria-label="חלקי העמוד">
            {NAV_LINKS.map((l, i) => (
              <span key={l.href} style={{ display: 'contents' }}>
                {i > 0 && (
                  <span className="mc-nav-sep" aria-hidden="true">
                    /
                  </span>
                )}
                <a href={l.href} className={i === 0 ? 'is-here' : undefined}>
                  {l.label}
                </a>
              </span>
            ))}
          </nav>
        </div>
      </header>

      <main id="mc-main">
        {/* ── Hero. ─────────────────────────────────────────────────────── */}
        <section className={`mc-hero${marked ? ' is-marked' : ''}`} id="mc-hero" aria-labelledby="mc-hero-h">
          <div className="mc-container mc-hero-inner">
            <div className="mc-hero-copy">
              <p className="mc-hero-mark" aria-hidden={!marked}>
                bar for McCANN
                <span className="mc-dot" aria-hidden="true" />
              </p>
              <h1 id="mc-hero-h" className="mc-display mc-hero-display">
                <span>Work</span>
                <span>Well</span>
                <span>Built</span>
              </h1>
              <p className="mc-hero-sub">
                אני בר משה, מפתח פול סטאק שבונה עם AI ביום-יום. במקום עוד קורות
                חיים, בניתי למקאן עמוד עובד בשפה הוויזואלית שלכם. כל עבודה כאן
                אמיתית, חיה, ואפשר ללחוץ עליה עכשיו.
              </p>
              <div className="mc-hero-cta">
                <a className="mc-circle" href="#mc-who" aria-label="גללו למטה, אל מי אני">
                  <ArrowDown />
                </a>
                <a className="mc-link" href="#mc-work">
                  ישר לעבודות
                </a>
                <a className="mc-link" href={CV_HREF} target="_blank" rel="noreferrer">
                  קורות חיים (PDF)
                </a>
              </div>
            </div>
            <ul className="mc-rail" aria-label="עבודות נבחרות, קישורים חיים">
              {RAIL.map((r) => (
                <li key={r.name}>
                  <a href={r.href} target="_blank" rel="noreferrer" title={r.name} aria-label={r.name}>
                    <WorkGlyph g={r.glyph} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Who: about + sub-brand lockups + stats. ───────────────────── */}
        <section className="mc-who" id="mc-who" aria-labelledby="mc-who-h">
          <div className="mc-container">
            <h2 id="mc-who-h" className="mc-h2" data-reveal>
              מי אני
            </h2>
            <div className="mc-who-grid">
              <div className="mc-who-text" data-reveal>
                <p>
                  טקסט &quot;אודות&quot; קלאסי היה מספר כמה אני מקצועי. במקום
                  זה, בניתי את העמוד הזה כמו שאתם בונים קמפיין: בשפה של הלקוח,
                  עם הוכחות במקום הבטחות.
                </p>
                <p>
                  ביום אני מפתח פול סטאק בסטארטאפ, ובשאר הזמן אני שולח כלים
                  וספריות משלי: קומפיילר מסמכים על npm, ערכת לוגיקה פורמלית,
                  רתמות לסוכני AI ואפליקציות מוצר שלמות. הכול למטה, הכול חי.
                </p>
                <p>
                  אצלכם הסיפור הוא Truth Well Told. אצלי הוא אותו רעיון, רק
                  בקוד: עבודה שאפשר לפתוח, ללחוץ ולראות אותה רצה.
                </p>
              </div>
              <div className="mc-lockups">
                {LOCKUPS.map((l, i) => (
                  <article className="mc-lockup" key={l.sub} data-reveal style={{ transitionDelay: `${i * 0.08}s` }}>
                    <div className="mc-lockup-mark">
                      <b>{l.mark}</b>
                      <i>{l.sub}</i>
                    </div>
                    <p>{l.p}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="mc-stats">
              <h3 className="mc-display mc-stats-display" data-reveal>
                <span>Shipped</span>
                <span>Not</span>
                <span>Sketched</span>
              </h3>
              <div className="mc-stat-groups" data-reveal>
                <div>
                  <p className="mc-stat-label">2026 Live Index</p>
                  <div className="mc-stat-row">
                    <div className="mc-stat">
                      <span className="hash" aria-hidden="true">
                        #
                      </span>
                      <span className="num">10</span>
                      <span className="lbl">
                        עבודות
                        <br />
                        חיות
                      </span>
                    </div>
                    <div className="mc-stat">
                      <span className="hash" aria-hidden="true">
                        #
                      </span>
                      <span className="num">6</span>
                      <span className="lbl">
                        חבילות
                        <br />
                        npm
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="mc-stat-label">Recognition</p>
                  <p style={{ margin: 0, maxInlineSize: '26rem' }}>
                    ה-Temporal Data Service שלי מוצג ב-Temporal Code Exchange,
                    ו-MDP ו-Entailer חיים על npm עם אתרי דוקומנטציה משלהם.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Work: the off-white flip. ─────────────────────────────────── */}
        <section className="mc-work" id="mc-work" aria-labelledby="mc-work-h">
          <div className="mc-container">
            <span className="mc-eyebrow" data-reveal>
              קמפיינים ומהלכים, בגרסה שלי
            </span>
            <h2 id="mc-work-h" className="mc-h2" data-reveal>
              העבודות
            </h2>

            <div className="mc-marquee-wrap" data-reveal>
              {marqueeRow(false, 0)}
              {marqueeRow(true, 8)}
              <button
                type="button"
                className="mc-pause"
                onClick={() => setPaused((p) => !p)}
                aria-pressed={paused}
                aria-label={paused ? 'הפעילו את נגלת הכלים' : 'עצרו את נגלת הכלים'}
              >
                <PauseIcon paused={paused} />
              </button>
            </div>

            <div className="mc-grid">
              {WORKS.map((w, i) => (
                <a
                  className="mc-card"
                  key={w.name}
                  href={w.href}
                  target="_blank"
                  rel="noreferrer"
                  data-reveal
                  style={{ transitionDelay: `${(i % 4) * 0.06}s` }}
                >
                  <span className="mc-poster" aria-hidden="true">
                    <span className="mc-poster-idx">{String(i + 1).padStart(2, '0')}</span>
                    <WorkGlyph g={w.glyph} />
                  </span>
                  <span className="mc-caption">
                    <b>{w.name}</b>
                    <span>{w.tag}</span>
                  </span>
                </a>
              ))}
            </div>

            <p className="mc-work-note" data-reveal>
              ומחוץ לרשימה: ג&apos;ומסי, הסטארטאפ שבו אני עובד. הקוד שלהם נשאר
              שלהם, אז הוא מוזכר כאן בשם בלבד, בלי קישור.
            </p>
          </div>
        </section>

        {/* ── Close: the numbered-jobs board. ───────────────────────────── */}
        <section className="mc-close" id="mc-close" aria-labelledby="mc-close-h">
          <div className="mc-container">
            <span className="mc-eyebrow" data-reveal>
              יש לכם לוח משרות ממוספר. הרשיתי לעצמי להוסיף אחת.
            </span>
            <h2 id="mc-close-h" className="mc-h2" data-reveal>
              בואו לעבוד ביחד על המהלכים הבאים שלכם
            </h2>

            <div className="mc-close-grid">
              <div className="mc-open-role" data-reveal>
                <span className="mc-open-num">
                  05
                  <SketchUnderline />
                </span>
                <p className="mc-open-title">Full Stack / AI Engineer</p>
                <p className="mc-open-name">בר משה. זמין, ומגיע עם העבודות שכבר ראיתם למעלה.</p>
              </div>

              <div className="mc-ccards">
                <a className="mc-ccard" href={EMAIL} data-reveal>
                  <span className="mc-ccard-num">01</span>
                  <span className="mc-ccard-label">
                    אימייל
                    <ArrowStart />
                  </span>
                  <span className="mc-ccard-hint">1barmoshe1@gmail.com</span>
                </a>
                <a
                  className="mc-ccard"
                  href={WHATSAPP}
                  target="_blank"
                  rel="noreferrer"
                  data-reveal
                  style={{ transitionDelay: '0.06s' }}
                >
                  <span className="mc-ccard-num">02</span>
                  <span className="mc-ccard-label">
                    וואטסאפ
                    <ArrowStart />
                  </span>
                  <span className="mc-ccard-hint">הכי מהיר, עונה גם מהטלפון</span>
                </a>
                <a
                  className="mc-ccard"
                  href={CV_HREF}
                  target="_blank"
                  rel="noreferrer"
                  data-reveal
                  style={{ transitionDelay: '0.12s' }}
                >
                  <span className="mc-ccard-num">03</span>
                  <span className="mc-ccard-label">
                    קורות חיים
                    <ArrowStart />
                  </span>
                  <span className="mc-ccard-hint">עמוד אחד, PDF, בצבעים שלכם</span>
                </a>
                <a
                  className="mc-ccard"
                  href={GITHUB}
                  target="_blank"
                  rel="noreferrer"
                  data-reveal
                  style={{ transitionDelay: '0.18s' }}
                >
                  <span className="mc-ccard-num">04</span>
                  <span className="mc-ccard-label">
                    גיטהאב
                    <ArrowStart />
                  </span>
                  <span className="mc-ccard-hint">github.com/barmoshe</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer. ────────────────────────────────────────────────────── */}
      <footer className="mc-footer">
        <div className="mc-container">
          <div className="mc-footer-grid">
            <div className="mc-footer-col">
              <h3>אני כאן</h3>
              <p>תל אביב, ישראל</p>
              <p style={{ marginTop: '0.4rem' }}>
                <a className="mc-link" href={EMAIL}>
                  1barmoshe1@gmail.com
                </a>
              </p>
            </div>
            <nav className="mc-footer-col" aria-label="קישורי קשר">
              <h3>פרטי התקשרות</h3>
              <ul>
                <li>
                  <a href={WHATSAPP} target="_blank" rel="noreferrer">
                    וואטסאפ
                  </a>
                </li>
                <li>
                  <a href={LINKEDIN} target="_blank" rel="noreferrer">
                    לינקדאין
                  </a>
                </li>
                <li>
                  <a href={GITHUB} target="_blank" rel="noreferrer">
                    גיטהאב
                  </a>
                </li>
                <li>
                  <a href={CV_HREF} target="_blank" rel="noreferrer">
                    קורות חיים (PDF)
                  </a>
                </li>
              </ul>
            </nav>
            <nav className="mc-footer-col" aria-label="ניווט בעמוד">
              <h3>בעמוד הזה</h3>
              <ul>
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <a href={l.href}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="mc-footer-note">
            <span>
              עמוד מועמדות אישי של בר משה, לא עמוד רשמי של מקאן. מקאן,
              Truth Well Told והמותג שייכים ל-McCann. כל האיורים כאן מקוריים.
            </span>
            <span className="mc-wordmark" aria-hidden="true">
              bar for <b>McCANN</b>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
