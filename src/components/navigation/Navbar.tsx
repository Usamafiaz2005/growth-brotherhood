'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import SoundToggle from '@/components/audio/SoundSystem';

const navLinks = [
  { label: 'WORK', href: '/work' },
  { label: 'SERVICES', href: '/services' },
  { label: 'LAB', href: '/lab' },
  { label: 'ABOUT', href: '/about' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <nav
        ref={navRef}
        role="navigation"
        aria-label="Main navigation"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: '1.25rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'background 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), backdrop-filter 0.5s ease',
          background: scrolled
            ? 'rgba(10, 9, 8, 0.85)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(245, 240, 232, 0.06)' : 'none',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.2em',
            color: 'var(--gb-offwhite)',
            textDecoration: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.1rem',
            lineHeight: 1.1,
          }}
          aria-label="Growth Brotherhood — Home"
        >
          <span>GROWTH</span>
          <span style={{ color: 'var(--gb-copper)' }}>BROTHERHOOD</span>
        </Link>

        {/* Desktop links */}
        <div
          style={{
            display: 'flex',
            gap: '2.5rem',
            alignItems: 'center',
          }}
          className="hidden md:flex navbar-links"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.15em',
                color: 'var(--gb-offwhite-muted)',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
                position: 'relative',
              }}
              className="nav-link"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = 'var(--gb-offwhite)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = 'var(--gb-offwhite-muted)';
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <SoundToggle />
          <Link
            href="/contact"
            data-cursor="enter"
            className="hidden md:flex navbar-cta-desktop"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              color: 'var(--gb-black)',
              backgroundColor: 'var(--gb-copper)',
              textDecoration: 'none',
              padding: '0.625rem 1.25rem',
              transition: 'background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
              textTransform: 'uppercase',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = 'var(--gb-copper-light)';
              el.style.transform = 'scale(1.04)';
              el.style.boxShadow = '0 0 30px rgba(201, 123, 58, 0.4)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = 'var(--gb-copper)';
              el.style.transform = 'scale(1)';
              el.style.boxShadow = 'none';
            }}
          >
            START A PROJECT
          </Link>

          {/* Hamburger (mobile) */}
          <button
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex md:hidden navbar-mobile-toggle"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'none',
              padding: '0.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: 24,
                  height: 1.5,
                  backgroundColor: 'var(--gb-offwhite)',
                  transition: 'transform 0.3s ease, opacity 0.3s ease',
                  transform: menuOpen
                    ? i === 0
                      ? 'translateY(6.5px) rotate(45deg)'
                      : i === 1
                      ? 'scaleX(0)'
                      : 'translateY(-6.5px) rotate(-45deg)'
                    : 'none',
                  opacity: menuOpen && i === 1 ? 0 : 1,
                  transformOrigin: 'center',
                }}
              />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 999,
              backgroundColor: 'var(--gb-black)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '4rem 2rem',
            }}
          >
            <nav aria-label="Mobile navigation">
              <ul style={{ listStyle: 'none', marginBottom: '3rem' }}>
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 + 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{ borderBottom: '1px solid rgba(245, 240, 232, 0.06)' }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(2rem, 8vw, 4rem)',
                        fontWeight: 700,
                        color: 'var(--gb-offwhite)',
                        textDecoration: 'none',
                        display: 'block',
                        padding: '1rem 0',
                        letterSpacing: '-0.02em',
                        transition: 'color 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.color = 'var(--gb-copper)';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.color = 'var(--gb-offwhite)';
                      }}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1rem',
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    color: 'var(--gb-black)',
                    backgroundColor: 'var(--gb-copper)',
                    textDecoration: 'none',
                    padding: '1rem 2rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    textTransform: 'uppercase',
                  }}
                >
                  START A PROJECT →
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
