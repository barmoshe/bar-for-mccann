'use client';

import { useEffect, useRef, useState } from 'react';
import '../mccann/marketing-base.css';
import './primis.css';

/**
 * PrimisApp — Bar Moshe's application route for Primis, McCann's adtech
 * sub-company, built as a faithful English LTR replica of primis.tech's
 * visual language, read live in Chrome (2026-07-06):
 *
 *   - Deep navy (#00152A) full-bleed hero in place of their drone footage:
 *     an original line-art lighthouse seascape (their homepage hero is a
 *     lighthouse video) with a blinking pink beacon, plus their careers-page
 *     pill tabs and the "PUSH FOR MORE <rotating pink word>" headline.
 *   - The tilted, outlined video-player card ("Take your video to New
 *     Heights") rebuilt as a player of Bar's builds with a thumbnail strip.
 *   - Their isometric line-art centerpiece with four dotted n/4 callouts
 *     ("The only video discovery experience" -> full stack discovery).
 *   - Their pill category tabs as a working filter over the build cards.
 *   - The navy results band with a two-tone headline and an axis-free pink
 *     line chart (their "Unlock Your Site's Potential" chart register).
 *   - Their Open Positions hairline-row list with diagonal arrows, with Bar
 *     as the engineering opening they have not posted.
 *
 * Every drawing is original SVG/CSS; no Primis asset is used. Copy is plain
 * first person, addressing Primis, no em dashes. Motion is gated on
 * prefers-reduced-motion; the page is fully legible with no JS.
 */

const EMAIL = 'mailto:1barmoshe1@gmail.com?subject=bar for primis';
const CV = '/Bar_Moshe_CV_Primis.pdf';
/* the GitHub Pages mirror serves under /bar-for-mccann; basePath does not
   rewrite plain hrefs, so public-asset + cross-route links get this prefix.
   CV stays a plain string constant for cv-forge's rewiring. */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const CV_HREF = `${BASE}${CV}`;
const MCCANN_HREF = `${BASE}/`;
const LINKEDIN = 'https://www.linkedin.com/in/barmoshe/';
const GITHUB = 'https://github.com/barmoshe';
const WHATSAPP = 'https://wa.me/972546561465';

const ROTATE = ['Builds', 'Agents', 'Uptime', 'Product'];

/* ── The roster, categorized for the working filter. ────────────────────── */
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

type Cat = 'ai' | 'product' | 'creative';

const WORKS: { name: string; tag: string; href: string; glyph: Glyph; cat: Cat }[] = [
  { name: 'MDP', tag: 'Compiler · AI tooling', href: 'https://barmoshe.github.io/mdp/', glyph: 'deck', cat: 'ai' },
  {
    name: 'Temporal Data Service',
    tag: 'Durable workflows',
    href: 'https://temporal.io/code-exchange/cross-language-data-processing-service-with-temporal',
    glyph: 'flow',
    cat: 'ai',
  },
  { name: 'Entailer', tag: 'AI + formal logic', href: 'https://barmoshe.github.io/entailer/', glyph: 'logic', cat: 'ai' },
  {
    name: 'Creative Harness',
    tag: 'AI agents · Systems',
    href: 'https://github.com/barmoshe/claude-creative-stack',
    glyph: 'harness',
    cat: 'ai',
  },
  {
    name: 'Catalogue Orchestrator',
    tag: 'AI video · Orchestration',
    href: 'https://barmoshe.github.io/catalogue-orchestrator/',
    glyph: 'film',
    cat: 'ai',
  },
  { name: 'Apartment Hunter', tag: 'Product · Web app', href: 'https://apartment-hunter-one.vercel.app', glyph: 'home', cat: 'product' },
  { name: 'Trip Planner', tag: 'Product · Web app', href: 'https://trip-planner-six-iota.vercel.app', glyph: 'plane', cat: 'product' },
  { name: 'Bloom Garden', tag: 'Computer vision · Game', href: 'https://bloom-garden-five.vercel.app', glyph: 'flower', cat: 'creative' },
  { name: 'Biome Synth', tag: 'Generative · Audio', href: 'https://biome-synth.lovable.app', glyph: 'wave', cat: 'creative' },
  { name: 'Aurora', tag: 'WebGL · Graphics', href: 'https://aurora-eight-iota.vercel.app', glyph: 'silk', cat: 'creative' },
];

