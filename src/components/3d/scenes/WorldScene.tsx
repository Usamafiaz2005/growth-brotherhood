'use client';

import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, Float } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { services } from '@/data/services';

// ─── Growth Engine (central object) ───────────────────────────────────────────

function GrowthEngine() {
  const groupRef = useRef<THREE.Group>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) groupRef.current.rotation.y = t * 0.1;
    if (torusRef.current) {
      torusRef.current.rotation.x = t * 0.3;
      torusRef.current.rotation.z = t * 0.2;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.4;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={innerRef}>
        <dodecahedronGeometry args={[0.6, 0]} />
        <meshStandardMaterial
          color="#C97B3A"
          metalness={0.9}
          roughness={0.1}
          emissive="#C97B3A"
          emissiveIntensity={0.8}
        />
      </mesh>
      <mesh ref={torusRef}>
        <torusKnotGeometry args={[0.9, 0.06, 128, 16]} />
        <meshStandardMaterial
          color="#E8893A"
          metalness={0.8}
          roughness={0.2}
          wireframe
          emissive="#C97B3A"
          emissiveIntensity={0.3}
        />
      </mesh>
      <pointLight color="#E8893A" intensity={5} distance={8} />
    </group>
  );
}

// ─── Service Node ──────────────────────────────────────────────────────────────

const NODE_GEOMETRIES: Record<string, React.ReactNode> = {
  browser: (
    <group>
      <mesh>
        <boxGeometry args={[0.5, 0.35, 0.05]} />
        <meshStandardMaterial color="#C97B3A" metalness={0.8} roughness={0.2} emissive="#C97B3A" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[0, 0.12, 0.028]}>
        <boxGeometry args={[0.46, 0.06, 0.005]} />
        <meshStandardMaterial color="#E8893A" metalness={0.9} roughness={0.1} emissive="#E8893A" emissiveIntensity={0.8} />
      </mesh>
    </group>
  ),
  neural: (
    <group>
      <mesh>
        <icosahedronGeometry args={[0.26, 1]} />
        <meshStandardMaterial color="#2DD4BF" metalness={0.9} roughness={0.1} wireframe emissive="#2DD4BF" emissiveIntensity={0.6} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#2DD4BF" metalness={1} roughness={0} emissive="#2DD4BF" emissiveIntensity={1.5} />
      </mesh>
    </group>
  ),
  screens: (
    <group>
      <mesh position={[-0.08, 0, 0]}>
        <boxGeometry args={[0.38, 0.28, 0.02]} />
        <meshStandardMaterial color="#C97B3A" metalness={0.8} roughness={0.2} emissive="#C97B3A" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.08, 0.05, 0.03]} rotation={[0, 0, 0.1]}>
        <boxGeometry args={[0.35, 0.25, 0.02]} />
        <meshStandardMaterial color="#E8893A" metalness={0.9} roughness={0.1} emissive="#E8893A" emissiveIntensity={0.8} />
      </mesh>
    </group>
  ),
  cube: (
    <group>
      <mesh>
        <boxGeometry args={[0.35, 0.35, 0.35]} />
        <meshStandardMaterial color="#E8893A" metalness={0.9} roughness={0.1} wireframe emissive="#E8893A" emissiveIntensity={0.4} />
      </mesh>
      <mesh>
        <boxGeometry args={[0.18, 0.18, 0.18]} />
        <meshStandardMaterial color="#C97B3A" metalness={1} roughness={0} emissive="#C97B3A" emissiveIntensity={1.2} />
      </mesh>
    </group>
  ),
  nodes: (
    <group>
      <mesh>
        <octahedronGeometry args={[0.26, 0]} />
        <meshStandardMaterial color="#2DD4BF" metalness={0.9} roughness={0.1} emissive="#2DD4BF" emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[0.35, 0, 0]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#2DD4BF" emissive="#2DD4BF" emissiveIntensity={1} />
      </mesh>
      <mesh position={[-0.35, 0, 0]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#2DD4BF" emissive="#2DD4BF" emissiveIntensity={1} />
      </mesh>
    </group>
  ),
  map: (
    <group>
      <mesh>
        <coneGeometry args={[0.28, 0.45, 4]} />
        <meshStandardMaterial color="#C97B3A" metalness={0.8} roughness={0.2} emissive="#C97B3A" emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[0, 0.22, 0]}>
        <sphereGeometry args={[0.07, 12, 12]} />
        <meshStandardMaterial color="#E8893A" emissive="#E8893A" emissiveIntensity={1.8} />
      </mesh>
    </group>
  ),
};

function ServiceNode({
  service,
  position,
  onHover,
  onLeave,
  onClick,
  isHovered,
  isActive,
}: {
  service: (typeof services)[0];
  position: THREE.Vector3;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
  isHovered: boolean;
  isActive: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (!groupRef.current) return;

    // Orbit
    const angle = (service.angle * Math.PI) / 180 + t * 0.15;
    const radius = 3.5;
    groupRef.current.position.x = Math.cos(angle) * radius;
    groupRef.current.position.z = Math.sin(angle) * radius;
    groupRef.current.position.y = Math.sin(t * 0.5 + service.angle) * 0.3;

    // Idle spin
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.5;
      meshRef.current.rotation.x = t * 0.3;
    }

    // Hover: move toward camera
    const targetScale = isHovered || isActive ? 1.4 : 1;
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });

  const color = isHovered || isActive ? service.accentColor : service.color;

  return (
    <group ref={groupRef} position={position}>
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh
          ref={meshRef}
          onPointerEnter={onHover}
          onPointerLeave={onLeave}
          onClick={onClick}
          data-cursor="explore"
        >
          {NODE_GEOMETRIES[service.icon] ?? <sphereGeometry args={[0.25, 16, 16]} />}
          <meshStandardMaterial
            color={color}
            metalness={0.7}
            roughness={0.3}
            emissive={color}
            emissiveIntensity={isActive ? 2.5 : isHovered ? 1.5 : 0.3}
          />
        </mesh>
      </Float>

      {/* Label visible on hover */}
      {isHovered && (
        <Html center distanceFactor={8}>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.65rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              color: service.accentColor,
              textTransform: 'uppercase',
              background: 'rgba(10, 9, 8, 0.8)',
              padding: '0.35rem 0.75rem',
              border: `1px solid ${service.accentColor}40`,
              backdropFilter: 'blur(8px)',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
            }}
          >
            {service.shortTitle}
          </div>
        </Html>
      )}
    </group>
  );
}

