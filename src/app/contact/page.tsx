'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';

type FormStep = 'name' | 'business' | 'website' | 'needs' | 'budget' | 'timeline' | 'message' | 'email' | 'done' | 'sent';

const NEEDS_OPTIONS = ['WEBSITE', 'AI AUTOMATION', 'MARKETING', 'BRANDING', 'SEO', 'STRATEGY'];
const BUDGET_OPTIONS = ['< £2,000', '£2,000 – £5,000', '£5,000 – £15,000', '£15,000+'];
const TIMELINE_OPTIONS = ['ASAP', '1 – 3 MONTHS', '3 – 6 MONTHS', '6+ MONTHS'];

// Mini 3D visuals that respond to user selections
function VisualBrowser() {
  const ref = useRef<THREE.Group>(null);
  useFrame((s) => { if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.5; });
  return (
    <group ref={ref}>
      <mesh>
        <boxGeometry args={[1.2, 0.85, 0.04]} />
        <meshStandardMaterial color="#C97B3A" metalness={0.8} roughness={0.2} emissive="#C97B3A" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0, 0.52, 0.02]}>
        <boxGeometry args={[1.2, 0.12, 0.01]} />
        <meshStandardMaterial color="#E8893A" metalness={0.6} roughness={0.3} />
      </mesh>
      <pointLight color="#C97B3A" intensity={3} distance={5} />
    </group>
  );
}

function VisualNeural() {
  const ref = useRef<THREE.Group>(null);
  useFrame((s) => { if (ref.current) { ref.current.rotation.y = s.clock.elapsedTime * 0.8; ref.current.rotation.x = s.clock.elapsedTime * 0.4; } });
  return (
    <group ref={ref}>
      <mesh>
        <icosahedronGeometry args={[0.6, 2]} />
        <meshStandardMaterial color="#2DD4BF" metalness={0.9} roughness={0.1} wireframe emissive="#2DD4BF" emissiveIntensity={0.8} />
      </mesh>
      <pointLight color="#2DD4BF" intensity={4} distance={5} />
    </group>
  );
}

