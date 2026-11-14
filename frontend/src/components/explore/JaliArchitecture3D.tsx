import React, { useMemo } from 'react';
import * as THREE from 'three';

interface JaliArchitectureProps {
  radius?: number;
  count?: number;
  pillarHeight?: number;
}

export const JaliArchitecture3D: React.FC<JaliArchitectureProps> = ({
  radius = 17.5,
  count = 16,
  pillarHeight = 7.5,
}) => {
  // PBR materials for Sandstone Pillars and Jali Screens
  const pillarMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#181820', // Dark obsidian stone with subtle warm undertones
        roughness: 0.65,
        metalness: 0.25,
      }),
    []
  );

  const goldFiligreeMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#FF7A00',
        roughness: 0.25,
        metalness: 0.9,
      }),
    []
  );

  const jaliScreenMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#121218',
        roughness: 0.55,
        metalness: 0.4,
        side: THREE.DoubleSide,
      }),
    []
  );

  // Calculate pillar and screen positions along perimeter ring
  const elements = useMemo(() => {
    return [...Array(count)].map((_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;
      const rotY = angle;

      // Screen midpoint between this pillar and next
      const nextAngle = ((i + 1) / count) * Math.PI * 2;
      const midAngle = (angle + nextAngle) / 2;
      const sx = Math.sin(midAngle) * radius;
      const sz = Math.cos(midAngle) * radius;
      const screenRotY = midAngle + Math.PI / 2;

      return { x, z, rotY, sx, sz, screenRotY };
    });
  }, [count, radius]);

  return (
    <group position={[0, -2.5, 0]}>
      {elements.map((el, i) => (
        <group key={i}>
          {/* 1. CARVED ARCHITECTURAL STONE PILLAR (KHAMBA) */}
          <group position={[el.x, 0, el.z]} rotation={[0, el.rotY, 0]}>
            {/* Stepped Plinth Base */}
            <mesh position={[0, 0.2, 0]} material={pillarMaterial} castShadow receiveShadow>
              <boxGeometry args={[0.7, 0.4, 0.7]} />
            </mesh>
            <mesh position={[0, 0.45, 0]} material={goldFiligreeMaterial}>
              <boxGeometry args={[0.55, 0.1, 0.55]} />
            </mesh>

            {/* Fluted Column Shaft */}
            <mesh position={[0, pillarHeight / 2 + 0.45, 0]} material={pillarMaterial} castShadow receiveShadow>
              <cylinderGeometry args={[0.22, 0.26, pillarHeight, 16]} />
            </mesh>

            {/* Mid-Shaft Brass Ring Inlay */}
            <mesh position={[0, pillarHeight * 0.45, 0]} rotation={[Math.PI / 2, 0, 0]} material={goldFiligreeMaterial}>
              <torusGeometry args={[0.265, 0.02, 12, 24]} />
            </mesh>

            {/* Carved Lotus Capital */}
            <mesh position={[0, pillarHeight + 0.45, 0]} material={pillarMaterial} castShadow>
              <cylinderGeometry args={[0.48, 0.24, 0.45, 8]} />
            </mesh>
            <mesh position={[0, pillarHeight + 0.75, 0]} material={goldFiligreeMaterial}>
              <boxGeometry args={[0.75, 0.15, 0.75]} />
            </mesh>
          </group>

          {/* 2. TRADITIONAL INDIAN JALI LATTICE PANEL (Geometric Cutouts) */}
          <group position={[el.sx, 0, el.sz]} rotation={[0, el.screenRotY, 0]}>
            {/* Lower Parapet Sill */}
            <mesh position={[0, 0.55, 0]} material={pillarMaterial} castShadow receiveShadow>
              <boxGeometry args={[4.2, 1.1, 0.25]} />
            </mesh>
            <mesh position={[0, 1.12, 0]} material={goldFiligreeMaterial}>
              <boxGeometry args={[4.3, 0.05, 0.28]} />
            </mesh>

            {/* Jali Lattice Screen Frame */}
            <mesh position={[0, 3.2, 0]} material={jaliScreenMaterial} castShadow receiveShadow>
              <boxGeometry args={[3.8, 3.8, 0.08]} />
            </mesh>

            {/* Geometric Jali Openings / Star Motif Inserts (Visual Piercing) */}
            {[-1.2, -0.4, 0.4, 1.2].map((gx, gIdx) => (
              <group key={gIdx} position={[gx, 3.2, 0]}>
                <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
                  <boxGeometry args={[0.42, 0.42, 0.1]} />
                  <meshBasicMaterial color="#08080A" />
                </mesh>
                <mesh position={[0, 0.7, 0]} rotation={[0, 0, Math.PI / 4]}>
                  <boxGeometry args={[0.3, 0.3, 0.1]} />
                  <meshBasicMaterial color="#08080A" />
                </mesh>
                <mesh position={[0, -0.7, 0]} rotation={[0, 0, Math.PI / 4]}>
                  <boxGeometry args={[0.3, 0.3, 0.1]} />
                  <meshBasicMaterial color="#08080A" />
                </mesh>
              </group>
            ))}

            {/* Crown Arch Lintel */}
            <mesh position={[0, 5.3, 0]} material={pillarMaterial} castShadow>
              <boxGeometry args={[4.4, 0.45, 0.3]} />
            </mesh>
          </group>
        </group>
      ))}

      {/* Outer Vault Ring Cornice */}
      <mesh position={[0, pillarHeight + 0.95, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius - 0.5, radius + 0.8, 64]} />
        <meshStandardMaterial color="#0E0E14" roughness={0.4} metalness={0.7} />
      </mesh>
    </group>
  );
};