const FILTERS: { key: 'all' | Cat; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'ai', label: 'AI & tools' },
  { key: 'product', label: 'Product apps' },
  { key: 'creative', label: 'Creative' },
];

/* the player screen cycles these five */
const PLAYLIST = [0, 1, 2, 8, 5];

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

/* ── Line glyphs (the house set, pink on the cards). ────────────────────── */
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

/* the ↘ diagonal arrow, their nav/list glyph */
function DiagArrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M6 6l12 12M18 8v10H8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M4 12h15M13 6l6 6-6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M5 9l7 7 7-7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── The hero seascape: an original line-art lighthouse (their homepage
      hero is a lighthouse drone video), white strokes, pink beacon. ─────── */
function Seascape() {
  const s = {
    fill: 'none',
    stroke: 'rgba(255,255,255,0.34)',
    strokeWidth: 1.6,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  } as const;
  return (
    <svg viewBox="0 0 1440 640" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">
      {/* stars */}
      {[
        [120, 80],
        [340, 46],
        [620, 110],
        [900, 60],
        [1150, 130],
        [1330, 70],
        [480, 170],
        [1040, 190],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" fill="rgba(255,255,255,0.4)" stroke="none" />
      ))}
      {/* birds */}
      <path d="M420 210c8-7 16-7 22 0M442 210c8-7 16-7 22 0" {...s} strokeWidth={1.3} />
      <path d="M980 250c7-6 14-6 19 0M999 250c7-6 14-6 19 0" {...s} strokeWidth={1.3} />

      {/* horizon */}
      <path d="M0 452h1440" {...s} strokeWidth={1.2} stroke="rgba(255,255,255,0.22)" />

      {/* the light beam, sweeping */}
      <g className="pr-beam">
        <path d="M1052 300 690 236v22l362 58z" fill="#ff1455" stroke="none" opacity="0.22" />
        <path d="M1052 300l362-64v22l-362 58z" fill="#ff1455" stroke="none" opacity="0.22" />
      </g>

      {/* rocks */}
      <path d="M880 520c30-40 74-64 118-70 30-4 60-18 78-40l26 110z" {...s} />
      <path d="M1160 500c26-24 62-36 96-34l40 54z" {...s} />
      <path d="M940 470c14-10 34-16 52-14" {...s} strokeWidth={1.2} />

      {/* lighthouse tower */}
      <path d="M1030 460 1042 316h20l12 144" {...s} strokeWidth={2} stroke="rgba(255,255,255,0.55)" />
      <path d="M1037 380h30M1034 420h36" {...s} strokeWidth={1.4} />
      {/* gallery + lantern room */}
      <path d="M1036 316h32M1040 316v-14h24v14" {...s} strokeWidth={1.6} stroke="rgba(255,255,255,0.55)" />
      <path d="M1044 288h16l-8-14z" {...s} strokeWidth={1.6} />
      {/* the beacon */}
      <circle className="pr-beacon" cx="1052" cy="309" r="6" fill="#ff1455" stroke="none" />

      {/* waves, drifting */}
      <g className="pr-waves">
        <path d="M-40 500c60-16 120-16 180 0s120 16 180 0 120-16 180 0 120 16 180 0 120-16 180 0 120 16 180 0 120-16 180 0 120 16 180 0" {...s} strokeWidth={1.4} />
        <path d="M-80 545c60-14 120-14 180 0s120 14 180 0 120-14 180 0 120 14 180 0 120-14 180 0 120 14 180 0 120-14 180 0 120 14 180 0" {...s} strokeWidth={1.2} stroke="rgba(255,255,255,0.24)" />
        <path d="M-20 592c60-12 120-12 180 0s120 12 180 0 120-12 180 0 120 12 180 0 120-12 180 0 120 12 180 0 120-12 180 0 120 12 180 0" {...s} strokeWidth={1.1} stroke="rgba(255,255,255,0.16)" />
      </g>
    </svg>
  );
}

