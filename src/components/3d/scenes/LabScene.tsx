'use client';

import { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Float } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { projects } from '@/data/projects';

const MODEL_GEOMETRIES: Record<string, JSX.Element> = {
  building: (
    <group>
      <mesh>
        <boxGeometry args={[0.55, 1.3, 0.55]} />
        <meshStandardMaterial color="#C97B3A" metalness={0.9} roughness={0.1} emissive="#C97B3A" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0, 0.7, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.25, 12]} />
        <meshStandardMaterial color="#E8893A" emissive="#E8893A" emissiveIntensity={2} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.57, 1.32, 0.57]} />
        <meshStandardMaterial color="#C97B3A" metalness={0.8} roughness={0.2} wireframe emissive="#C97B3A" emissiveIntensity={0.3} />
      </mesh>
    </group>
  ),
  product: (
    <group>
      <mesh>
        <cylinderGeometry args={[0.32, 0.38, 0.9, 24]} />
        <meshStandardMaterial color="#E8893A" metalness={0.9} roughness={0.1} emissive="#E8893A" emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[0, 0.48, 0]}>
        <cylinderGeometry args={[0.34, 0.34, 0.06, 24]} />
        <meshStandardMaterial color="#F5F0E8" metalness={1} roughness={0} emissive="#F5F0E8" emissiveIntensity={1} />
      </mesh>
      <mesh position={[0, -0.48, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.05, 24]} />
        <meshStandardMaterial color="#C97B3A" metalness={0.9} roughness={0.1} emissive="#C97B3A" emissiveIntensity={0.8} />
      </mesh>
    </group>
  ),
  neural: (
    <group>
      <mesh>
        <icosahedronGeometry args={[0.48, 2]} />
        <meshStandardMaterial color="#2DD4BF" metalness={0.9} roughness={0.1} wireframe emissive="#2DD4BF" emissiveIntensity={0.7} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.24, 20, 20]} />
        <meshStandardMaterial color="#2DD4BF" metalness={1} roughness={0} emissive="#2DD4BF" emissiveIntensity={1.8} />
      </mesh>
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[0.65, 0.008, 8, 60]} />
        <meshStandardMaterial color="#2DD4BF" transparent opacity={0.6} emissive="#2DD4BF" emissiveIntensity={0.8} />
      </mesh>
    </group>
  ),
  cube: (
    <group>
      <mesh>
        <boxGeometry args={[0.65, 0.65, 0.65]} />
        <meshStandardMaterial color="#E8893A" metalness={0.8} roughness={0.2} wireframe emissive="#E8893A" emissiveIntensity={0.4} />
      </mesh>
      <mesh>
        <boxGeometry args={[0.35, 0.35, 0.35]} />
        <meshStandardMaterial color="#C97B3A" metalness={0.95} roughness={0.05} emissive="#C97B3A" emissiveIntensity={1} />
      </mesh>
    </group>
  ),
  sphere: (
    <group>
      <mesh>
        <sphereGeometry args={[0.42, 32, 32]} />
        <meshStandardMaterial color="#C97B3A" metalness={0.9} roughness={0.1} emissive="#C97B3A" emissiveIntensity={0.8} />
      </mesh>
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[0.6, 0.008, 8, 60]} />
        <meshStandardMaterial color="#E8893A" metalness={1} roughness={0} emissive="#E8893A" emissiveIntensity={1} />
      </mesh>
    </group>
  ),
};

function ProjectObject({
  project,
  position,
  onHover,
  onLeave,
  isHovered,
}: {
  project: (typeof projects)[0];
  position: [number, number, number];
  onHover: () => void;
  onLeave: () => void;
  isHovered: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (!meshRef.current) return;
    meshRef.current.rotation.y = t * 0.3;
    if (lightRef.current) {
      lightRef.current.intensity = isHovered ? 3 + Math.sin(t * 3) * 0.5 : 0;
    }
  });

  return (
    <group position={position}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh
          ref={meshRef}
          onPointerEnter={onHover}
          onPointerLeave={onLeave}
          scale={isHovered ? 1.2 : 1}
        >
          {MODEL_GEOMETRIES[project.model]}
          <meshStandardMaterial
            color={project.heroColor}
            metalness={0.8}
            roughness={0.2}
            emissive={project.heroColor}
            emissiveIntensity={isHovered ? 1.2 : 0.2}
          />
        </mesh>

        <pointLight ref={lightRef} color={project.heroColor} distance={4} intensity={0} />
      </Float>

      {isHovered && (
        <Html center distanceFactor={6}>
          <div
            style={{
              background: 'rgba(10, 9, 8, 0.92)',
              border: `1px solid ${project.heroColor}40`,
              backdropFilter: 'blur(12px)',
              padding: '1.2rem 1.5rem',
              minWidth: 200,
              textAlign: 'center',
              pointerEvents: 'none',
              transform: 'translateY(-120px)',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.6rem',
                letterSpacing: '0.2em',
                color: project.heroColor,
                marginBottom: '0.25rem',
                textTransform: 'uppercase',
              }}
            >
              {project.category}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1rem',
                fontWeight: 700,
                color: 'var(--gb-offwhite)',
                letterSpacing: '-0.01em',
                marginBottom: '0.75rem',
              }}
            >
              {project.title}
            </p>
            <Link
              href={`/work/${project.slug}`}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.65rem',
                letterSpacing: '0.15em',
                color: project.heroColor,
                textDecoration: 'none',
                border: `1px solid ${project.heroColor}`,
                padding: '0.35rem 0.85rem',
                display: 'inline-block',
                textTransform: 'uppercase',
                pointerEvents: 'all',
              }}
            >
              EXPLORE →
            </Link>
          </div>
        </Html>
      )}
    </group>
  );
}

const PROJECT_POSITIONS: [number, number, number][] = [
  [-3, 0, -1],
  [0, 0, 0],
  [3, 0, -1],
];

function LabEnvironment() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  return (
    <>
      <ambientLight intensity={0.15} />
      <directionalLight position={[0, 10, 5]} intensity={0.5} color="#F5F0E8" />
      <pointLight position={[0, 5, 0]} intensity={0.3} color="#C97B3A" />

      {/* Ground plane glow */}
      <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial
          color="#C97B3A"
          transparent
          opacity={0.02}
          roughness={0.8}
        />
      </mesh>

      {projects.map((project, i) => (
        <ProjectObject
          key={project.id}
          project={project}
          position={PROJECT_POSITIONS[i]}
          isHovered={hoveredProject === project.id}
          onHover={() => setHoveredProject(project.id)}
          onLeave={() => setHoveredProject(null)}
        />
      ))}
    </>
  );
}

export default function LabScene() {
  return (
    <section
      id="lab"
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        background: 'var(--gb-black)',
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
            color: 'var(--gb-offwhite-muted)',
            marginBottom: '0.3rem',
            textTransform: 'uppercase',
          }}
        >
          03 — PORTFOLIO
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
          THE LAB
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
          whiteSpace: 'nowrap',
        }}
      >
        HOVER A PROJECT TO EXPLORE
      </p>

      <Canvas
        camera={{ position: [0, 1.5, 7], fov: 50 }}
        gl={{ antialias: true }}
        dpr={[1, 1.5]}
        style={{ position: 'absolute', inset: 0 }}
      >
        <Suspense fallback={null}>
          <LabEnvironment />
        </Suspense>
      </Canvas>
    </section>
  );
}