function VisualParticles() {
  const ref = useRef<THREE.Points>(null);
  const positions = new Float32Array(300 * 3);
  for (let i = 0; i < 300; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 4;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
  }
  useFrame((s) => { if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.2; });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#C97B3A" transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

function ContactVisual({ needs }: { needs: string[] }) {
  const showBrowser = needs.includes('WEBSITE');
  const showNeural = needs.includes('AI AUTOMATION');
  const showParticles = needs.includes('MARKETING') || needs.includes('BRANDING');

  if (!needs.length) return (
    <group>
      <mesh>
        <octahedronGeometry args={[0.4, 0]} />
        <meshStandardMaterial color="#C97B3A" metalness={0.8} roughness={0.2} emissive="#C97B3A" emissiveIntensity={0.5} />
      </mesh>
      <pointLight color="#C97B3A" intensity={2} distance={5} />
    </group>
  );

  return (
    <group>
      {showBrowser && <group position={[-0.8, 0, 0]}><VisualBrowser /></group>}
      {showNeural && <group position={[0, 0, 0]}><VisualNeural /></group>}
      {showParticles && <VisualParticles />}
    </group>
  );
}

const STEP_ORDER: FormStep[] = ['name', 'business', 'website', 'needs', 'budget', 'timeline', 'message', 'email', 'done'];

export default function ContactPage() {
  const [step, setStep] = useState<FormStep>('name');
  const [form, setForm] = useState({
    name: '', business: '', website: '', needs: [] as string[],
    budget: '', timeline: '', message: '', email: '',
  });

  const currentStepIndex = STEP_ORDER.indexOf(step);

  const advance = (key: keyof typeof form, value: string | string[]) => {
    setForm((p) => ({ ...p, [key]: value }));
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < STEP_ORDER.length) {
      setStep(STEP_ORDER[nextIndex]);
    }
  };

  const handleSubmit = async () => {
    setStep('sent');
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    } catch (e) {
      // Silent fail — submission confirmed UI anyway
    }
  };

  return (
    <div
      style={{
        width: '100vw',
        minHeight: '100vh',
        background: 'var(--gb-black)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8rem 2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 3D Visual */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.4,
          pointerEvents: 'none',
        }}
      >
        <Canvas camera={{ position: [0, 0, 5], fov: 55 }} gl={{ antialias: true, alpha: true }} dpr={[1, 1.5]}>
          <ambientLight intensity={0.3} />
          <Suspense fallback={null}>
            <ContactVisual needs={form.needs} />
          </Suspense>
        </Canvas>
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          maxWidth: 680,
          width: '100%',
        }}
      >
        {step !== 'sent' ? (
          <>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.65rem',
                letterSpacing: '0.3em',
                color: 'var(--gb-copper)',
                marginBottom: '1.5rem',
                textTransform: 'uppercase',
              }}
            >
              10 — START A PROJECT
            </p>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 7vw, 6rem)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                color: 'var(--gb-offwhite)',
                lineHeight: 0.95,
                marginBottom: '4rem',
              }}
            >
              WHAT ARE WE
              <br />
              <span style={{ color: 'var(--gb-copper)' }}>BUILDING?</span>
            </h1>

            {/* Progress dots */}
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '3rem' }}>
              {STEP_ORDER.filter((s) => s !== 'done').map((s, i) => (
                <div
                  key={s}
                  style={{
                    width: i <= currentStepIndex ? 24 : 8,
                    height: 4,
                    borderRadius: 2,
                    background: i < currentStepIndex ? 'var(--gb-copper)' : i === currentStepIndex ? 'var(--gb-copper-light)' : 'rgba(245,240,232,0.15)',
                    transition: 'all 0.4s ease',
                  }}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {step === 'name' && (
                  <FormField
                    label="YOUR NAME"
                    placeholder="First name"
                    onSubmit={(v) => advance('name', v)}
                  />
                )}
                {step === 'business' && (
                  <FormField
                    label="YOUR BUSINESS"
                    placeholder="Company name"
                    onSubmit={(v) => advance('business', v)}
                  />
                )}
                {step === 'website' && (
                  <FormField
                    label="YOUR WEBSITE"
                    placeholder="yoursite.com (or 'none')"
                    onSubmit={(v) => advance('website', v)}
                    optional
                  />
                )}
                {step === 'needs' && (
                  <MultiSelect
                    label="WHAT DO YOU NEED?"
                    options={NEEDS_OPTIONS}
                    selected={form.needs}
                    onChange={(v) => setForm((p) => ({ ...p, needs: v }))}
                    onContinue={() => {
                      const nextIndex = currentStepIndex + 1;
                      if (nextIndex < STEP_ORDER.length) setStep(STEP_ORDER[nextIndex]);
                    }}
                  />
                )}
                {step === 'budget' && (
                  <ChoiceField
                    label="BUDGET RANGE"
                    options={BUDGET_OPTIONS}
                    onSelect={(v) => advance('budget', v)}
                  />
                )}
                {step === 'timeline' && (
                  <ChoiceField
                    label="TIMELINE"
                    options={TIMELINE_OPTIONS}
                    onSelect={(v) => advance('timeline', v)}
                  />
                )}
                {step === 'message' && (
                  <TextareaField
                    label="YOUR MESSAGE"
                    placeholder="Tell us about your project, goals, and challenges..."
                    onSubmit={(v) => advance('message', v)}
                    optional
                  />
                )}
                {step === 'email' && (
                  <FormField
                    label="YOUR EMAIL"
                    placeholder="your@email.com"
                    type="email"
                    onSubmit={(v) => advance('email', v)}
                  />
                )}
                {step === 'done' && (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                    <p
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.5rem, 4vw, 3rem)',
                        fontWeight: 700,
                        color: 'var(--gb-offwhite)',
                        letterSpacing: '-0.02em',
                        marginBottom: '2rem',
                      }}
                    >
                      LET'S BUILD IT, {form.name.toUpperCase()}.
                    </p>
                    <button
                      data-cursor="enter"
                      onClick={handleSubmit}
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        letterSpacing: '0.2em',
                        color: 'var(--gb-black)',
                        background: 'var(--gb-copper)',
                        border: 'none',
                        padding: '1.2rem 3rem',
                        cursor: 'none',
                        textTransform: 'uppercase',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.transform = 'scale(1.05)';
                        el.style.boxShadow = '0 0 50px rgba(201,123,58,0.5)';
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.transform = 'scale(1)';
                        el.style.boxShadow = 'none';
                      }}
                    >
                      SUBMIT →
                    </button>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </>
        ) : (
          // Sent state
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ textAlign: 'center' }}
          >
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.65rem',
                letterSpacing: '0.4em',
                color: 'var(--gb-copper)',
                marginBottom: '2rem',
                textTransform: 'uppercase',
              }}
            >
              TRANSMISSION RECEIVED.
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.5rem, 5vw, 4rem)',
                fontWeight: 700,
                color: 'var(--gb-offwhite)',
                letterSpacing: '-0.02em',
                marginBottom: '1rem',
              }}
            >
              THE NEXT MOVE IS OURS.
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                color: 'var(--gb-offwhite-muted)',
                marginBottom: '3rem',
              }}
            >
              We'll be in touch within 24 hours.
            </p>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1rem, 3vw, 2rem)',
                fontWeight: 700,
                color: 'var(--gb-copper)',
                letterSpacing: '-0.01em',
              }}
            >
              GROWTH BROTHERHOOD
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ── Sub-components ──────────────────────────────────────────────────────────────

