import { Float, MeshDistortMaterial, Stars } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import type { Group, Mesh } from 'three';
import { usePrefersReduced } from '../motion/usePrefersReduced';

function Rig() {
  const group = useRef<Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    const { x, y } = state.pointer;
    group.current.rotation.y += (x * 0.35 - group.current.rotation.y) * 0.05;
    group.current.rotation.x += (-y * 0.2 - group.current.rotation.x) * 0.05;
  });

  return (
    <group ref={group}>
      <Float speed={1.6} rotationIntensity={0.55} floatIntensity={1.1}>
        <mesh scale={1.55}>
          <icosahedronGeometry args={[1, 1]} />
          <MeshDistortMaterial
            color="#67cf18"
            distort={0.42}
            speed={2.4}
            roughness={0.18}
            metalness={0.55}
            emissive="#23720e"
            emissiveIntensity={0.35}
          />
        </mesh>
      </Float>

      <Float speed={2.1} rotationIntensity={1.1} floatIntensity={1.6}>
        <mesh position={[2.1, 0.4, -0.6]} rotation={[0.4, 0.8, 0.2]}>
          <torusGeometry args={[0.55, 0.12, 32, 100]} />
          <meshStandardMaterial
            color="#149cd4"
            emissive="#0a6286"
            emissiveIntensity={0.55}
            metalness={0.7}
            roughness={0.25}
          />
        </mesh>
      </Float>

      <Float speed={1.4} rotationIntensity={0.8} floatIntensity={1.2}>
        <mesh position={[-1.9, -0.55, 0.5]}>
          <octahedronGeometry args={[0.45, 0]} />
          <meshStandardMaterial
            color="#7dd932"
            emissive="#67cf18"
            emissiveIntensity={0.4}
            metalness={0.6}
            roughness={0.2}
          />
        </mesh>
      </Float>

      <OrbitRing />
    </group>
  );
}

function OrbitRing() {
  const ref = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * 0.25;
  });
  return (
    <mesh ref={ref} rotation={[Math.PI / 2.4, 0.2, 0]}>
      <torusGeometry args={[2.35, 0.015, 16, 200]} />
      <meshBasicMaterial color="#7ec8ea" transparent opacity={0.55} />
    </mesh>
  );
}

function Particles() {
  const positions = useMemo(() => {
    const arr = new Float32Array(900);
    for (let i = 0; i < arr.length; i += 3) {
      arr[i] = (Math.random() - 0.5) * 10;
      arr[i + 1] = (Math.random() - 0.5) * 6;
      arr[i + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#8ee34a" transparent opacity={0.75} sizeAttenuation />
    </points>
  );
}

type Props = {
  onReady?: () => void;
};

export default function HeroScene({ onReady }: Props) {
  const reduced = usePrefersReduced();

  useEffect(() => {
    if (reduced) {
      onReady?.();
      return;
    }
    const failSafe = window.setTimeout(() => onReady?.(), 2200);
    return () => window.clearTimeout(failSafe);
  }, [reduced, onReady]);

  if (reduced) {
    return <div className="hero-scene-fallback" aria-hidden="true" />;
  }

  return (
    <div className="hero-scene">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 42 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true, premultipliedAlpha: false }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          onReady?.();
        }}
      >
        <ambientLight intensity={0.45} />
        <directionalLight position={[4, 3, 2]} intensity={1.15} color="#d7ffe0" />
        <pointLight position={[-3, -2, 2]} intensity={0.95} color="#149cd4" />
        <Stars radius={40} depth={30} count={700} factor={2.4} saturation={0} fade speed={0.45} />
        <Rig />
        <Particles />
      </Canvas>
    </div>
  );
}
