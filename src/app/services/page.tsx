import type { Metadata } from 'next';
import Link from 'next/link';
import { services } from '@/data/services';

export const metadata: Metadata = {
  title: 'Services — Growth Brotherhood',
  description: 'Web development, AI automation, digital marketing, brand identity and growth strategy from Growth Brotherhood.',
};

export default function ServicesPage() {
  return (
    <main
      style={{
        width: '100vw',
        minHeight: '100vh',
        background: 'var(--gb-black)',
        padding: '10rem 2rem 6rem',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ marginBottom: '6rem' }}>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.65rem',
              letterSpacing: '0.3em',
              color: 'var(--gb-copper)',
              marginBottom: '1rem',
              textTransform: 'uppercase',
            }}
          >
            WHAT WE DO
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              color: 'var(--gb-offwhite)',
              lineHeight: 0.9,
              marginBottom: '2rem',
            }}
          >
            SIX SERVICES.
            <br />
            <span style={{ color: 'var(--gb-copper)' }}>ONE SYSTEM.</span>
          </h1>
        </div>

        <div style={{ display: 'grid', gap: '2px' }}>
          {services.map((service, i) => (
            <div
              key={service.id}
              className="service-row"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 2fr auto',
                gap: '3rem',
                padding: '3rem',
                background: 'var(--gb-charcoal)',
                alignItems: 'start',
                borderLeft: `3px solid transparent`,
                transition: 'border-color 0.3s ease, background 0.3s ease',
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.6rem',
                    letterSpacing: '0.2em',
                    color: service.color,
                    display: 'block',
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase',
                  }}
                >
                  0{i + 1}
                </span>
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.2rem, 2.5vw, 2rem)',
                    fontWeight: 700,
                    color: 'var(--gb-offwhite)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {service.title}
                </h2>
              </div>

              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.15em',
                    color: service.color,
                    marginBottom: '0.75rem',
                    textTransform: 'uppercase',
                  }}
                >
                  {service.tagline}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.95rem',
                    color: 'var(--gb-offwhite-muted)',
                    lineHeight: 1.7,
                    marginBottom: '1.5rem',
                  }}
                >
                  {service.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {service.capabilities.map((cap) => (
                    <span
                      key={cap}
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.6rem',
                        letterSpacing: '0.1em',
                        color: 'var(--gb-offwhite-muted)',
                        border: '1px solid rgba(245,240,232,0.1)',
                        padding: '0.2rem 0.6rem',
                        textTransform: 'uppercase',
                      }}
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                href="/contact"
                data-cursor="enter"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.15em',
                  color: service.color,
                  border: `1px solid ${service.color}`,
                  padding: '0.6rem 1.2rem',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  transition: 'background 0.3s ease, color 0.3s ease',
                  alignSelf: 'center',
                }}
              >
                GET STARTED →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
