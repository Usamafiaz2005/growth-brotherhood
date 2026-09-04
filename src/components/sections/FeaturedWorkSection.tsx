'use client';

import Link from 'next/link';
import { projects } from '@/data/projects';
import TiltCard from '@/components/ui/TiltCard';
import RevealOnScroll from '@/components/ui/RevealOnScroll';

export default function FeaturedWorkSection() {
  return (
    <section
      id="proof-work"
      style={{
        width: '100vw',
        background: 'var(--gb-black)',
        padding: '6rem 2rem 8rem',
        borderBottom: '1px solid rgba(245, 240, 232, 0.06)',
      }}
    >
      <div className="gb-section" style={{ padding: 0 }}>
        <RevealOnScroll>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem', marginBottom: '4rem' }}>
            <div>
              <p className="gb-eyebrow">02 — FEATURED PROOF</p>
              <h2 className="gb-heading-xl" style={{ marginBottom: 0 }}>
                SELECTED <span style={{ color: 'var(--gb-copper)' }}>SYSTEMS.</span>
              </h2>
            </div>
            <Link href="/work" className="gb-btn-outline" data-cursor="enter">
              VIEW ALL CASE STUDIES →
            </Link>
          </div>
        </RevealOnScroll>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
          {projects.map((project, idx) => (
            <RevealOnScroll key={project.id} delay={idx * 0.15}>
              <TiltCard maxTilt={8}>
                <Link
                  href={`/work/${project.slug}`}
                  data-cursor="explore"
                  className="gb-card-charcoal"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: 400,
                    textDecoration: 'none',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Top Accent Line */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 3,
                      background: project.heroColor,
                    }}
                  />

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '0.65rem',
                          letterSpacing: '0.2em',
                          color: project.heroColor,
                          textTransform: 'uppercase',
                        }}
                      >
                        {project.category}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          color: 'var(--gb-offwhite-muted)',
                        }}
                      >
                        0{idx + 1}
                      </span>
                    </div>

                    <h3 className="gb-heading-md" style={{ marginBottom: '1rem' }}>
                      {project.title}
                    </h3>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--gb-offwhite-muted)', lineHeight: 1.65, marginBottom: '2rem' }}>
                      {project.description}
                    </p>
                  </div>

                  <div>
                    {/* Key Metrics Grid */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '1rem',
                        paddingTop: '1.5rem',
                        borderTop: '1px solid rgba(245, 240, 232, 0.08)',
                      }}
                    >
                      {project.results.slice(0, 2).map((res) => (
                        <div key={res.label}>
                          <p
                            style={{
                              fontFamily: 'var(--font-display)',
                              fontSize: '1.5rem',
                              fontWeight: 700,
                              color: 'var(--gb-copper)',
                              lineHeight: 1,
                              marginBottom: '0.25rem',
                            }}
                          >
                            {res.value}
                          </p>
                          <p
                            style={{
                              fontFamily: 'var(--font-display)',
                              fontSize: '0.6rem',
                              letterSpacing: '0.12em',
                              color: 'var(--gb-offwhite-muted)',
                              textTransform: 'uppercase',
                            }}
                          >
                            {res.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Link>
              </TiltCard>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
