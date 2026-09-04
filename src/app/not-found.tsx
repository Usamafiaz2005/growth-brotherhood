import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 — Page Not Found | Growth Brotherhood',
  description: 'This page does not exist.',
};

export default function NotFound() {
  return (
    <main
      style={{
        width: '100vw',
        height: '100vh',
        background: 'var(--gb-black)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
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
        404 — NOT FOUND
      </p>
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(4rem, 15vw, 12rem)',
          fontWeight: 700,
          letterSpacing: '-0.05em',
          color: 'var(--gb-offwhite)',
          lineHeight: 0.9,
          marginBottom: '2rem',
          opacity: 0.2,
        }}
      >
        404
      </h1>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '1rem',
          color: 'var(--gb-offwhite-muted)',
          marginBottom: '3rem',
          maxWidth: 400,
          lineHeight: 1.7,
        }}
      >
        This page doesn't exist — but your growth system does. Let's build it.
      </p>
      <a
        href="/"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.8rem',
          fontWeight: 700,
          letterSpacing: '0.15em',
          color: 'var(--gb-black)',
          background: 'var(--gb-copper)',
          textDecoration: 'none',
          padding: '1rem 2rem',
          textTransform: 'uppercase',
        }}
      >
        RETURN HOME →
      </a>
    </main>
  );
}
