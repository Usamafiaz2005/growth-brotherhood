'use client';

import { useRef, useState, useMemo, Suspense, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

const AI_NODES = [
  { id: 'business', label: 'BUSINESS DATA', x: -2, y: 1.5 },
  { id: 'website', label: 'WEBSITE', x: 2, y: 1.5 },
  { id: 'social', label: 'SOCIAL', x: -2.5, y: -0.5 },
  { id: 'ads', label: 'ADS', x: 2.5, y: -0.5 },
  { id: 'competitors', label: 'COMPETITORS', x: -1.5, y: -2 },
  { id: 'seo', label: 'SEO', x: 1.5, y: -2 },
  { id: 'leads', label: 'LEADS', x: 0, y: 2.5 },
  { id: 'crm', label: 'CRM', x: 0, y: -2.8 },
];

function NeuralCore({ activeNode }: { activeNode: string | null }) {
  const coreRef = useRef<THREE.Mesh>(null);
  const crystalRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.4;
      coreRef.current.rotation.x = t * 0.2;
      const intensity = activeNode ? 2.5 : 1.2;
      (coreRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        intensity + Math.sin(t * 2.5) * 0.4;
    }
    if (crystalRef.current) {
      crystalRef.current.rotation.y = -t * 0.7;
      crystalRef.current.rotation.z = t * 0.3;
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.y = -t * 0.35;
      ringsRef.current.rotation.z = t * 0.15;
    }
  });

  return (
    <group>
      {/* Outer wireframe sphere */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.55, 2]} />
        <meshStandardMaterial
          color="#2DD4BF"
          metalness={0.95}
          roughness={0.05}
          wireframe
          emissive="#2DD4BF"
          emissiveIntensity={1}
        />
      </mesh>

      {/* Inner glowing octahedron crystal */}
      <mesh ref={crystalRef}>
        <octahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial
          color="#F5F0E8"
          metalness={1}
          roughness={0}
          emissive="#2DD4BF"
          emissiveIntensity={2}
        />
      </mesh>

      <group ref={ringsRef}>
        {[1.2, 1.8, 2.4, 3.0].map((r, i) => (
          <mesh key={i} rotation={[i * 0.5, 0, i * 0.3]}>
            <torusGeometry args={[r, 0.007, 10, 90]} />
            <meshStandardMaterial
              color="#2DD4BF"
              transparent
              opacity={0.35 - i * 0.07}
              emissive="#2DD4BF"
              emissiveIntensity={0.6}
            />
          </mesh>
        ))}
      </group>

      <Html center distanceFactor={6}>
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.6rem',
            fontWeight: 700,
            letterSpacing: '0.2em',
            color: '#2DD4BF',
            textAlign: 'center',
            textTransform: 'uppercase',
            pointerEvents: 'none',
            textShadow: '0 0 20px #2DD4BF',
          }}
        >
          GB<br />AI
        </div>
      </Html>

      <pointLight color="#2DD4BF" intensity={4} distance={8} />
    </group>
  );
}

function ConnectionLine({
  from,
  to,
  active,
}: {
  from: [number, number, number];
  to: [number, number, number];
  active: boolean;
}) {
  const lineRef = useRef<THREE.Line>(null);
  const points = useMemo(
    () => [
      new THREE.Vector3(...from),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(...to),
    ],
    [from, to]
  );
  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);

  useFrame((state) => {
    if (!lineRef.current) return;
    (lineRef.current.material as THREE.LineBasicMaterial).opacity = active
      ? 0.6 + Math.sin(state.clock.elapsedTime * 3) * 0.2
      : 0.08;
  });

  return (
    <line ref={lineRef as unknown as React.RefObject<THREE.Line>} geometry={geometry}>
      <lineBasicMaterial color="#2DD4BF" transparent opacity={0.08} linewidth={1} />
    </line>
  );
}

function AINodeMesh({
  node,
  isActive,
  onHover,
  onLeave,
  onClick,
}: {
  node: (typeof AI_NODES)[0];
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * (isActive ? 2 : 0.5);
    const s = isActive ? 1.4 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(s, s, s), 0.1);
    (meshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = isActive
      ? 1.5
      : 0.3;
  });

  return (
    <group position={[node.x, node.y, 0]}>
      <mesh ref={meshRef} onPointerEnter={onHover} onPointerLeave={onLeave} onClick={onClick}>
        <octahedronGeometry args={[0.12, 0]} />
        <meshStandardMaterial
          color="#2DD4BF"
          metalness={0.8}
          roughness={0.2}
          emissive="#2DD4BF"
          emissiveIntensity={0.3}
        />
      </mesh>

      <Html center distanceFactor={8}>
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.55rem',
            letterSpacing: '0.15em',
            color: isActive ? '#2DD4BF' : '#B8B0A4',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            transition: 'color 0.3s ease',
            marginTop: '1rem',
          }}
        >
          {node.label}
        </div>
      </Html>
    </group>
  );
}

function AISceneContent() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const { mouse } = useThree();
  const bgParticlesRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(1500 * 3);
    for (let i = 0; i < 1500; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 15;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 15;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, []);

  useFrame(() => {
    if (bgParticlesRef.current) {
      bgParticlesRef.current.rotation.y += 0.0003;
    }
  });

  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 5, 5]} intensity={0.5} color="#F5F0E8" />

      {/* Background particles */}
      <points ref={bgParticlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.01} color="#2DD4BF" transparent opacity={0.2} sizeAttenuation />
      </points>

      {/* Central core */}
      <NeuralCore activeNode={activeNode} />

      {/* Connection lines */}
      {AI_NODES.map((node) => (
        <ConnectionLine
          key={node.id}
          from={[node.x, node.y, 0]}
          to={[0, 0, 0]}
          active={activeNode === node.id}
        />
      ))}

      {/* Nodes */}
      {AI_NODES.map((node) => (
        <AINodeMesh
          key={node.id}
          node={node}
          isActive={activeNode === node.id}
          onHover={() => setActiveNode(node.id)}
          onLeave={() => setActiveNode(null)}
          onClick={() => setActiveNode(activeNode === node.id ? null : node.id)}
        />
      ))}
    </>
  );
}

export default function AIScene() {
  return (
    <section
      id="ai"
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        background: '#050706',
        overflow: 'hidden',
      }}
    >
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
            color: '#2DD4BF',
            marginBottom: '0.3rem',
            textTransform: 'uppercase',
          }}
        >
          06 — AI ENGINE
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 4vw, 3rem)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: 'var(--gb-offwhite)',
          }}
        >
          GB AI GROWTH ENGINE
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
          color: '#2DD4BF',
          textTransform: 'uppercase',
          opacity: 0.6,
          whiteSpace: 'nowrap',
        }}
      >
        HOVER NODES TO ACTIVATE · CLICK TO LOCK
      </p>

      <Canvas
        camera={{ position: [0, 0, 7], fov: 55 }}
        gl={{ antialias: true }}
        dpr={[1, 1.5]}
        style={{ position: 'absolute', inset: 0 }}
      >
        <Suspense fallback={null}>
          <AISceneContent />
        </Suspense>
      </Canvas>
    </section>
  );
}
