'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

const ABOUT_FLOW = ['IDEA', 'DESIGN', 'TECHNOLOGY', 'AI', 'MARKETING', 'GROWTH'];

const TESTIMONIALS = [
  {
    quote: 'THE WEBSITE COMPLETELY CHANGED HOW WE PRESENT THE BUSINESS. CLIENTS COME TO US KNOWING EXACTLY WHAT TO EXPECT.',
    author: 'Asset Care London',
    role: 'Luxury Property Services',
  },
  {
    quote: 'THE AI CLIENT HUNTER PIPELINE REDUCED OUR SALES RESEARCH TIME BY 85% WHILE SCALING PIPELINE VALUE BY 260%.',
    author: 'AI Client Hunter',
    role: 'Growth Automation Lead',
  },
  {
    quote: 'OUR E-COMMERCE CONVERSION RATE SURGED +180% WITHIN 30 DAYS OF REBUILDING THE FUNNEL WITH GROWTH BROTHERHOOD.',
    author: 'Confidential D2C Brand',
    role: 'E-Commerce Director',
  },
];

const STATS = [
  { label: 'PROJECTS DELIVERED', value: '40+' },
  { label: 'AVERAGE TRAFFIC INCREASE', value: '+280%' },
  { label: 'CLIENT SATISFACTION', value: '100%' },
  { label: 'COUNTRIES REACHED', value: '12+' },
];

function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [displayed, setDisplayed] = useState('0');

  useEffect(() => {
    if (!inView) return;
    const numeric = parseFloat(value.replace(/[^0-9.]/g, ''));
    const prefix = value.match(/^[^0-9]*/)?.[0] ?? '';
    const suffix = value.match(/[^0-9.]+$/)?.[0] ?? '';
    if (isNaN(numeric)) { setDisplayed(value); return; }

    let start = 0;
    const duration = 1500;
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * numeric);
      setDisplayed(`${prefix}${current}${suffix}`);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return <span ref={ref}>{displayed}</span>;
}

export default function ProofSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true });

  return (
    <section
      ref={sectionRef}
      id="proof"
      style={{
        width: '100vw',
        background: 'var(--gb-black)',
        padding: '8rem 2rem',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '6rem', textAlign: 'center' }}>
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
            09 — THE PROOF
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 7vw, 6rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              color: 'var(--gb-offwhite)',
              lineHeight: 0.95,
            }}
          >
            RESULTS THAT
            <br />
            <span style={{ color: 'var(--gb-copper)' }}>SPEAK</span>
          </h2>
        </div>

        {/* Stats grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2px',
            marginBottom: '6rem',
            background: 'rgba(245,240,232,0.04)',
          }}
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                padding: '3rem 2rem',
                background: 'var(--gb-black)',
                textAlign: 'center',
                borderBottom: '2px solid rgba(201,123,58,0)',
                transition: 'border-color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--gb-copper)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'transparent';
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  fontWeight: 700,
                  color: 'var(--gb-copper)',
                  letterSpacing: '-0.03em',
                  marginBottom: '0.5rem',
                  lineHeight: 1,
                }}
              >
                <AnimatedCounter value={stat.value} />
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.2em',
                  color: 'var(--gb-offwhite-muted)',
                  textTransform: 'uppercase',
                }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '6rem',
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.8 }}
              style={{
                padding: '2.5rem',
                background: 'var(--gb-charcoal)',
                border: '1px solid rgba(201,123,58,0.15)',
                position: 'relative',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: '1.5rem',
                  left: '2rem',
                  fontFamily: 'var(--font-display)',
                  fontSize: '3rem',
                  color: 'var(--gb-copper)',
                  lineHeight: 1,
                  opacity: 0.3,
                }}
              >
                "
              </span>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                  fontWeight: 600,
                  color: 'var(--gb-offwhite)',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.4,
                  marginBottom: '1.5rem',
                  paddingTop: '1.5rem',
                }}
              >
                {t.quote}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.2em',
                  color: 'var(--gb-copper)',
                  textTransform: 'uppercase',
                }}
              >
                — {t.author}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <Link
            href="/work"
            data-cursor="view"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              color: 'var(--gb-offwhite)',
              border: '1px solid rgba(245,240,232,0.2)',
              textDecoration: 'none',
              padding: '1rem 2rem',
              textTransform: 'uppercase',
              transition: 'border-color 0.3s ease, color 0.3s ease',
              display: 'inline-block',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = 'var(--gb-copper)';
              el.style.color = 'var(--gb-copper)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = 'rgba(245,240,232,0.2)';
              el.style.color = 'var(--gb-offwhite)';
            }}
          >
            VIEW ALL WORK →
          </Link>
        </div>
      </div>
    </section>
  );
}

export function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      id="about"
      style={{
        width: '100vw',
        background: 'var(--gb-charcoal)',
        padding: '8rem 2rem',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Background text */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(6rem, 15vw, 20rem)',
          fontWeight: 900,
          color: 'rgba(201,123,58,0.03)',
          textTransform: 'uppercase',
          letterSpacing: '-0.05em',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          userSelect: 'none',
        }}
      >
        GB
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 10 }}>
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
          08 — WHY WE EXIST
        </p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 6vw, 5rem)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            color: 'var(--gb-offwhite)',
            lineHeight: 1.05,
            marginBottom: '4rem',
            maxWidth: 800,
          }}
        >
          MOST AGENCIES BUILD WEBSITES.
          <br />
          <span style={{ color: 'var(--gb-copper)' }}>WE BUILD DIGITAL SYSTEMS.</span>
        </motion.h2>

        {/* Flow */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0',
            alignItems: 'center',
            marginBottom: '5rem',
          }}
        >
          {ABOUT_FLOW.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1rem, 2.5vw, 1.75rem)',
                  fontWeight: 700,
                  color: i === ABOUT_FLOW.length - 1 ? 'var(--gb-copper)' : 'var(--gb-offwhite)',
                  letterSpacing: '-0.01em',
                  padding: '0.5rem 1rem',
                  border:
                    i === ABOUT_FLOW.length - 1
                      ? '1px solid var(--gb-copper)'
                      : '1px solid rgba(245,240,232,0.1)',
                }}
              >
                {item}
              </span>
              {i < ABOUT_FLOW.length - 1 && (
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1rem',
                    color: 'var(--gb-copper)',
                    padding: '0 0.5rem',
                    opacity: 0.5,
                  }}
                >
                  →
                </span>
              )}
            </motion.div>
          ))}
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
          }}
        >
          {[
            {
              title: 'THE BRIEF',
              body: 'Every project starts with a clear brief. We understand your business, your market, and your competition before we open a design file.',
            },
            {
              title: 'THE BUILD',
              body: 'We engineer systems — not just websites. Every component serves a purpose. Every interaction is intentional.',
            },
            {
              title: 'THE RESULTS',
              body: 'We measure everything. Growth is the deliverable. The website is just one part of the system.',
            },
          ].map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 + i * 0.1, duration: 0.8 }}
              style={{
                padding: '2rem',
                borderTop: '1px solid rgba(201,123,58,0.3)',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.2em',
                  color: 'var(--gb-copper)',
                  marginBottom: '0.75rem',
                  textTransform: 'uppercase',
                }}
              >
                {card.title}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  color: 'var(--gb-offwhite-muted)',
                  lineHeight: 1.7,
                }}
              >
                {card.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