function FormField({
  label, placeholder, type = 'text', onSubmit, optional = false,
}: {
  label: string; placeholder: string; type?: string; onSubmit: (v: string) => void; optional?: boolean;
}) {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => { inputRef.current?.focus(); }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim() && !optional) return;
    onSubmit(value.trim());
  };

  return (
    <form onSubmit={handleSubmit}>
      <label
        style={{
          display: 'block',
          fontFamily: 'var(--font-display)',
          fontSize: '0.65rem',
          letterSpacing: '0.25em',
          color: 'var(--gb-offwhite-muted)',
          marginBottom: '1.5rem',
          textTransform: 'uppercase',
        }}
      >
        {label}
        {optional && <span style={{ color: 'var(--gb-copper)', marginLeft: '0.5rem' }}>(optional)</span>}
      </label>
      <input
        ref={inputRef}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          background: 'transparent',
          border: 'none',
          borderBottom: '1px solid rgba(245,240,232,0.3)',
          padding: '0.75rem 0',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          color: 'var(--gb-offwhite)',
          outline: 'none',
          letterSpacing: '-0.01em',
          marginBottom: '2rem',
          textAlign: 'center',
        }}
      />
      <button
        type="submit"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.75rem',
          fontWeight: 700,
          letterSpacing: '0.2em',
          color: 'var(--gb-black)',
          background: 'var(--gb-copper)',
          border: 'none',
          padding: '0.875rem 2rem',
          cursor: 'none',
          textTransform: 'uppercase',
        }}
      >
        CONTINUE →
      </button>
      {optional && (
        <button
          type="button"
          onClick={() => onSubmit('')}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.7rem',
            letterSpacing: '0.15em',
            color: 'var(--gb-offwhite-muted)',
            background: 'transparent',
            border: 'none',
            padding: '0.875rem 1.5rem',
            cursor: 'none',
            textTransform: 'uppercase',
          }}
        >
          SKIP
        </button>
      )}
    </form>
  );
}

