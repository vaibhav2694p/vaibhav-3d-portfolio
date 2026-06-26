// @ts-nocheck
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Ring } from '@react-three/drei';
import * as THREE from 'three';

/* Particle field */
function Particles({ count = 100 }) {
  const mesh = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.05;
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#00d4ff" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

/* Floating orb */
function FloatingOrb({ position, color, speed = 1, size = 0.3 }: { position: [number, number, number]; color: string; speed?: number; size?: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5;
      ref.current.rotation.y += 0.01 * speed;
      ref.current.rotation.x += 0.005 * speed;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={ref} position={position}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} transparent opacity={0.8} />
      </mesh>
    </Float>
  );
}

/* Rotating ring */
function RotatingRing({ radius, color, speed, position }: { radius: number; color: string; speed: number; position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * speed;
      ref.current.rotation.y = state.clock.elapsedTime * speed * 0.5;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <torusGeometry args={[radius, 0.02, 16, 100]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} transparent opacity={0.6} />
    </mesh>
  );
}

/* Cyber Head */
function CyberHead() {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = 2.2 + Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={ref} position={[0, 2.2, 0]}>
      {/* Head core */}
      <mesh>
        <icosahedronGeometry args={[0.5, 1]} />
        <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.4} wireframe />
      </mesh>
      {/* Inner head glow */}
      <mesh scale={0.7}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.6} transparent opacity={0.3} />
      </mesh>
      {/* Visor / Eye glow */}
      <mesh position={[0, 0.05, 0.35]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.4, 0.08, 0.1]} />
        <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={2} />
      </mesh>
      {/* Head ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.55, 0.02, 16, 100]} />
        <meshStandardMaterial color="#7c3aed" emissive="#7c3aed" emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}

/* Cyber Torso */
function CyberTorso() {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.03;
    }
  });

  return (
    <group ref={ref} position={[0, 1.2, 0]}>
      {/* Main torso */}
      <mesh>
        <boxGeometry args={[0.9, 1.2, 0.5]} />
        <meshStandardMaterial color="#1a1a24" emissive="#0066ff" emissiveIntensity={0.2} wireframe />
      </mesh>
      {/* Inner torso glow */}
      <mesh scale={0.85}>
        <boxGeometry args={[0.9, 1.2, 0.5]} />
        <meshStandardMaterial color="#0066ff" emissive="#0066ff" emissiveIntensity={0.3} transparent opacity={0.2} />
      </mesh>
      {/* Chest core / Shield */}
      <mesh position={[0, 0.2, 0.28]}>
        <cylinderGeometry args={[0.2, 0.2, 0.05, 6]} />
        <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={1.5} />
      </mesh>
      {/* Chest lines */}
      <mesh position={[0, 0.2, 0.3]}>
        <boxGeometry args={[0.6, 0.02, 0.02]} />
        <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={1} />
      </mesh>
      <mesh position={[0, -0.1, 0.3]}>
        <boxGeometry args={[0.5, 0.02, 0.02]} />
        <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.8} />
      </mesh>
      {/* Shoulders */}
      <mesh position={[-0.55, 0.5, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#7c3aed" emissive="#7c3aed" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.55, 0.5, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#7c3aed" emissive="#7c3aed" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

/* Cyber Limb */
function CyberLimb({ position, length, isLeg = false }: { position: [number, number, number]; length: number; isLeg?: boolean }) {
  const ref = useRef<THREE.Group>(null);
  const speed = isLeg ? 1.2 : 1.5;

  useFrame((state) => {
    if (ref.current) {
      const offset = isLeg ? 0 : Math.PI;
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * speed + offset) * 0.05;
    }
  });

  return (
    <group ref={ref} position={position}>
      <mesh>
        <cylinderGeometry args={[0.08, 0.08, length, 12]} />
        <meshStandardMaterial color="#1a1a24" emissive="#0066ff" emissiveIntensity={0.3} wireframe />
      </mesh>
      <mesh scale={0.9}>
        <cylinderGeometry args={[0.08, 0.08, length, 12]} />
        <meshStandardMaterial color="#0066ff" emissive="#0066ff" emissiveIntensity={0.2} transparent opacity={0.2} />
      </mesh>
      {/* Joint */}
      <mesh position={[0, length / 2, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0, -length / 2, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

/* Base platform */
function Platform() {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={ref} position={[0, -0.5, 0]}>
      <Ring args={[1.5, 1.6, 64]} rotation={[-Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.5} transparent opacity={0.6} side={THREE.DoubleSide} />
      </Ring>
      <Ring args={[1.8, 1.85, 64]} rotation={[-Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#7c3aed" emissive="#7c3aed" emissiveIntensity={0.3} transparent opacity={0.4} side={THREE.DoubleSide} />
      </Ring>
    </group>
  );
}

/* Main Character Assembly */
function CyberCharacter() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Position based on screen width (right side for desktop, center for mobile)
      const isMobile = window.innerWidth < 1024;
      const targetPosX = isMobile ? 0 : 2.0;
      
      // Scroll-based interactions
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = maxScroll > 0 ? scrollY / maxScroll : 0;
      
      // Rotate 360 degrees (Math.PI * 2) across the full page scroll
      const scrollRotY = scrollProgress * Math.PI * 2;
      
      // Move down slightly as you scroll
      const targetPosY = -(scrollProgress * 1.5);

      // Subtle mouse follow (X rotation based on mouse Y, Y rotation based on mouse X)
      const mouseRotX = (state.mouse.y * 0.3);
      const mouseRotY = (state.mouse.x * 0.5);
      
      // Apply smooth interpolation
      groupRef.current.position.x += (targetPosX - groupRef.current.position.x) * 0.05;
      groupRef.current.position.y += (targetPosY - groupRef.current.position.y) * 0.05;
      
      groupRef.current.rotation.x += (mouseRotX - groupRef.current.rotation.x) * 0.05;
      groupRef.current.rotation.y += ((mouseRotY + scrollRotY) - groupRef.current.rotation.y) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <CyberHead />
      <CyberTorso />
      {/* Arms */}
      <CyberLimb position={[-0.7, 1.0, 0]} length={1.0} />
      <CyberLimb position={[0.7, 1.0, 0]} length={1.0} />
      {/* Legs */}
      <CyberLimb position={[-0.3, 0.2, 0]} length={1.2} isLeg />
      <CyberLimb position={[0.3, 0.2, 0]} length={1.2} isLeg />
      {/* Floating orbs */}
      <FloatingOrb position={[-1.8, 2.8, 0.5]} color="#00d4ff" speed={1.2} size={0.18} />
      <FloatingOrb position={[1.8, 1.5, -0.5]} color="#7c3aed" speed={0.8} size={0.22} />
      <FloatingOrb position={[0.8, 3.5, 0.8]} color="#ec4899" speed={1.5} size={0.12} />
      <FloatingOrb position={[-0.8, 0.5, 1.2]} color="#0066ff" speed={0.6} size={0.15} />
      {/* Rotating rings */}
      <RotatingRing radius={2.2} color="#00d4ff" speed={0.3} position={[0, 1.5, 0]} />
      <RotatingRing radius={2.6} color="#7c3aed" speed={-0.2} position={[0, 1.5, 0]} />
      <RotatingRing radius={3.0} color="#0066ff" speed={0.15} position={[0, 1.5, 0]} />
      {/* Platform */}
      <Platform />
    </group>
  );
}

/* Scene */
function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} color="#00d4ff" />
      <pointLight position={[5, 5, 5]} intensity={1} color="#00d4ff" />
      <pointLight position={[-5, 3, -5]} intensity={0.5} color="#7c3aed" />
      <pointLight position={[0, -3, 3]} intensity={0.5} color="#0066ff" />
      <CyberCharacter />
      <Particles count={200} />
      <fog attach="fog" args={['#0a0a0f', 8, 25]} />
    </>
  );
}

export default function Character3D() {
  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 1.5, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
      >
        <Scene />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
          maxAzimuthAngle={Math.PI / 2}
          minAzimuthAngle={-Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}
