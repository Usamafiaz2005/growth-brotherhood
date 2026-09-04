'use client';

import { useState } from 'react';
import RevealOnScroll from '@/components/ui/RevealOnScroll';

const SYSTEM_STAGES = [
  {
    step: '01',
    title: 'STRATEGY',
    tagline: 'MARKET POSITIONING & ARCHITECTURE',
    desc: 'We map market opportunities, high-intent customer queries, and business conversion economics before writing a line of code.',
  },
  {
    step: '02',
    title: 'BRAND',
    tagline: 'LUXURY POSITIONING & VISUAL SYSTEM',
    desc: 'Brand identity systems engineered to position you as the definitive premium choice in your industry.',
  },
  {
    step: '03',
    title: 'EXPERIENCE',
    tagline: 'HIGH-CONVERSION DIGITAL PLATFORM',
    desc: 'Sub-second Next.js web platforms built around conversion psychology, performance, and structured schema data.',
  },
  {
    step: '04',
    title: 'AI',
    tagline: 'AUTONOMOUS LEAD & INTEL PIPELINES',
    desc: 'Custom multi-model AI workflows that aggregate web signals, qualify intent, and eliminate manual research overhead.',
  },
  {
    step: '05',
    title: 'AUTOMATION',
    tagline: 'LIFECYCLE & CRM INTEGRATION',
    desc: 'Automated CRM, email, and behavioral messaging triggers that capture and nurture prospect pipeline 24/7.',
  },
  {
    step: '06',
    title: 'GROWTH',
    tagline: 'MEASURABLE BUSINESS SCALE',
    desc: 'Continuous analytics optimization ensuring consistent qualified pipeline growth and business enterprise value.',
  },
];

export default function TheSystemSection() {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <section
      id="the-system"
      style={{
        width: '100vw',
        background: '#0a0908',
        padding: '8rem 2rem',
        borderBottom: '1px solid rgba(245, 240, 232, 0.06)',
      }}
    >
      <div className="gb-section" style={{ padding: 0 }}>
        <RevealOnScroll>
          <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto 5rem' }}>
            <p className="gb-eyebrow" style={{ justifyContent: 'center' }}>04 — METHODOLOGY</p>
            <h2 className="gb-heading-xl">
              THE <span style={{ color: 'var(--gb-copper)' }}>GROWTH SYSTEM</span> FLOW
            </h2>
            <p className="gb-subtext" style={{ margin: '0 auto' }}>
              Isolated tactics produce isolated results. Our connected 6-stage methodology links market strategy directly to automated revenue growth.
            </p>
          </div>
        </RevealOnScroll>

        {/* System Pipeline Stepper */}
        <RevealOnScroll delay={0.2}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1px',
              background: 'rgba(245, 240, 232, 0.08)',
              marginBottom: '3rem',
            }}
          >
            {SYSTEM_STAGES.map((st, i) => (
              <button
                key={st.title}
                onClick={() => setActiveStage(i)}
                style={{
                  background: activeStage === i ? 'var(--gb-charcoal-2)' : 'var(--gb-black)',
                  border: 'none',
                  padding: '1.75rem 1.25rem',
                  textAlign: 'left',
                  cursor: 'none',
                  transition: 'background 0.3s ease, border-color 0.3s ease',
                  borderTop: activeStage === i ? '3px solid var(--gb-copper)' : '3px solid transparent',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.15em',
                    color: activeStage === i ? 'var(--gb-copper)' : 'var(--gb-offwhite-muted)',
                    display: 'block',
                    marginBottom: '0.5rem',
                  }}
                >
                  STAGE {st.step}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1rem',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    color: activeStage === i ? 'var(--gb-offwhite)' : 'var(--gb-offwhite-muted)',
                  }}
                >
                  {st.title}
                </span>
              </button>
            ))}
          </div>
        </RevealOnScroll>

        {/* Active Stage Detail Panel */}
        <RevealOnScroll delay={0.3}>
          <div
            className="gb-card-charcoal"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 2fr',
              gap: '3rem',
              alignItems: 'center',
              background: 'var(--gb-charcoal-2)',
              border: '1px solid rgba(201, 123, 58, 0.3)',
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '4rem',
                  fontWeight: 900,
                  color: 'rgba(201, 123, 58, 0.2)',
                  lineHeight: 1,
                  display: 'block',
                  marginBottom: '0.5rem',
                }}
              >
                {SYSTEM_STAGES[activeStage].step}
              </span>
              <p className="gb-eyebrow" style={{ marginBottom: '0.5rem' }}>
                {SYSTEM_STAGES[activeStage].tagline}
              </p>
              <h3 className="gb-heading-md" style={{ color: 'var(--gb-copper)' }}>
                {SYSTEM_STAGES[activeStage].title}
              </h3>
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: 'var(--gb-offwhite)', lineHeight: 1.7 }}>
                {SYSTEM_STAGES[activeStage].desc}
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
