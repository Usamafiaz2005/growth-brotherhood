'use client';

import { useEffect, useRef, useState } from 'react';

// Web Audio API procedural sound synthesizer (zero external asset dependency)
class SoundFX {
  private ctx: AudioContext | null = null;
  public enabled: boolean = false;

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playHover() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {
      // Ignore audio context autoplay restrictions gracefully
    }
  }

  public playClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(110, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {
      // Ignore audio restrictions
    }
  }
}

export const sfx = new SoundFX();

export default function SoundToggle() {
  const [muted, setMuted] = useState(true);

  const toggleSound = () => {
    const nextState = !muted;
    setMuted(nextState);
    sfx.enabled = !nextState;
    if (!nextState) {
      sfx.playClick();
    }
  };

  return (
    <button
      onClick={toggleSound}
      aria-label={muted ? 'Enable sound effects' : 'Disable sound effects'}
      title={muted ? 'Enable Sound' : 'Mute Sound'}
      style={{
        background: 'none',
        border: '1px solid rgba(245, 240, 232, 0.15)',
        borderRadius: '20px',
        padding: '0.4rem 0.8rem',
        cursor: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '0.4rem',
        color: muted ? 'var(--gb-offwhite-muted)' : 'var(--gb-copper)',
        fontFamily: 'var(--font-display)',
        fontSize: '0.65rem',
        letterSpacing: '0.15em',
        transition: 'all 0.3s ease',
      }}
    >
      <span
        style={{
          display: 'inline-block',
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: muted ? 'var(--gb-offwhite-muted)' : 'var(--gb-copper)',
          boxShadow: muted ? 'none' : '0 0 8px var(--gb-copper)',
        }}
      />
      {muted ? 'SOUND OFF' : 'SOUND ON'}
    </button>
  );
}
