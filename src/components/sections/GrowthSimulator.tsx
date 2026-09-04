'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const INDUSTRIES = ['ARCHITECTURE', 'REAL ESTATE', 'CONSTRUCTION', 'E-COMMERCE', 'SAAS', 'OTHER'];
const PRESENCES = ['NONE', 'BASIC', 'AVERAGE', 'STRONG'];
const GOALS = ['MORE LEADS', 'MORE SALES', 'BETTER BRAND', 'AUTOMATION'];

type Phase = 'select' | 'scanning' | 'results';

interface SimulatorState {
  industry: string;
  presence: string;
  goal: string;
}

function generateResult(inputs: SimulatorState) {
  // Deterministic scoring based strictly on user inputs (zero random numbers)
  const presenceBase: Record<string, number> = {
    NONE: 38,
    BASIC: 55,
    AVERAGE: 68,
    STRONG: 84,
  };

  const goalMultiplier: Record<string, number> = {
    'MORE LEADS': 8,
    'MORE SALES': 10,
    'BETTER BRAND': 6,
    AUTOMATION: 12,
  };

  const industryWeight: Record<string, number> = {
    ARCHITECTURE: 4,
    'REAL ESTATE': 5,
    CONSTRUCTION: 3,
    'E-COMMERCE': 7,
    SAAS: 8,
    OTHER: 4,
  };

  const baseScore = presenceBase[inputs.presence] ?? 50;
  const goalAdd = goalMultiplier[inputs.goal] ?? 5;
  const indAdd = industryWeight[inputs.industry] ?? 4;

  const score = Math.min(96, Math.max(40, baseScore + Math.floor((100 - baseScore) * 0.35) + goalAdd));

  // Determine specific diagnostic findings deterministically
  const findings: string[] = [];
  if (inputs.presence === 'NONE' || inputs.presence === 'BASIC') {
    findings.push('High conversion drop-off due to unoptimized mobile user experience.');
    findings.push('Absence of structured schema data limiting organic search visibility.');
  } else {
    findings.push('Existing traffic is uncaptured due to passive form onboarding.');
  }

  if (inputs.goal === 'AUTOMATION') {
    findings.push('Manual lead processing causing high time-to-first-contact latency.');
  } else if (inputs.goal === 'MORE SALES') {
    findings.push('Sub-optimal checkout friction reducing average revenue per visitor.');
  } else {
    findings.push('Brand presentation lacks luxury positioning required for commercial accounts.');
  }

  const opportunityLevels = ['MODERATE', 'HIGH', 'VERY HIGH'] as const;
  const oppIndex = Math.min(2, Math.floor((100 - score) / 20));

  return {
    score,
    website: inputs.presence === 'STRONG' ? 'HIGH' : 'VERY HIGH',
    seo: inputs.presence === 'NONE' ? 'VERY HIGH' : 'HIGH',
    social: inputs.presence === 'NONE' ? 'HIGH' : 'MEDIUM',
    automation: inputs.goal === 'AUTOMATION' ? 'VERY HIGH' : 'HIGH',
    conversion: inputs.goal === 'MORE SALES' ? 'VERY HIGH' : 'HIGH',
    opportunityLevel: opportunityLevels[oppIndex],
    findings,
  };
}

const SCAN_STEPS = [
  { label: 'SCANNING WEBSITE', duration: 800 },
  { label: 'ANALYZING MARKET', duration: 1000 },
  { label: 'ANALYZING COMPETITION', duration: 900 },
  { label: 'IDENTIFYING OPPORTUNITIES', duration: 1100 },
];

const OPPORTUNITY_COLORS: Record<string, string> = {
  'VERY HIGH': '#2DD4BF',
  HIGH: '#C97B3A',
  MEDIUM: '#E8893A',
  LOW: '#B8B0A4',
};

