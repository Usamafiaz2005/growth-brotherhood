import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Growth Brotherhood — Links & Connect',
  description: 'Digital Experiences, AI Automation & Growth Systems. Direct links, case studies, and project inquiries.',
  openGraph: {
    title: 'Growth Brotherhood — Digital Experiences & Growth Systems',
    description: 'We build digital systems that drive measurable growth.',
    siteName: 'Growth Brotherhood',
  },
};

const QUICK_LINKS = [
  {
    title: 'START A PROJECT / INQUIRY',
    desc: 'Work with us — custom web, brand & AI systems',
    href: '/contact',
    primary: true,
    badge: 'PRIORITY',
  },
  {
    title: 'EXPLORE SELECTED CASE STUDIES',
    desc: 'See our recent client transformations & verified ROI',
    href: '/work',
    primary: false,
    badge: 'PROVEN ROI',
  },
  {
    title: 'FREE GROWTH READINESS AUDIT',
    desc: 'Run our deterministic diagnostic tool in 60s',
    href: '/#simulator',
    primary: false,
    badge: 'DIAGNOSTIC',
  },
  {
    title: 'ENTER THE 3D CREATIVE LAB',
    desc: 'Interactive WebGL prototypes & AI visual experiments',
    href: '/lab',
    primary: false,
    badge: 'LIVE 3D',
  },
  {
    title: 'OUR 6-STAGE METHODOLOGY',
    desc: 'Strategy → Brand → Platform → AI → Automation → Growth',
    href: '/#the-system',
    primary: false,
    badge: 'PROCESS',
  },
];

export default function LinksPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        background: 'radial-gradient(circle at 50% 0%, #171310 0%, #050505 100%)',
        padding: '5rem 1.5rem 4rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      <div style={{ width: '100%', maxWidth: 520, margin: '0 auto', textAlign: 'center' }}>
        {/* Profile Avatar / Emblem */}
        <div
          style={{
            width: 80,
            height: 80,
            margin: '0 auto 1.5rem',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #241C16, #0A0908)',
            border: '2px solid rgba(201, 123, 58, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 30px rgba(201, 123, 58, 0.15)',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.4rem',
              fontWeight: 900,
              color: 'var(--gb-copper)',
              letterSpacing: '0.05em',
            }}
          >
            GB
          </span>
        </div>

        {/* Brand & Tagline */}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.4rem',
            fontWeight: 800,
            letterSpacing: '0.05em',
            color: 'var(--gb-offwhite)',
            marginBottom: '0.4rem',
            textTransform: 'uppercase',
          }}
        >
          GROWTH BROTHERHOOD
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.85rem',
            color: 'var(--gb-offwhite-muted)',
            lineHeight: 1.5,
            marginBottom: '1.25rem',
          }}
        >
          Digital Experiences × AI Automation Pipelines × Conversion Architecture
        </p>

        {/* Live Availability Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.35rem 0.85rem',
            background: 'rgba(45, 212, 191, 0.08)',
            border: '1px solid rgba(45, 212, 191, 0.25)',
            borderRadius: '999px',
            marginBottom: '2.5rem',
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: '#2DD4BF',
              boxShadow: '0 0 10px #2DD4BF',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.65rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              color: '#2DD4BF',
              textTransform: 'uppercase',
            }}
          >
            ACCEPTING NEW CLIENTS
          </span>
        </div>

        {/* Link Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', marginBottom: '2.5rem' }}>
          {QUICK_LINKS.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              data-cursor="enter"
              style={{
                display: 'block',
                textAlign: 'left',
                padding: '1.1rem 1.25rem',
                textDecoration: 'none',
                background: link.primary ? 'var(--gb-copper)' : 'rgba(25, 23, 21, 0.85)',
                color: link.primary ? 'var(--gb-black)' : 'var(--gb-offwhite)',
                border: link.primary ? '1px solid var(--gb-copper)' : '1px solid rgba(245, 240, 232, 0.08)',
                borderRadius: 8,
                transition: 'transform 0.2s ease, border-color 0.2s ease, background-color 0.2s ease',
                position: 'relative',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  {link.title}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.55rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    padding: '0.15rem 0.45rem',
                    borderRadius: 4,
                    background: link.primary ? 'rgba(0, 0, 0, 0.15)' : 'rgba(201, 123, 58, 0.15)',
                    color: link.primary ? '#000000' : 'var(--gb-copper)',
                    textTransform: 'uppercase',
                  }}
                >
                  {link.badge}
                </span>
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.75rem',
                  color: link.primary ? 'rgba(10, 9, 8, 0.8)' : 'var(--gb-offwhite-muted)',
                  margin: 0,
                  lineHeight: 1.4,
                }}
              >
                {link.desc}
              </p>
            </Link>
          ))}
        </div>

        {/* Social / Direct Connect Footer */}
        <div
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid rgba(245, 240, 232, 0.08)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1.5rem',
          }}
        >
          <Link
            href="/"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.7rem',
              letterSpacing: '0.12em',
              color: 'var(--gb-offwhite-muted)',
              textDecoration: 'none',
              textTransform: 'uppercase',
            }}
          >
            MAIN WEBSITE ↗
          </Link>
          <span style={{ color: 'rgba(245, 240, 232, 0.15)' }}>•</span>
          <Link
            href="/contact"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.7rem',
              letterSpacing: '0.12em',
              color: 'var(--gb-copper)',
              textDecoration: 'none',
              textTransform: 'uppercase',
            }}
          >
            GET IN TOUCH ↗
          </Link>
        </div>
      </div>
    </div>
  );
}