// ─── Scene Internals ──────────────────────────────────────────────────────────

function SceneContent({
  hoveredService,
  activeService,
  setHoveredService,
  setActiveService,
}: {
  hoveredService: string | null;
  activeService: string | null;
  setHoveredService: (id: string | null) => void;
  setActiveService: (id: string | null) => void;
}) {
  const { camera } = useThree();

  useFrame((state) => {
    camera.position.y += (Math.sin(state.clock.elapsedTime * 0.2) * 0.3 - camera.position.y) * 0.02;
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#F5F0E8" />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#2DD4BF" />

      <GrowthEngine />

      {services.map((service) => (
        <ServiceNode
          key={service.id}
          service={service}
          position={new THREE.Vector3(0, 0, 0)}
          isHovered={hoveredService === service.id}
          isActive={activeService === service.id}
          onHover={() => setHoveredService(service.id)}
          onLeave={() => setHoveredService(null)}
          onClick={() => setActiveService(service.id)}
        />
      ))}
    </>
  );
}

// ─── Service Detail Panel ─────────────────────────────────────────────────────

function ServicePanel({
  service,
  onClose,
}: {
  service: (typeof services)[0] | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {service && (
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 60 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            right: '2rem',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 20,
            width: 'min(380px, 90vw)',
            background: 'rgba(10, 9, 8, 0.9)',
            border: `1px solid ${service.color}40`,
            backdropFilter: 'blur(20px)',
            padding: '2rem',
          }}
        >
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'none',
              border: 'none',
              color: 'var(--gb-offwhite-muted)',
              fontSize: '1rem',
              cursor: 'none',
            }}
            aria-label="Close panel"
          >
            ✕
          </button>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.65rem',
              letterSpacing: '0.25em',
              color: service.color,
              marginBottom: '0.5rem',
              textTransform: 'uppercase',
            }}
          >
            {service.tagline}
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              fontWeight: 700,
              color: 'var(--gb-offwhite)',
              letterSpacing: '-0.02em',
              marginBottom: '1rem',
            }}
          >
            {service.title}
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              lineHeight: 1.7,
              color: 'var(--gb-offwhite-muted)',
              marginBottom: '1.5rem',
            }}
          >
            {service.description}
          </p>
          <ul style={{ listStyle: 'none', marginBottom: '2rem' }}>
            {service.capabilities.map((cap) => (
              <li
                key={cap}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.12em',
                  color: 'var(--gb-offwhite)',
                  padding: '0.4rem 0',
                  borderBottom: '1px solid rgba(245, 240, 232, 0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <span style={{ color: service.color }}>—</span>
                {cap}
              </li>
            ))}
          </ul>
          <a
            href={`/services/${service.slug}`}
            data-cursor="enter"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: 'var(--font-display)',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              color: 'var(--gb-black)',
              backgroundColor: service.color,
              textDecoration: 'none',
              padding: '0.75rem 1.5rem',
              textTransform: 'uppercase',
              transition: 'transform 0.2s ease',
            }}
          >
            START PROJECT
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── WorldScene Export ────────────────────────────────────────────────────────

export default function WorldScene() {
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [activeService, setActiveService] = useState<string | null>(null);

  const activeServiceData = services.find((s) => s.id === activeService) ?? null;

  return (
    <section
      id="world"
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        background: 'var(--gb-black)',
        overflow: 'hidden',
      }}
    >
      {/* Section label */}
      <div
        style={{
          position: 'absolute',
          top: '2rem',
          left: '2rem',
          zIndex: 10,
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.65rem',
            letterSpacing: '0.25em',
            color: 'var(--gb-offwhite-muted)',
            textTransform: 'uppercase',
            marginBottom: '0.3rem',
          }}
        >
          02 — CAPABILITIES
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 4vw, 3rem)',
            fontWeight: 700,
            color: 'var(--gb-offwhite)',
            letterSpacing: '-0.02em',
          }}
        >
          THE GROWTH ENGINE
        </h2>
      </div>

      <p
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          fontFamily: 'var(--font-display)',
          fontSize: '0.65rem',
          letterSpacing: '0.2em',
          color: 'var(--gb-offwhite-muted)',
          textTransform: 'uppercase',
        }}
      >
        DRAG TO ROTATE · CLICK TO EXPLORE
      </p>

      <Canvas
        camera={{ position: [0, 2, 8], fov: 55 }}
        gl={{ antialias: true }}
        dpr={[1, 1.5]}
        style={{ position: 'absolute', inset: 0 }}
      >
        <Suspense fallback={null}>
          <SceneContent
            hoveredService={hoveredService}
            activeService={activeService}
            setHoveredService={setHoveredService}
            setActiveService={setActiveService}
          />
        </Suspense>
      </Canvas>

      <ServicePanel service={activeServiceData} onClose={() => setActiveService(null)} />
    </section>
  );
}