export default function GrowthSimulator() {
  const [phase, setPhase] = useState<Phase>('select');
  const [step, setStep] = useState<'industry' | 'presence' | 'goal' | 'cta'>('industry');
  const [inputs, setInputs] = useState<SimulatorState>({ industry: '', presence: '', goal: '' });
  const [scanStep, setScanStep] = useState(0);
  const [scanProgress, setScanProgress] = useState(0);
  const [result, setResult] = useState<ReturnType<typeof generateResult> | null>(null);

  const runScan = async () => {
    setPhase('scanning');
    for (let i = 0; i < SCAN_STEPS.length; i++) {
      setScanStep(i);
      const { duration } = SCAN_STEPS[i];
      const startTime = Date.now();
      await new Promise<void>((resolve) => {
        const interval = setInterval(() => {
          const elapsed = Date.now() - startTime;
          setScanProgress(Math.min(100, (elapsed / duration) * 100));
          if (elapsed >= duration) {
            clearInterval(interval);
            setScanProgress(100);
            resolve();
          }
        }, 16);
      });
      await new Promise((r) => setTimeout(r, 100));
      setScanProgress(0);
    }
    setResult(generateResult(inputs));
    setTimeout(() => setPhase('results'), 400);
  };

  const reset = () => {
    setPhase('select');
    setStep('industry');
    setInputs({ industry: '', presence: '', goal: '' });
    setResult(null);
    setScanStep(0);
    setScanProgress(0);
  };

  return (
    <section
      id="simulator"
      style={{
        position: 'relative',
        width: '100vw',
        minHeight: '100vh',
        background: 'var(--gb-black)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6rem 2rem',
        overflow: 'hidden',
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(rgba(201, 123, 58, 0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(201, 123, 58, 0.03) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          maxWidth: 800,
          width: '100%',
        }}
      >
        {/* Header */}
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
          04 — GROWTH SIMULATOR
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 6vw, 5rem)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            color: 'var(--gb-offwhite)',
            marginBottom: '3rem',
            lineHeight: 0.95,
          }}
        >
          WHAT COULD YOUR BUSINESS<br />
          <span style={{ color: 'var(--gb-copper)' }}>BECOME?</span>
        </h2>

        {/* ── SELECT PHASE ──────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {phase === 'select' && (
            <motion.div
              key="select"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Industry */}
              <AnimatePresence>
                {(step === 'industry' || inputs.industry) && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ marginBottom: '2rem' }}
                  >
                    <p
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.65rem',
                        letterSpacing: '0.2em',
                        color: 'var(--gb-offwhite-muted)',
                        marginBottom: '0.75rem',
                        textTransform: 'uppercase',
                      }}
                    >
                      YOUR INDUSTRY
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
                      {INDUSTRIES.map((ind) => (
                        <button
                          key={ind}
                          onClick={() => {
                            setInputs((p) => ({ ...p, industry: ind }));
                            if (!inputs.industry) setStep('presence');
                          }}
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '0.7rem',
                            letterSpacing: '0.12em',
                            color: inputs.industry === ind ? 'var(--gb-black)' : 'var(--gb-offwhite)',
                            background: inputs.industry === ind ? 'var(--gb-copper)' : 'transparent',
                            border: `1px solid ${inputs.industry === ind ? 'var(--gb-copper)' : 'rgba(245,240,232,0.15)'}`,
                            padding: '0.6rem 1.2rem',
                            cursor: 'none',
                            textTransform: 'uppercase',
                            transition: 'all 0.3s ease',
                          }}
                        >
                          {ind}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Presence */}
              <AnimatePresence>
                {(step === 'presence' || inputs.presence) && inputs.industry && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ marginBottom: '2rem' }}
                  >
                    <p
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.65rem',
                        letterSpacing: '0.2em',
                        color: 'var(--gb-offwhite-muted)',
                        marginBottom: '0.75rem',
                        textTransform: 'uppercase',
                      }}
                    >
                      CURRENT DIGITAL PRESENCE
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
                      {PRESENCES.map((p) => (
                        <button
                          key={p}
                          onClick={() => {
                            setInputs((prev) => ({ ...prev, presence: p }));
                            if (!inputs.presence) setStep('goal');
                          }}
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '0.7rem',
                            letterSpacing: '0.12em',
                            color: inputs.presence === p ? 'var(--gb-black)' : 'var(--gb-offwhite)',
                            background: inputs.presence === p ? 'var(--gb-copper)' : 'transparent',
                            border: `1px solid ${inputs.presence === p ? 'var(--gb-copper)' : 'rgba(245,240,232,0.15)'}`,
                            padding: '0.6rem 1.2rem',
                            cursor: 'none',
                            textTransform: 'uppercase',
                            transition: 'all 0.3s ease',
                          }}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Goal */}
              <AnimatePresence>
                {(step === 'goal' || inputs.goal) && inputs.presence && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ marginBottom: '2.5rem' }}
                  >
                    <p
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.65rem',
                        letterSpacing: '0.2em',
                        color: 'var(--gb-offwhite-muted)',
                        marginBottom: '0.75rem',
                        textTransform: 'uppercase',
                      }}
                    >
                      YOUR MAIN GOAL
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
                      {GOALS.map((g) => (
                        <button
                          key={g}
                          onClick={() => {
                            setInputs((prev) => ({ ...prev, goal: g }));
                            if (!inputs.goal) setStep('cta');
                          }}
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '0.7rem',
                            letterSpacing: '0.12em',
                            color: inputs.goal === g ? 'var(--gb-black)' : 'var(--gb-offwhite)',
                            background: inputs.goal === g ? 'var(--gb-copper)' : 'transparent',
                            border: `1px solid ${inputs.goal === g ? 'var(--gb-copper)' : 'rgba(245,240,232,0.15)'}`,
                            padding: '0.6rem 1.2rem',
                            cursor: 'none',
                            textTransform: 'uppercase',
                            transition: 'all 0.3s ease',
                          }}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Run button */}
              {inputs.industry && inputs.presence && inputs.goal && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <button
                    data-cursor="enter"
                    onClick={runScan}
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
                    RUN GROWTH ANALYSIS →
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* ── SCANNING PHASE ───────────────────────────────────────── */}
          {phase === 'scanning' && (
            <motion.div
              key="scanning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ textAlign: 'left', maxWidth: 500, margin: '0 auto' }}
            >
              {SCAN_STEPS.map((s, i) => (
                <div key={s.label} style={{ marginBottom: '1.5rem' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '0.4rem',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.7rem',
                        letterSpacing: '0.15em',
                        color:
                          i < scanStep
                            ? 'var(--gb-copper)'
                            : i === scanStep
                            ? 'var(--gb-offwhite)'
                            : 'var(--gb-offwhite-muted)',
                        textTransform: 'uppercase',
                      }}
                    >
                      {s.label}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.7rem',
                        color:
                          i < scanStep
                            ? 'var(--gb-copper)'
                            : i === scanStep
                            ? 'var(--gb-offwhite)'
                            : 'var(--gb-offwhite-muted)',
                      }}
                    >
                      {i < scanStep ? '100%' : i === scanStep ? `${Math.floor(scanProgress)}%` : '0%'}
                    </span>
                  </div>
                  <div
                    style={{
                      height: 2,
                      background: 'rgba(245,240,232,0.1)',
                      borderRadius: 1,
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        background:
                          i < scanStep
                            ? 'var(--gb-copper)'
                            : i === scanStep
                            ? 'var(--gb-copper)'
                            : 'transparent',
                        width:
                          i < scanStep ? '100%' : i === scanStep ? `${scanProgress}%` : '0%',
                        transition: 'width 0.05s linear',
                      }}
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* ── RESULTS PHASE ────────────────────────────────────────── */}
          {phase === 'results' && result && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Disclaimer */}
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.7rem',
                  color: 'var(--gb-offwhite-muted)',
                  marginBottom: '2rem',
                  fontStyle: 'italic',
                  letterSpacing: '0.02em',
                }}
              >
                * These scores are illustrative opportunities based on typical businesses in your category.
                They are not guaranteed business forecasts.
              </p>

              {/* Score */}
              <div style={{ marginBottom: '2.5rem' }}>
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.3em',
                    color: 'var(--gb-offwhite-muted)',
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase',
                  }}
                >
                  DIGITAL OPPORTUNITY
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(4rem, 12vw, 8rem)',
                    fontWeight: 700,
                    color: 'var(--gb-copper)',
                    lineHeight: 1,
                    letterSpacing: '-0.04em',
                  }}
                >
                  {result.score}
                  <span style={{ fontSize: '2rem', color: 'var(--gb-offwhite-muted)' }}>/100</span>
                </p>
              </div>

              {/* Breakdown */}
              <div style={{ maxWidth: 500, margin: '0 auto 2.5rem', textAlign: 'left' }}>
                {[
                  { label: 'WEBSITE', value: result.website },
                  { label: 'SEO', value: result.seo },
                  { label: 'SOCIAL', value: result.social },
                  { label: 'AUTOMATION', value: result.automation },
                  { label: 'CONVERSION', value: result.conversion },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.75rem 0',
                      borderBottom: '1px solid rgba(245,240,232,0.06)',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.7rem',
                        letterSpacing: '0.15em',
                        color: 'var(--gb-offwhite-muted)',
                        textTransform: 'uppercase',
                      }}
                    >
                      {item.label}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.7rem',
                        letterSpacing: '0.12em',
                        color: OPPORTUNITY_COLORS[item.value] ?? 'var(--gb-offwhite)',
                        textTransform: 'uppercase',
                        fontWeight: 700,
                      }}
                    >
                      {item.value} OPPORTUNITY
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link
                  href="/contact"
                  data-cursor="enter"
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
                  GET YOUR REAL ANALYSIS →
                </Link>
                <button
                  onClick={reset}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    letterSpacing: '0.15em',
                    color: 'var(--gb-offwhite)',
                    background: 'transparent',
                    border: '1px solid rgba(245,240,232,0.2)',
                    padding: '1rem 2rem',
                    cursor: 'none',
                    textTransform: 'uppercase',
                    transition: 'border-color 0.3s ease',
                  }}
                >
                  RUN AGAIN
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
