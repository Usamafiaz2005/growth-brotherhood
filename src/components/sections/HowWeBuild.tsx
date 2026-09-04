'use client';

import { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { motion } from 'framer-motion';

const BUILD_PHASES = [
  {
    id: 'discover',
    label: 'DISCOVER',
    desc: 'We map your landscape — market, competitors, users, goals.',
    color: '#B8B0A4',
    meshType: 'plane',
  },
  {
    id: 'strategy',
    label: 'STRATEGY',
    desc: 'Blueprints for your digital system. Every decision has a reason.',
    color: '#C97B3A',
    meshType: 'grid',
  },
  {
    id: 'design',
    label: 'DESIGN',
    desc: 'Visual language that commands attention and drives conversion.',
    color: '#E8893A',
    meshType: 'panel',
  },
  {
    id: 'build',
    label: 'BUILD',
    desc: 'Engineered to perform. No shortcuts. No templates.',
    color: '#C97B3A',
    meshType: 'box',
  },
  {
    id: 'launch',
    label: 'LAUNCH',
    desc: 'Live, optimised, and ready to compete.',
    color: '#E8893A',
    meshType: 'sphere',
  },
  {
    id: 'grow',
    label: 'GROW',
    desc: 'The system runs. The data flows. The results arrive.',
    color: '#2DD4BF',
    meshType: 'engine',
  },
];

function BuildScene3D({ activePhase }: { activePhase: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.1;
    }
    meshRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const active = i <= activePhase;
      const targetScale = active ? 1 : 0.01;
      mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);
      (mesh.material as THREE.MeshStandardMaterial).emissiveIntensity =
        i === activePhase ? 1 + Math.sin(t * 2) * 0.3 : active ? 0.3 : 0;
    });
  });

  const phaseMeshes = BUILD_PHASES.map((phase, i) => {
    const angle = (i / BUILD_PHASES.length) * Math.PI * 2;
    const r = 1.8;
    const x = Math.cos(angle) * r;
    const z = Math.sin(angle) * r;
    const y = 0;
    const color = new THREE.Color(phase.color);

    return (
      <mesh
        key={phase.id}
        ref={(el) => { meshRefs.current[i] = el; }}
        position={[x, y, z]}
        scale={0.01}
      >
        {i === 0 ? (
          <planeGeometry args={[0.5, 0.5]} />
        ) : i === 5 ? (
          <torusKnotGeometry args={[0.2, 0.06, 64, 8]} />
        ) : i === 4 ? (
          <sphereGeometry args={[0.2, 16, 16]} />
        ) : (
          <boxGeometry args={[0.35, 0.35, 0.35]} />
        )}
        <meshStandardMaterial
          color={color}
          metalness={0.7}
          roughness={0.3}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>
    );
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.3} />
      <pointLight position={[3, 3, 3]} intensity={2} color="#F5F0E8" />
      <pointLight position={[-3, -3, -3]} intensity={1} color="#C97B3A" />

      {/* Central core */}
      <mesh>
        <icosahedronGeometry args={[0.4, 1]} />
        <meshStandardMaterial
          color="#C97B3A"
          metalness={0.9}
          roughness={0.1}
          emissive="#C97B3A"
          emissiveIntensity={0.6}
          wireframe={activePhase < 5}
        />
      </mesh>

      {/* Connector rings */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} rotation={[i * 0.6, i * 0.4, 0]}>
          <torusGeometry args={[1.8, 0.005, 8, 80]} />
          <meshStandardMaterial
            color="#C97B3A"
            transparent
            opacity={activePhase >= i * 2 ? 0.3 : 0.05}
            emissive="#C97B3A"
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}

      {phaseMeshes}
    </group>
  );
}

export default function HowWeBuild() {
  const [activePhase, setActivePhase] = useState(-1);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let i = -1;
          const interval = setInterval(() => {
            i++;
            setActivePhase(i);
            if (i >= BUILD_PHASES.length - 1) clearInterval(interval);
          }, 700);
          return () => clearInterval(interval);
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-we-build"
      style={{
        position: 'relative',
        width: '100vw',
        minHeight: '100vh',
        background: 'var(--gb-black)',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        padding: '6rem 0',
      }}
    >
      {/* Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 70% 50%, rgba(201,123,58,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 2rem',
          alignItems: 'center',
          position: 'relative',
          zIndex: 10,
          width: '100%',
        }}
        className="flex-col md:grid-cols-2"
      >
        {/* Left: text phases */}
        <div>
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
            05 — HOW WE BUILD
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: 'var(--gb-offwhite)',
              marginBottom: '3rem',
              lineHeight: 1,
            }}
          >
            FROM BRIEF<br />
            TO{' '}
            <span style={{ color: 'var(--gb-copper)' }}>
              GROWTH ENGINE
            </span>
          </h2>

          <div>
            {BUILD_PHASES.map((phase, i) => (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0.3 }}
                animate={{
                  opacity: i <= activePhase ? 1 : 0.3,
                }}
                transition={{ duration: 0.5 }}
                style={{
                  display: 'flex',
                  gap: '1.5rem',
                  marginBottom: '1.5rem',
                  cursor: 'none',
                  paddingBottom: '1.5rem',
                  borderBottom: '1px solid rgba(245,240,232,0.06)',
                }}
                onClick={() => setActivePhase(i)}
              >
                <div>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.65rem',
                      letterSpacing: '0.15em',
                      color: i <= activePhase ? phase.color : 'var(--gb-offwhite-muted)',
                      display: 'block',
                      marginBottom: '0.3rem',
                      textTransform: 'uppercase',
                      transition: 'color 0.5s ease',
                    }}
                  >
                    0{i + 1} — {phase.label}
                  </span>
                  {i <= activePhase && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.875rem',
                        color: 'var(--gb-offwhite-muted)',
                        lineHeight: 1.6,
                      }}
                    >
                      {phase.desc}
                    </motion.p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: 3D canvas */}
        <div
          style={{
            height: 500,
            borderRadius: 2,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <Canvas
            camera={{ position: [0, 2, 5], fov: 55 }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 1.5]}
          >
            <Suspense fallback={null}>
              <BuildScene3D activePhase={activePhase} />
            </Suspense>
          </Canvas>

          {activePhase === BUILD_PHASES.length - 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                position: 'absolute',
                bottom: '1.5rem',
                left: '50%',
                transform: 'translateX(-50%)',
                textAlign: 'center',
                pointerEvents: 'none',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.3em',
                  color: '#2DD4BF',
                  textTransform: 'uppercase',
                }}
              >
                YOUR GROWTH ENGINE — ACTIVE
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