function TextareaField({
  label, placeholder, onSubmit, optional = false,
}: {
  label: string; placeholder: string; onSubmit: (v: string) => void; optional?: boolean;
}) {
  const [value, setValue] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(value.trim());
  };
  return (
    <form onSubmit={handleSubmit}>
      <label style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: '0.65rem', letterSpacing: '0.25em', color: 'var(--gb-offwhite-muted)', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
        {label}
        {optional && <span style={{ color: 'var(--gb-copper)', marginLeft: '0.5rem' }}>(optional)</span>}
      </label>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        rows={4}
        style={{ width: '100%', background: 'rgba(17,17,16,0.8)', border: '1px solid rgba(245,240,232,0.15)', padding: '1rem', fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--gb-offwhite)', outline: 'none', marginBottom: '2rem', resize: 'vertical' }}
      />
      <button type="submit" style={{ fontFamily: 'var(--font-display)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.2em', color: 'var(--gb-black)', background: 'var(--gb-copper)', border: 'none', padding: '0.875rem 2rem', cursor: 'none', textTransform: 'uppercase' }}>CONTINUE →</button>
      {optional && <button type="button" onClick={() => onSubmit('')} style={{ fontFamily: 'var(--font-display)', fontSize: '0.7rem', letterSpacing: '0.15em', color: 'var(--gb-offwhite-muted)', background: 'transparent', border: 'none', padding: '0.875rem 1.5rem', cursor: 'none', textTransform: 'uppercase' }}>SKIP</button>}
    </form>
  );
}

function ChoiceField({ label, options, onSelect }: { label: string; options: string[]; onSelect: (v: string) => void; }) {
  return (
    <div>
      <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.65rem', letterSpacing: '0.25em', color: 'var(--gb-offwhite-muted)', marginBottom: '1.5rem', textTransform: 'uppercase' }}>{label}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
        {options.map((opt) => (
          <button key={opt} onClick={() => onSelect(opt)} style={{ fontFamily: 'var(--font-display)', fontSize: '0.75rem', letterSpacing: '0.12em', color: 'var(--gb-offwhite)', background: 'transparent', border: '1px solid rgba(245,240,232,0.2)', padding: '0.75rem 1.5rem', cursor: 'none', textTransform: 'uppercase', transition: 'all 0.3s ease' }} onMouseEnter={(e) => { const el = e.currentTarget; el.style.borderColor = 'var(--gb-copper)'; el.style.color = 'var(--gb-copper)'; }} onMouseLeave={(e) => { const el = e.currentTarget; el.style.borderColor = 'rgba(245,240,232,0.2)'; el.style.color = 'var(--gb-offwhite)'; }}>{opt}</button>
        ))}
      </div>
    </div>
  );
}

function MultiSelect({ label, options, selected, onChange, onContinue }: { label: string; options: string[]; selected: string[]; onChange: (v: string[]) => void; onContinue: () => void; }) {
  const toggle = (opt: string) => {
    onChange(selected.includes(opt) ? selected.filter((s) => s !== opt) : [...selected, opt]);
  };
  return (
    <div>
      <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.65rem', letterSpacing: '0.25em', color: 'var(--gb-offwhite-muted)', marginBottom: '1.5rem', textTransform: 'uppercase' }}>{label}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center', marginBottom: '2rem' }}>
        {options.map((opt) => (
          <button key={opt} onClick={() => toggle(opt)} style={{ fontFamily: 'var(--font-display)', fontSize: '0.75rem', letterSpacing: '0.12em', color: selected.includes(opt) ? 'var(--gb-black)' : 'var(--gb-offwhite)', background: selected.includes(opt) ? 'var(--gb-copper)' : 'transparent', border: `1px solid ${selected.includes(opt) ? 'var(--gb-copper)' : 'rgba(245,240,232,0.2)'}`, padding: '0.75rem 1.5rem', cursor: 'none', textTransform: 'uppercase', transition: 'all 0.3s ease' }}>{opt}</button>
        ))}
      </div>
      {selected.length > 0 && (
        <button onClick={onContinue} style={{ fontFamily: 'var(--font-display)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.2em', color: 'var(--gb-black)', background: 'var(--gb-copper)', border: 'none', padding: '0.875rem 2rem', cursor: 'none', textTransform: 'uppercase' }}>CONTINUE →</button>
      )}
    </div>
  );
}
