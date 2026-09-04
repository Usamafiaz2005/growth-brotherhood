'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Europe/London',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setTimeStr(now.toLocaleTimeString('en-GB', options) + ' GMT (LONDON)');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        width: '100vw',
        background: '#070605',
        borderTop: '1px solid rgba(245, 240, 232, 0.08)',
        padding: '5rem 2rem 3rem',
        position: 'relative',
        zIndex: 20,
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Main Footer Header */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '3rem',
            marginBottom: '4rem',
          }}
        >
          {/* Brand Column */}
          <div>
            <Link
              href="/"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1rem',
                fontWeight: 700,
                letterSpacing: '0.2em',
                color: 'var(--gb-offwhite)',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.1rem',
                marginBottom: '1rem',
              }}
            >
              <span>GROWTH</span>
              <span style={{ color: 'var(--gb-copper)' }}>BROTHERHOOD</span>
            </Link>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                color: 'var(--gb-offwhite-muted)',
                lineHeight: 1.6,
                maxWidth: 320,
                marginBottom: '1.5rem',
              }}
            >
              We build immersive digital systems that drive measurable growth. Engineering, AI automation, and high-conversion visual design.
            </p>

            {/* Status Dot */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(45, 212, 191, 0.08)',
                border: '1px solid rgba(45, 212, 191, 0.2)',
                padding: '0.4rem 0.8rem',
                borderRadius: '20px',
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  backgroundColor: '#2DD4BF',
                  boxShadow: '0 0 10px #2DD4BF',
                  animation: 'fadeUp 2s infinite alternate',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.15em',
                  color: '#2DD4BF',
                  textTransform: 'uppercase',
                }}
              >
                SYSTEM OPERATIONAL · Q3/Q4 SLOTS OPEN
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.65rem',
                letterSpacing: '0.25em',
                color: 'var(--gb-copper)',
                marginBottom: '1.25rem',
                textTransform: 'uppercase',
              }}
            >
              NAVIGATION
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { label: 'WORK & CASE STUDIES', href: '/work' },
                { label: 'SERVICES & CAPABILITIES', href: '/services' },
                { label: 'CREATIVE LAB', href: '/lab' },
                { label: 'ABOUT THE BROTHERHOOD', href: '/about' },
                { label: 'START A PROJECT', href: '/contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.8rem',
                      letterSpacing: '0.12em',
                      color: 'var(--gb-offwhite-muted)',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = 'var(--gb-offwhite)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = 'var(--gb-offwhite-muted)';
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Location & Time */}
          <div>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.65rem',
                letterSpacing: '0.25em',
                color: 'var(--gb-copper)',
                marginBottom: '1.25rem',
                textTransform: 'uppercase',
              }}
            >
              HEADQUARTERS & TIME
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                color: 'var(--gb-offwhite)',
                marginBottom: '0.5rem',
              }}
            >
              LONDON, UNITED KINGDOM
            </p>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                color: 'var(--gb-copper)',
                marginBottom: '1.5rem',
              }}
            >
              {timeStr || '12:00:00 GMT (LONDON)'}
            </p>
            <a
              href="mailto:hello@growthbrotherhood.com"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                color: 'var(--gb-offwhite)',
                textDecoration: 'underline',
                textUnderlineOffset: '4px',
              }}
            >
              HELLO@GROWTHBROTHERHOOD.COM
            </a>
          </div>
        </div>

        {/* Footer Bottom Strip */}
        <div
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid rgba(245, 240, 232, 0.05)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.65rem',
              letterSpacing: '0.15em',
              color: 'var(--gb-offwhite-muted)',
            }}
          >
            © {new Date().getFullYear()} GROWTH BROTHERHOOD LTD. ALL RIGHTS RESERVED.
          </p>

          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            style={{
              background: 'none',
              border: '1px solid rgba(245, 240, 232, 0.15)',
              color: 'var(--gb-offwhite-muted)',
              fontFamily: 'var(--font-display)',
              fontSize: '0.65rem',
              letterSpacing: '0.15em',
              padding: '0.5rem 1rem',
              cursor: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = 'var(--gb-copper)';
              el.style.color = 'var(--gb-copper)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = 'rgba(245, 240, 232, 0.15)';
              el.style.color = 'var(--gb-offwhite-muted)';
            }}
          >
            BACK TO TOP ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
