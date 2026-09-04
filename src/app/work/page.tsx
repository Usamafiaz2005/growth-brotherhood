import type { Metadata } from 'next';
import Link from 'next/link';
import { projects } from '@/data/projects';

export const metadata: Metadata = {
  title: 'Work — Growth Brotherhood',
  description: 'Case studies and portfolio work from Growth Brotherhood. Real projects, real results.',
};

export default function WorkPage() {
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
            SELECTED WORK
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              color: 'var(--gb-offwhite)',
              lineHeight: 0.9,
            }}
          >
            OUR
            <br />
            <span style={{ color: 'var(--gb-copper)' }}>WORK</span>
          </h1>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2px',
          }}
        >
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/work/${project.slug}`}
              data-cursor="explore"
              className="project-card"
              style={{
                display: 'block',
                background: 'var(--gb-charcoal)',
                textDecoration: 'none',
                position: 'relative',
                overflow: 'hidden',
                aspectRatio: '4/3',
                transition: 'background 0.3s ease',
              }}
            >
              {/* Color accent bar */}
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

              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '2rem',
                }}
              >
                {/* Giant muted number */}
                <span
                  style={{
                    position: 'absolute',
                    top: '1.5rem',
                    right: '1.5rem',
                    fontFamily: 'var(--font-display)',
                    fontSize: '5rem',
                    fontWeight: 900,
                    color: `${project.heroColor}12`,
                    lineHeight: 1,
                    letterSpacing: '-0.05em',
                    userSelect: 'none',
                  }}
                >
                  0{project.id}
                </span>

                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.6rem',
                    letterSpacing: '0.2em',
                    color: project.heroColor,
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase',
                  }}
                >
                  {project.category}
                </p>
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.2rem, 2.5vw, 2rem)',
                    fontWeight: 700,
                    color: 'var(--gb-offwhite)',
                    letterSpacing: '-0.02em',
                    marginBottom: '0.75rem',
                  }}
                >
                  {project.title}
                </h2>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    color: 'var(--gb-offwhite-muted)',
                    lineHeight: 1.6,
                    marginBottom: '1.5rem',
                    maxWidth: 350,
                  }}
                >
                  {project.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {project.services.map((s) => (
                    <span
                      key={s}
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.6rem',
                        letterSpacing: '0.12em',
                        color: 'var(--gb-offwhite-muted)',
                        border: '1px solid rgba(245,240,232,0.12)',
                        padding: '0.2rem 0.6rem',
                        textTransform: 'uppercase',
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover arrow */}
              <div
                style={{
                  position: 'absolute',
                  top: '1.5rem',
                  left: '1.5rem',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.15em',
                  color: project.heroColor,
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  textTransform: 'uppercase',
                }}
                className="project-arrow"
              >
                VIEW CASE STUDY ↗
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
