'use client';

import { useState } from 'react';
import LabScene from '@/components/3d/scenes/LabScene';
import WorldScene from '@/components/3d/scenes/WorldScene';
import AIScene from '@/components/3d/scenes/AIScene';

type SceneMode = 'projects' | 'world' | 'ai';

const SCENES: { id: SceneMode; label: string; badge: string }[] = [
  { id: 'projects', label: 'CASE PROTOTYPES', badge: '3D MODELS' },
  { id: 'world', label: 'SYSTEM GALAXY', badge: 'ORBITAL' },
  { id: 'ai', label: 'AI NEURAL CORE', badge: 'SIMULATION' },
];

export default function LabClient() {
  const [activeScene, setActiveScene] = useState<SceneMode>('projects');

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', background: 'var(--gb-black)' }}>
      {/* Floating Scene Switcher Pill */}
      <div
        style={{
          position: 'fixed',
          top: '5.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 100,
          display: 'flex',
          gap: '0.4rem',
          background: 'rgba(17, 17, 16, 0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(245, 240, 232, 0.12)',
          borderRadius: '40px',
          padding: '0.35rem 0.5rem',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.6)',
          maxWidth: '92vw',
          overflowX: 'auto',
        }}
      >
        {SCENES.map((s) => {
          const isActive = activeScene === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setActiveScene(s.id)}
              data-cursor="enter"
              style={{
                background: isActive ? 'var(--gb-copper)' : 'transparent',
                color: isActive ? 'var(--gb-black)' : 'var(--gb-offwhite-muted)',
                border: 'none',
                borderRadius: '30px',
                padding: '0.5rem 1.1rem',
                fontFamily: 'var(--font-display)',
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                cursor: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                whiteSpace: 'nowrap',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <span>{s.label}</span>
              <span
                style={{
                  fontSize: '0.55rem',
                  padding: '0.15rem 0.4rem',
                  borderRadius: '10px',
                  background: isActive ? 'rgba(0,0,0,0.2)' : 'rgba(245, 240, 232, 0.08)',
                  color: isActive ? 'var(--gb-black)' : 'var(--gb-copper)',
                  letterSpacing: '0.08em',
                }}
              >
                {s.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Render Active 3D Environment */}
      <div style={{ width: '100%', height: '100%' }}>
        {activeScene === 'projects' && <LabScene />}
        {activeScene === 'world' && <WorldScene />}
        {activeScene === 'ai' && <AIScene />}
      </div>
    </div>
  );
}
