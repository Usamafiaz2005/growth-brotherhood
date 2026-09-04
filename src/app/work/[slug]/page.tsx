import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { projects } from '@/data/projects';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — Growth Brotherhood`,
    description: project.description,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

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
          padding: '4rem 2rem 6rem',
          borderBottom: `1px solid rgba(245,240,232,0.06)`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Accent color glow */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '20%',
            width: '60%',
            height: '1px',
            background: `linear-gradient(90deg, transparent, ${project.heroColor}, transparent)`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '20%',
            width: '60%',
            height: '150px',
            background: `radial-gradient(ellipse at center top, ${project.heroColor}15, transparent 70%)`,
          }}
        />

        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Link
            href="/work"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.65rem',
              letterSpacing: '0.2em',
              color: 'var(--gb-offwhite-muted)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '3rem',
              textTransform: 'uppercase',
              transition: 'color 0.3s ease',
            }}
          >
            ← ALL WORK
          </Link>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: '4rem',
              alignItems: 'start',
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.3em',
                  color: project.heroColor,
                  marginBottom: '1rem',
                  textTransform: 'uppercase',
                }}
              >
                {project.category}
              </p>
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.5rem, 7vw, 6rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.04em',
                  color: 'var(--gb-offwhite)',
                  lineHeight: 0.9,
                  marginBottom: '2rem',
                }}
              >
                {project.title}
              </h1>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.1rem',
                  color: 'var(--gb-offwhite-muted)',
                  lineHeight: 1.7,
                  maxWidth: 550,
                }}
              >
                {project.description}
              </p>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                minWidth: 200,
              }}
            >
              <div>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--gb-offwhite-muted)', marginBottom: '0.3rem', textTransform: 'uppercase' }}>CLIENT</p>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', color: 'var(--gb-offwhite)' }}>{project.client}</p>
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--gb-offwhite-muted)', marginBottom: '0.3rem', textTransform: 'uppercase' }}>SERVICES</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  {project.services.map((s) => (
                    <p key={s} style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem', color: 'var(--gb-offwhite)' }}>{s}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results banner */}
      <section
        style={{
          background: 'var(--gb-charcoal)',
          padding: '3rem 2rem',
          borderBottom: '1px solid rgba(245,240,232,0.06)',
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: `repeat(${project.results.length}, 1fr)`,
            gap: '1rem',
          }}
        >
          {project.results.map((result) => (
            <div key={result.label} style={{ textAlign: 'center', padding: '1rem' }}>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                  fontWeight: 700,
                  color: project.heroColor,
                  letterSpacing: '-0.02em',
                  marginBottom: '0.25rem',
                }}
              >
                {result.value}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.18em',
                  color: 'var(--gb-offwhite-muted)',
                  textTransform: 'uppercase',
                }}
              >
                {result.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Case study body */}
      <section style={{ padding: '6rem 2rem' }}>
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          {[
            { heading: 'THE PROBLEM', content: project.challenge, accentColor: '#B8B0A4' },
            { heading: 'THE STRATEGY', content: project.strategy, accentColor: project.heroColor },
            { heading: 'THE SOLUTION', content: project.solution, accentColor: project.heroColor },
          ].map((section) => (
            <div
              key={section.heading}
              style={{
                marginBottom: '4rem',
                paddingLeft: '2rem',
                borderLeft: `2px solid ${section.accentColor}40`,
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.25em',
                  color: section.accentColor,
                  marginBottom: '1rem',
                  textTransform: 'uppercase',
                }}
              >
                {section.heading}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.05rem',
                  color: 'var(--gb-offwhite-muted)',
                  lineHeight: 1.8,
                }}
              >
                {section.content}
              </p>
            </div>
          ))}

          {/* Testimonial */}
          {project.testimonial && (
            <div
              style={{
                background: 'var(--gb-charcoal)',
                border: `1px solid ${project.heroColor}20`,
                padding: '3rem',
                marginBottom: '4rem',
                position: 'relative',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: '2rem',
                  left: '2.5rem',
                  fontFamily: 'var(--font-display)',
                  fontSize: '4rem',
                  color: project.heroColor,
                  opacity: 0.3,
                  lineHeight: 1,
                }}
              >
                "
              </span>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1rem, 2vw, 1.4rem)',
                  fontWeight: 600,
                  color: 'var(--gb-offwhite)',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.5,
                  marginBottom: '1.5rem',
                  paddingTop: '1.5rem',
                }}
              >
                {project.testimonial.quote}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.2em',
                  color: project.heroColor,
                  textTransform: 'uppercase',
                }}
              >
                — {project.testimonial.author}, {project.testimonial.role}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Next project / CTA */}
      <section
        style={{
          borderTop: '1px solid rgba(245,240,232,0.06)',
          padding: '4rem 2rem',
          display: 'flex',
          gap: '2rem',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          maxWidth: 1100,
          margin: '0 auto',
        }}
      >
        <Link
          href="/work"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            color: 'var(--gb-offwhite-muted)',
            textDecoration: 'none',
            textTransform: 'uppercase',
            transition: 'color 0.3s ease',
          }}
        >
          ← ALL WORK
        </Link>
        <Link
          href="/contact"
          data-cursor="enter"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.15em',
            color: 'var(--gb-black)',
            background: project.heroColor,
            textDecoration: 'none',
            padding: '0.875rem 2rem',
            textTransform: 'uppercase',
          }}
        >
          START YOUR PROJECT →
        </Link>
      </section>
    </main>
  );
}