/* ── The isometric centerpiece, generated from a tiny iso-box helper the
      way their illustration stacks slabs; navy strokes, pink accents. ───── */
const RX = { x: 46, y: -26 };
const RY = { x: 46, y: 26 };

function pt(x: number, y: number) {
  return `${Math.round(x * 100) / 100},${Math.round(y * 100) / 100}`;
}

/* top/left/right faces of an iso box whose top-back corner sits at (x,y) */
function isoBox(x: number, y: number, w: number, d: number, h: number) {
  const a = { x, y };
  const b = { x: x + RX.x * w, y: y + RX.y * w };
  const c = { x: b.x + RY.x * d, y: b.y + RY.y * d };
  const dd = { x: x + RY.x * d, y: y + RY.y * d };
  const top = [a, b, c, dd].map((p) => pt(p.x, p.y)).join(' ');
  const left = [dd, c, { x: c.x, y: c.y + h }, { x: dd.x, y: dd.y + h }].map((p) => pt(p.x, p.y)).join(' ');
  const right = [c, b, { x: b.x, y: b.y + h }, { x: c.x, y: c.y + h }].map((p) => pt(p.x, p.y)).join(' ');
  return { top, left, right, c };
}

function IsoMachine() {
  const stroke = { stroke: '#00152a', strokeWidth: 2, strokeLinejoin: 'round' } as const;
  const slab = isoBox(440, 150, 4.5, 4.5, 22); // the tablet base
  const player = isoBox(475, 170, 1.8, 1.6, 90); // the raised player cube
  const barA = isoBox(600, 270, 1.9, 0.7, 54); // "agents" bar
  const barB = isoBox(662, 318, 1.9, 0.7, 84); // "ships daily" bar
  const keys = [0, 1, 2, 3].map((i) => isoBox(452 + i * 24, 322 + i * 13.5, 0.42, 0.42, 12));
  return (
    <svg viewBox="0 0 880 560" aria-hidden="true" focusable="false">
      {/* base slab */}
      <polygon points={slab.top} fill="#ffffff" {...stroke} />
      <polygon points={slab.left} fill="#f1f1f1" {...stroke} />
      <polygon points={slab.right} fill="#ffffff" {...stroke} />

      {/* keypad row, one pink key (their remote buttons) */}
      {keys.map((k, i) => (
        <g key={i}>
          <polygon points={k.top} fill={i === 1 ? '#ff1455' : '#ffffff'} {...stroke} />
          <polygon points={k.left} fill="#f1f1f1" {...stroke} />
          <polygon points={k.right} fill="#ffffff" {...stroke} />
        </g>
      ))}

      {/* the player cube with the pink play button on top */}
      <polygon points={player.top} fill="#ffffff" {...stroke} />
      <polygon points={player.left} fill="#00152a" {...stroke} />
      <polygon points={player.right} fill="#04223f" {...stroke} />
      <ellipse cx="553" cy="167" rx="30" ry="17" fill="#ff1455" {...stroke} />
      <path d="M545 160l20 7-20 7z" fill="#ffffff" stroke="none" />
      {/* progress rail on the slab, along the iso axis */}
      <path d="M498 302l96 54" stroke="#00152a" strokeWidth="2" strokeLinecap="round" />
      <circle cx="536" cy="323" r="4.5" fill="#ff1455" stroke="#00152a" strokeWidth="1.5" />

      {/* tag bars with flat pill labels, their 450M+/$9200 register but honest */}
      <g>
        <polygon points={barA.top} fill="#ffffff" {...stroke} />
        <polygon points={barA.left} fill="#04223f" {...stroke} />
        <polygon points={barA.right} fill="#00152a" {...stroke} />
        <rect x="596" y="200" rx="13" width="86" height="26" fill="#ffffff" stroke="#00152a" strokeWidth="1.6" />
        <text x="639" y="218" textAnchor="middle" fontSize="14.5" fontWeight="600" fill="#00152a">
          agents
        </text>
        <path d="M652 226l14 22" stroke="#00152a" strokeWidth="1.4" strokeDasharray="3 4" />
      </g>
      <g>
        <polygon points={barB.top} fill="#ffffff" {...stroke} />
        <polygon points={barB.left} fill="#04223f" {...stroke} />
        <polygon points={barB.right} fill="#00152a" {...stroke} />
        <rect x="672" y="246" rx="13" width="112" height="26" fill="#ff1455" stroke="#00152a" strokeWidth="1.6" />
        <text x="728" y="264" textAnchor="middle" fontSize="14.5" fontWeight="600" fill="#ffffff">
          ships daily
        </text>
        <path d="M736 272l10 24" stroke="#00152a" strokeWidth="1.4" strokeDasharray="3 4" />
      </g>

      {/* cable to a little mouse, like theirs */}
      <path
        d="M560 430c-60 30-150 10-190 46-24 22-10 52 14 58"
        fill="none"
        stroke="#00152a"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <ellipse cx="352" cy="516" rx="32" ry="22" fill="#ffffff" stroke="#00152a" strokeWidth="2" />
      <path d="M352 496v12" stroke="#00152a" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/* ── The axis-free pink chart, their "4.3x pre-roll" chart register. ────── */
function ShipChart() {
  return (
    <div data-reveal>
      <svg className="pr-chart" viewBox="0 0 560 300" aria-hidden="true" focusable="false">
        {[70, 140, 210].map((y) => (
          <path key={y} d={`M30 ${y}H530`} stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeDasharray="4 6" />
        ))}
        <path d="M30 260V40M30 260H530" stroke="rgba(255,255,255,0.45)" strokeWidth="1.4" />
        <path
          className="curve"
          d="M30 248c40-6 56-40 84-46s44 18 72 8 36-52 64-58 44 26 72 22 40-34 68-44 52-2 80-16 44-30 60-46"
          fill="none"
          stroke="#ff1455"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <circle cx="30" cy="248" r="6" fill="#ff1455" stroke="#ffffff" strokeWidth="2" />
        <circle cx="530" cy="68" r="6" fill="#ff1455" stroke="#ffffff" strokeWidth="2" />
        <g>
          <rect x="12" y="204" rx="13" width="92" height="26" fill="#ff1455" />
          <text x="58" y="222" textAnchor="middle" fontSize="14" fontWeight="600" fill="#ffffff">
            first ship
          </text>
        </g>
        <g>
          <rect x="466" y="26" rx="13" width="72" height="26" fill="#ff1455" />
          <text x="502" y="44" textAnchor="middle" fontSize="14" fontWeight="600" fill="#ffffff">
            today
          </text>
        </g>
      </svg>
      <p className="pr-chart-caption">Builds shipped over time. No axis needed, the direction is the point.</p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ */

export default function PrimisApp() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [wordIdx, setWordIdx] = useState(0);
  const [screenIdx, setScreenIdx] = useState(0);
  const [filter, setFilter] = useState<'all' | Cat>('all');
  useReveal(rootRef);

  /* the rotating hero word + the player playlist, motion-gated */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const w = window.setInterval(() => setWordIdx((i) => (i + 1) % ROTATE.length), 2400);
    const p = window.setInterval(() => setScreenIdx((i) => (i + 1) % PLAYLIST.length), 3600);
    return () => {
      window.clearInterval(w);
      window.clearInterval(p);
    };
  }, []);

  const nowPlaying = WORKS[PLAYLIST[screenIdx]];
  const shown = filter === 'all' ? WORKS : WORKS.filter((w) => w.cat === filter);

  return (
    <div className="mp-root pr-root" ref={rootRef}>
      <a className="skip-link" href="#pr-main">
        Skip to content
      </a>

      {/* ── Nav. ────────────────────────────────────────────────────────── */}
      <header className="pr-nav">
        <div className="pr-nav-inner">
          <a className="pr-wordmark" href="#pr-main" aria-label="bar for primis, back to top">
            <span className="bracket">[</span> bar for primis <span className="bracket">]</span>
          </a>
          <nav className="pr-nav-links" aria-label="Page sections">
            <a href="#pr-heights">About</a>
            <a href="#pr-work">The work</a>
            <a href="#pr-open">
              <span className="pr-diag" aria-hidden="true">
                <DiagArrow />
              </span>
              Open positions
            </a>
            <a className="pr-code-link" href={EMAIL}>
              {'</lets.talk>'}
            </a>
          </nav>
        </div>
      </header>

      <main id="pr-main">
        {/* ── Hero. ───────────────────────────────────────────────────────── */}
        <section className="pr-hero" aria-labelledby="pr-hero-h">
          <div className="pr-hero-art" aria-hidden="true">
            <Seascape />
          </div>
          <div className="pr-container" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <div className="pr-tabs" aria-label="Quick links">
              <a className="pr-tab is-active" href="#pr-main">
                Home
              </a>
              <a className="pr-tab" href="#pr-work">
                The work
              </a>
              <a className="pr-tab" href="#pr-open">
                Contact
              </a>
            </div>
            <div className="pr-hero-grid">
              <h1 id="pr-hero-h" className="pr-hero-h">
                Push for
                <br />
                more{' '}
                <span className="pr-rotator">
                  <span className="word" key={wordIdx}>
                    {ROTATE[wordIdx]}
                  </span>
                </span>
              </h1>
              <div className="pr-hero-side">
                <p>
                  I&apos;m Bar Moshe, a full stack developer who builds with AI
                  every day. Instead of another CV, I built Primis this page in
                  your own visual language. Everything on it is real, live, and
                  one click away.
                </p>
                <div className="pr-hero-cta">
                  <a className="pr-pill" href={EMAIL}>
                    Let&apos;s talk
                    <ArrowRight />
                  </a>
                  <a className="pr-ghost" href={CV_HREF} target="_blank" rel="noreferrer" style={{ color: '#fff' }}>
                    CV (PDF)
                  </a>
                </div>
              </div>
            </div>
            <div className="pr-hero-down">
              <a href="#pr-heights" aria-label="Scroll down">
                <ChevronDown />
              </a>
            </div>
          </div>
        </section>

        {/* ── Heights: the tilted player. ─────────────────────────────────── */}
        <section className="pr-heights" id="pr-heights" aria-labelledby="pr-heights-h">
          <div className="pr-container pr-heights-grid">
            <div data-reveal>
              <h2 id="pr-heights-h" className="pr-h2">
                Take your stack
                <br />
                to New Heights
              </h2>
              <p className="pr-sub">
                Ten shipped builds, from npm packages and durable pipelines to
                full products. Put one on the player, it is really live. My day
                job is Joomsy, an early-stage startup where I am the primary
                full stack and DevOps engineer on a team of five.
              </p>
              <p style={{ marginTop: '1.2rem' }}>
                <a className="pr-ghost" href="#pr-work">
                  See all the work
                </a>
              </p>
            </div>
            <div data-reveal>
              <div className="pr-player-wrap">
                <div className="pr-player-frame" aria-hidden="true" />
              <div className="pr-player">
                <div className="pr-screen">
                  <span className="pr-screen-live" aria-hidden="true">
                    <i />
                    Live
                  </span>
                  <WorkGlyph g={nowPlaying.glyph} />
                  <span className="pr-screen-name">{nowPlaying.name}</span>
                  <span className="pr-screen-tag">{nowPlaying.tag}</span>
                  <a className="pr-screen-open" href={nowPlaying.href} target="_blank" rel="noreferrer">
                    Open it, it runs
                  </a>
                </div>
                <div className="pr-thumbs" role="tablist" aria-label="Featured builds">
                  {PLAYLIST.map((wi, i) => (
                    <button
                      key={wi}
                      type="button"
                      role="tab"
                      aria-selected={i === screenIdx}
                      aria-label={WORKS[wi].name}
                      className={`pr-thumb${i === screenIdx ? ' is-on' : ''}`}
                      onClick={() => setScreenIdx(i)}
                    >
                      <WorkGlyph g={WORKS[wi].glyph} />
                    </button>
                  ))}
                </div>
              </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Discovery: the isometric centerpiece. ───────────────────────── */}
        <section className="pr-discovery" aria-labelledby="pr-disc-h">
          <div className="pr-container">
            <h2 id="pr-disc-h" className="pr-h2" data-reveal>
              <span className="dim">The only </span>full stack discovery
              <span className="dim"> experience</span>
            </h2>
            <div className="pr-disc-grid">
              <div className="pr-callout co-1" data-reveal>
                <div className="co-head">
                  <b>Full Stack</b>
                  <span className="co-n">
                    1<span>/4</span>
                  </span>
                </div>
                <p>
                  TypeScript, React, Next.js and Node, with the cloud around
                  them: AWS, Docker, Kubernetes and CI/CD. I build the whole
                  thing and keep it running.
                </p>
              </div>
              <div className="pr-callout co-2" data-reveal style={{ transitionDelay: '0.08s' }}>
                <div className="co-head">
                  <b>AI Agents</b>
                  <span className="co-n">
                    2<span>/4</span>
                  </span>
                </div>
                <p>
                  Agents, plugins and pipelines are my daily tools, not a
                  bolt-on. Several of the builds below are AI tooling I designed
                  and shipped myself.
                </p>
              </div>
              <div className="pr-disc-art" data-reveal>
                <IsoMachine />
              </div>
              <div className="pr-callout co-3" data-reveal style={{ transitionDelay: '0.12s' }}>
                <div className="co-head">
                  <b>Production</b>
                  <span className="co-n">
                    3<span>/4</span>
                  </span>
                </div>
                <p>
                  Real traffic, real monitoring, real debugging. I own the
                  DevOps side at my day job: shipping is a habit, not an event.
                </p>
              </div>
              <div className="pr-callout co-4" data-reveal style={{ transitionDelay: '0.16s' }}>
                <div className="co-head">
                  <b>Product</b>
                  <span className="co-n">
                    4<span>/4</span>
                  </span>
                </div>
                <p>
                  Not just repos: working products with search, filters and
                  honest UX. If a card below says live, it opens and runs right
                  now.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Work: pill tabs filter the cards. ───────────────────────────── */}
        <section className="pr-work" id="pr-work" aria-labelledby="pr-work-h">
          <div className="pr-container">
            <div className="pr-work-head" data-reveal>
              <h2 id="pr-work-h" className="pr-h2">
                The work
              </h2>
              <p className="pr-sub">
                Filter it like a content library. Every card is a live link.
              </p>
            </div>
            <div className="pr-filters" role="tablist" aria-label="Filter the builds" data-reveal>
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  role="tab"
                  aria-selected={filter === f.key}
                  className={`pr-filter${filter === f.key ? ' is-active' : ''}`}
                  onClick={() => setFilter(f.key)}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className="pr-cards">
              {shown.map((w) => (
                <a className="pr-card" key={w.name} href={w.href} target="_blank" rel="noreferrer">
                  <WorkGlyph g={w.glyph} />
                  <b>{w.name}</b>
                  <span className="tag">{w.tag}</span>
                  <span className="go">
                    See it live <span aria-hidden="true">→</span>
                  </span>
                </a>
              ))}
            </div>
            <p className="pr-work-note" data-reveal>
              Joomsy, my day job, stays off this grid: their code is theirs, so
              it is named, never linked.
            </p>
          </div>
        </section>

        {/* ── Results: navy band + the chart. ─────────────────────────────── */}
        <section className="pr-results" aria-labelledby="pr-results-h">
          <div className="pr-container pr-results-grid">
            <div data-reveal>
              <h2 id="pr-results-h" className="pr-h2 on-navy">
                Successful Builds,
                <br />
                <span className="dim">Proven Results</span>
              </h2>
              <p>
                Real work, real links, real production. The curve is the habit:
                I ship, then I ship again.
              </p>
              <p style={{ marginTop: '1.6rem' }}>
                <a className="pr-pill" href={EMAIL}>
                  Let&apos;s talk
                  <ArrowRight />
                </a>
              </p>
            </div>
            <ShipChart />
          </div>
        </section>

        {/* ── Open positions: their hairline list, Bar as the opening. ────── */}
        <section className="pr-open" id="pr-open" aria-labelledby="pr-open-h">
          <div className="pr-container">
            <h2 id="pr-open-h" className="pr-h2" data-reveal>
              Open Positions
            </h2>
            <p className="pr-open-intro" data-reveal>
              Your careers page lists two openings right now and neither is
              engineering. So here is one more, pre-filled. If this page reached
              you through a friend at McCann, that is by design.
            </p>
            <div className="pr-rows">
              <a className="pr-row is-star" href={EMAIL} data-reveal>
                <span className="row-top">
                  <b>Full Stack / AI Engineer</b>
                  <span className="pr-diag" aria-hidden="true">
                    <DiagArrow />
                  </span>
                </span>
                <span className="row-hint">Bar Moshe, available now</span>
                <span className="row-more">Learn more →</span>
              </a>
              <a className="pr-row" href={WHATSAPP} target="_blank" rel="noreferrer" data-reveal style={{ transitionDelay: '0.06s' }}>
                <span className="row-top">
                  <b>WhatsApp</b>
                  <span className="pr-diag" aria-hidden="true">
                    <DiagArrow />
                  </span>
                </span>
                <span className="row-hint">The fastest way to reach me</span>
                <span className="row-more">Message →</span>
              </a>
              <a className="pr-row" href={CV_HREF} target="_blank" rel="noreferrer" data-reveal style={{ transitionDelay: '0.1s' }}>
                <span className="row-top">
                  <b>CV, one page</b>
                  <span className="pr-diag" aria-hidden="true">
                    <DiagArrow />
                  </span>
                </span>
                <span className="row-hint">PDF, in your colors</span>
                <span className="row-more">Download →</span>
              </a>
              <a className="pr-row" href={GITHUB} target="_blank" rel="noreferrer" data-reveal style={{ transitionDelay: '0.14s' }}>
                <span className="row-top">
                  <b>GitHub</b>
                  <span className="pr-diag" aria-hidden="true">
                    <DiagArrow />
                  </span>
                </span>
                <span className="row-hint">github.com/barmoshe</span>
                <span className="row-more">Browse →</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer. ────────────────────────────────────────────────────── */}
      <footer className="pr-footer">
        <div className="pr-container">
          <div className="pr-footer-grid">
            <div>
              <span className="pr-wordmark" aria-hidden="true">
                <span className="bracket">[</span> bar for primis <span className="bracket">]</span>
              </span>
              <p style={{ color: 'rgba(255,255,255,0.75)', maxInlineSize: '22rem', marginTop: '0.9rem' }}>
                A working application page for Primis by Bar Moshe. Tel Aviv,
                Israel.
              </p>
            </div>
            <nav aria-label="Contact links">
              <h3>Contact</h3>
              <ul>
                <li>
                  <a href={EMAIL}>Email</a>
                </li>
                <li>
                  <a href={WHATSAPP} target="_blank" rel="noreferrer">
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a href={LINKEDIN} target="_blank" rel="noreferrer">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href={GITHUB} target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href={CV_HREF} target="_blank" rel="noreferrer">
                    CV (PDF)
                  </a>
                </li>
              </ul>
            </nav>
            <nav aria-label="Elsewhere">
              <h3>Elsewhere</h3>
              <ul>
                <li>
                  <a href={MCCANN_HREF}>bar for McCann (עברית)</a>
                </li>
                <li>
                  <a href="#pr-main">Back to top</a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="pr-footer-note">
            <span>
              A personal application page by Bar Moshe, not an official Primis
              page. Primis, sellers.guide and the brand belong to Primis, a
              McCann company. Every drawing here is original.
            </span>
            <span>Bar Moshe © 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
