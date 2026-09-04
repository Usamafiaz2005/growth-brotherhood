import type { Metadata } from 'next';
import Link from 'next/link';
import EntryScene from '@/components/3d/scenes/EntryScene';
import FeaturedWorkSection from '@/components/sections/FeaturedWorkSection';
import TheSystemSection from '@/components/sections/TheSystemSection';
import GrowthSimulator from '@/components/sections/GrowthSimulator';
import ProofSection, { AboutSection } from '@/components/sections/ProofSection';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import { services } from '@/data/services';

export const metadata: Metadata = {
  title: 'Growth Brotherhood — Digital Experiences & Growth Systems',
  description:
    'We build digital systems that drive measurable growth. Web development, AI automation, digital marketing and brand identity for ambitious businesses.',
};

export default function HomePage() {
  return (
    <>
      {/* 01 — HERO (Massive Typography + 1 Exceptional 3D Moment) */}
      <EntryScene />

      {/* 02 — FEATURED PROOF (Real Work Immediately Below Fold) */}
      <FeaturedWorkSection />

      {/* 03 — CAPABILITIES (Six Services as an Integrated System) */}
      <section
        id="capabilities"
        style={{
          width: '100vw',
          background: 'var(--gb-black)',
          padding: '8rem 2rem',
          borderBottom: '1px solid rgba(245, 240, 232, 0.06)',
        }}
      >
        <div className="gb-section" style={{ padding: 0 }}>
          <RevealOnScroll>
            <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto 5rem' }}>
              <p className="gb-eyebrow" style={{ justifyContent: 'center' }}>03 — CAPABILITIES</p>
              <h2 className="gb-heading-xl">
                SIX CAPABILITIES. <span style={{ color: 'var(--gb-copper)' }}>ONE SYSTEM.</span>
              </h2>
              <p className="gb-subtext" style={{ margin: '0 auto' }}>
                Every service we offer is engineered to integrate seamlessly. When combined, the result is a revenue growth system — not a fragmented collection of projects.
              </p>
            </div>
          </RevealOnScroll>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {services.map((service, idx) => (
              <RevealOnScroll key={service.id} delay={idx * 0.1}>
                <div
                  className="gb-card-charcoal"
                  style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    borderLeft: '3px solid var(--gb-copper)',
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.65rem',
                        letterSpacing: '0.2em',
                        color: 'var(--gb-copper)',
                        display: 'block',
                        marginBottom: '0.75rem',
                      }}
                    >
                      0{idx + 1} — {service.shortTitle}
                    </span>
                    <h3 className="gb-heading-md" style={{ marginBottom: '0.5rem' }}>
                      {service.title}
                    </h3>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--gb-offwhite-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                      {service.description}
                    </p>
                  </div>

                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem' }}>
                    {service.capabilities.slice(0, 3).map((cap) => (
                      <li
                        key={cap}
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '0.7rem',
                          letterSpacing: '0.1em',
                          color: 'var(--gb-offwhite-muted)',
                          padding: '0.35rem 0',
                          borderTop: '1px solid rgba(245, 240, 232, 0.05)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                        }}
                      >
                        <span style={{ color: 'var(--gb-copper)' }}>—</span> {cap}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <Link href="/services" className="gb-btn-outline" data-cursor="enter">
              EXPLORE ALL CAPABILITIES →
            </Link>
          </div>
        </div>
      </section>

      {/* 04 — THE SYSTEM (Methodology Flow) */}
      <TheSystemSection />

      {/* 05 — DETERMINISTIC GROWTH ASSESSOR */}
      <GrowthSimulator />

      {/* 06 — THE LAB & EXPERIMENTAL TECH PREVIEW */}
      <section
        id="lab-preview"
        style={{
          width: '100vw',
          background: 'var(--gb-charcoal-2)',
          padding: '6rem 2rem',
          borderBottom: '1px solid rgba(245, 240, 232, 0.06)',
        }}
      >
        <div className="gb-section" style={{ padding: 0 }}>
          <RevealOnScroll>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '2rem',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <p className="gb-eyebrow" style={{ margin: 0 }}>06 — CREATIVE EXPERIMENTS</p>
                  <span className="gb-badge-teal">● LIVE 3D LAB</span>
                </div>
                <h2 className="gb-heading-xl" style={{ marginBottom: '0.75rem' }}>
                  THE CREATIVE <span style={{ color: 'var(--gb-copper)' }}>LAB.</span>
                </h2>
                <p className="gb-subtext">
                  Explore our interactive 3D WebGL prototypes, neural simulation models, and visual R&D experiments.
                </p>
              </div>

              <Link href="/lab" className="gb-btn-primary" data-cursor="enter">
                ENTER THE LAB →
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* 07 — ABOUT & HUMANIZED PHILOSOPHY */}
      <AboutSection />

      {/* 08 — PROOF STATISTICS */}
      <ProofSection />

      {/* 09 — FINAL HIGH-CONVERSION CTA */}
      <section
        style={{
          width: '100vw',
          padding: '10rem 2rem',
          background: 'var(--gb-black)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at center, rgba(201, 123, 58, 0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div style={{ position: 'relative', zIndex: 10, maxWidth: 900, margin: '0 auto' }}>
          <RevealOnScroll>
            <p className="gb-eyebrow" style={{ justifyContent: 'center' }}>LET'S WORK TOGETHER</p>
            <h2 className="gb-heading-hero" style={{ marginBottom: '2rem' }}>
              READY TO BUILD
              <br />
              <span style={{ color: 'var(--gb-copper)' }}>YOUR SYSTEM?</span>
            </h2>
            <p className="gb-subtext" style={{ margin: '0 auto 3rem', textAlign: 'center' }}>
              We partner with a limited number of ambitious brands each quarter. Let's engineer your growth infrastructure.
            </p>
            <Link href="/contact" className="gb-btn-primary" data-cursor="enter" style={{ padding: '1.25rem 3rem' }}>
              START A PROJECT →
            </Link>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
