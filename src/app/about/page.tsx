import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About — Growth Brotherhood',
  description: 'Why we exist. Growth Brotherhood is a digital growth agency that builds systems, not just websites.',
};

const FLOW = ['IDEA', 'DESIGN', 'TECHNOLOGY', 'AI', 'MARKETING', 'GROWTH'];

export default function AboutPage() {
  return (
    <main
      style={{
        width: '100vw',
        minHeight: '100vh',
        background: 'var(--gb-black)',
        paddingTop: '8rem',
      }}
    >
      {/* Hero */}
      <section
        style={{
          padding: '4rem 2rem 8rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(8rem, 20vw, 25rem)',
            fontWeight: 900,
            color: 'rgba(201,123,58,0.03)',
            letterSpacing: '-0.05em',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          WHY
        </div>

        <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative' }}>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.65rem',
              letterSpacing: '0.3em',
              color: 'var(--gb-copper)',
              marginBottom: '2rem',
              textTransform: 'uppercase',
            }}
          >
            WHY WE EXIST
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 7vw, 6rem)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              color: 'var(--gb-offwhite)',
              lineHeight: 1.0,
              marginBottom: '2rem',
            }}
          >
            MOST AGENCIES<br />
            BUILD WEBSITES.<br />
            <span style={{ color: 'var(--gb-copper)' }}>WE BUILD<br />DIGITAL SYSTEMS.</span>
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.1rem',
              color: 'var(--gb-offwhite-muted)',
              lineHeight: 1.8,
              maxWidth: 580,
            }}
          >
            Growth Brotherhood exists because the gap between a good-looking website and a revenue-generating growth system is enormous — and most agencies never bridge it.
          </p>
        </div>
      </section>

      {/* Flow */}
      <section
        style={{
          background: 'var(--gb-charcoal)',
          padding: '6rem 2rem',
          overflow: 'hidden',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.65rem', letterSpacing: '0.25em', color: 'var(--gb-offwhite-muted)', marginBottom: '2rem', textTransform: 'uppercase' }}>OUR PROCESS</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0', alignItems: 'center' }}>
            {FLOW.map((item, i) => (
              <div key={item} style={{ display: 'flex', alignItems: 'center' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.2rem, 3vw, 2.5rem)',
                    fontWeight: 700,
                    color: i === FLOW.length - 1 ? 'var(--gb-copper)' : 'var(--gb-offwhite)',
                    padding: '0.75rem 1.25rem',
                    border: i === FLOW.length - 1 ? '1px solid var(--gb-copper)' : '1px solid rgba(245,240,232,0.1)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {item}
                </div>
                {i < FLOW.length - 1 && (
                  <span style={{ color: 'var(--gb-copper)', padding: '0 0.5rem', opacity: 0.5, fontSize: '1.2rem' }}>→</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section style={{ padding: '6rem 2rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
          {[
            { title: 'WE ARE NOT A VENDOR', body: 'We invest in understanding your business as deeply as you do. Every decision is made with your growth in mind, not our production speed.' },
            { title: 'EVERY INTERACTION IS INTENTIONAL', body: 'We don’t add effects for the sake of it. Every animation, every micro-interaction, every transition communicates something.' },
            { title: 'DATA DRIVES DESIGN', body: 'Beautiful design that doesn’t convert is decoration. We build around what works — proven by data, refined by experience.' },
          ].map((card) => (
            <div key={card.title} style={{ borderTop: '1px solid rgba(201,123,58,0.3)', paddingTop: '2rem' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.05em', color: 'var(--gb-copper)', marginBottom: '1rem', textTransform: 'uppercase' }}>{card.title}</h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--gb-offwhite-muted)', lineHeight: 1.7 }}>{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '6rem 2rem', textAlign: 'center', borderTop: '1px solid rgba(245,240,232,0.06)' }}>
        <Link
          href="/contact"
          data-cursor="enter"
          style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.2em', color: 'var(--gb-black)', background: 'var(--gb-copper)', textDecoration: 'none', padding: '1.2rem 3rem', textTransform: 'uppercase', display: 'inline-block' }}
        >
          START A PROJECT →
        </Link>
      </section>
    </main>
  );
}
