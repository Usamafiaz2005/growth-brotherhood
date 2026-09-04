'use client';

import { useEffect, useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars, Trail } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// ─── Particle Field ─────────────────────────────────────────────────────────────

function ParticleField({ count = 2000 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null);
  const positions = useRef<Float32Array>();

  useEffect(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    positions.current = pos;
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.03;
    mesh.current.rotation.x = state.clock.elapsedTime * 0.01;
  });

  if (!positions.current) return null;

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions.current, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#C97B3A"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

// ─── Growth Core (procedural 3D mark) ───────────────────────────────────────────

function GrowthCore({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const crystalRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    // Smooth tilt & idle rotation
    groupRef.current.rotation.y = t * 0.2 + mouseX * 0.4;
    groupRef.current.rotation.x = mouseY * 0.25;

    // Breathing scale
    const breathe = 1 + Math.sin(t * 0.8) * 0.04;
    groupRef.current.scale.setScalar(breathe);

    // Outer wireframe rotation
    if (outerRef.current) {
      outerRef.current.rotation.y = -t * 0.15;
      outerRef.current.rotation.z = t * 0.1;
    }

    // Inner crystal rotation
    if (crystalRef.current) {
      crystalRef.current.rotation.y = t * 0.6;
      crystalRef.current.rotation.x = t * 0.4;
    }

    // Rings counter-rotations
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.4;
      ring1Ref.current.rotation.z = -t * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = t * 0.35;
      ring2Ref.current.rotation.x = t * 0.2;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = -t * 0.5;
      ring3Ref.current.rotation.y = t * 0.15;
    }

    // Inner pulse emissive
    if (innerRef.current) {
      const innerBreath = 1 + Math.sin(t * 1.5) * 0.08;
      innerRef.current.scale.setScalar(innerBreath);
      (innerRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        0.6 + Math.sin(t * 1.5) * 0.4;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer wireframe icosahedron */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1.3, 1]} />
        <meshStandardMaterial
          color="#C97B3A"
          metalness={0.9}
          roughness={0.15}
          wireframe
          emissive="#C97B3A"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Mid solid core */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[0.75, 0]} />
        <meshStandardMaterial
          color="#E8893A"
          metalness={0.95}
          roughness={0.08}
          emissive="#C97B3A"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Core octahedron crystal */}
      <mesh ref={crystalRef}>
        <octahedronGeometry args={[0.4, 0]} />
        <meshStandardMaterial
          color="#F5F0E8"
          metalness={1}
          roughness={0}
          emissive="#E8893A"
          emissiveIntensity={1.2}
        />
      </mesh>

      {/* Orbital ring 1 */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.65, 0.009, 12, 120]} />
        <meshStandardMaterial
          color="#C97B3A"
          metalness={1}
          roughness={0}
          emissive="#E8893A"
          emissiveIntensity={0.7}
        />
      </mesh>

      {/* Orbital ring 2 (tilted) */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[1.9, 0.005, 10, 100]} />
        <meshStandardMaterial
          color="#E8893A"
          transparent
          opacity={0.6}
          metalness={1}
          roughness={0}
          emissive="#C97B3A"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Orbital ring 3 (outer thin glow) */}
      <mesh ref={ring3Ref} rotation={[-Math.PI / 4, 0, Math.PI / 3]}>
        <torusGeometry args={[2.2, 0.003, 8, 90]} />
        <meshStandardMaterial
          color="#2DD4BF"
          transparent
          opacity={0.4}
          metalness={1}
          roughness={0}
          emissive="#2DD4BF"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Dual point lights inside */}
      <pointLight color="#E8893A" intensity={4} distance={6} />
      <pointLight position={[0, -1, 0]} color="#C97B3A" intensity={3} distance={5} />
    </group>
  );
}

// ─── Camera Rig ──────────────────────────────────────────────────────────────────

function CameraRig({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const { camera } = useThree();
  const target = useRef({ x: 0, y: 0, z: 5 });

  useFrame(() => {
    target.current.x += (mouseX * 0.8 - target.current.x) * 0.05;
    target.current.y += (mouseY * 0.5 - target.current.y) * 0.05;
    camera.position.x = target.current.x;
    camera.position.y = target.current.y;
    camera.position.z = target.current.z;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ─── Main Entry Scene Component ──────────────────────────────────────────────────

export default function EntryScene() {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [phase, setPhase] = useState(0); // 0=black, 1=particles, 2=object, 3=text, 4=idle
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 800),
      setTimeout(() => setPhase(2), 1600),
      setTimeout(() => setPhase(3), 2600),
      setTimeout(() => setPhase(4), 3800),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMouseX((e.clientX / window.innerWidth - 0.5) * 2);
      setMouseY(-(e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: 'var(--gb-black)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Three.js Canvas */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: phase >= 1 ? Math.max(0, 1 - scrollY / 500) : 0,
          transform: `translateY(${scrollY * 0.3}px)`,
          transition: phase >= 1 ? 'opacity 0.1s linear' : 'opacity 1.5s ease',
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 1.5]}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} color="#F5F0E8" />
          <Suspense fallback={null}>
            {phase >= 1 && <ParticleField count={1800} />}
            {phase >= 2 && <GrowthCore mouseX={mouseX} mouseY={mouseY} />}
          </Suspense>
          <CameraRig mouseX={mouseX} mouseY={mouseY} />
        </Canvas>
      </div>

      {/* Radial gradient vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 30%, var(--gb-black) 80%)',
          pointerEvents: 'none',
        }}
      />

      {/* UI Overlay */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
        }}
      >
        {/* Eyebrow */}
        <AnimatePresence>
          {phase >= 3 && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="gb-eyebrow"
            >
              GROWTH BROTHERHOOD · DIGITAL AGENCY
            </motion.p>
          )}
        </AnimatePresence>

        {/* Sharp positioning headline */}
        <AnimatePresence>
          {phase >= 3 && (
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.75rem, 8vw, 7.5rem)',
                fontWeight: 700,
                lineHeight: 0.92,
                letterSpacing: '-0.04em',
                textTransform: 'uppercase',
                color: 'var(--gb-offwhite)',
                maxWidth: 1100,
              }}
            >
              WE BUILD
              <br />
              DIGITAL SYSTEMS
              <br />
              <span style={{ color: 'var(--gb-copper)' }}>THAT GROW.</span>
            </motion.h1>
          )}
        </AnimatePresence>

        {/* Clear strategic subhead */}
        <AnimatePresence>
          {phase >= 3 && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="gb-subtext"
              style={{ maxWidth: 620, textAlign: 'center' }}
            >
              High-performance digital experiences, AI automation pipelines, and conversion architecture engineered for ambitious brands.
            </motion.p>
          )}
        </AnimatePresence>

        {/* Dual CTAs */}
        <AnimatePresence>
          {phase >= 4 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '0.5rem' }}
            >
              <Link href="/work" className="gb-btn-primary" data-cursor="enter">
                EXPLORE THE WORK →
              </Link>
              <Link href="/contact" className="gb-btn-outline" data-cursor="enter">
                START A PROJECT
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll indicator */}
        <AnimatePresence>
          {phase >= 4 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              style={{
                position: 'absolute',
                bottom: '-40vh',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--gb-offwhite-muted)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                }}
              >
                SCROLL
              </span>
              <div
                style={{
                  width: 1,
                  height: 50,
                  background: 'linear-gradient(to bottom, var(--gb-copper), transparent)',
                  animation: 'fadeUp 2s ease-in-out infinite',
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
