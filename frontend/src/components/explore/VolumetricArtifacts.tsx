import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface VolumetricArtifactProps {
  craftId?: string;
  isHovered?: boolean;
  isSelected?: boolean;
  explodeProgress?: number; // 0 = assembled, 1 = fully exploded
  scale?: number;
}

// 1. BIDRIWARE AFTABA (Zinc-Copper Alloy with Pure Silver Wire Inlay)
export const BidriwareAftaba3D: React.FC<VolumetricArtifactProps> = ({
  isHovered = false,
  isSelected = false,
  explodeProgress = 0,
  scale = 1,
}) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current && !isSelected) {
      groupRef.current.rotation.y += delta * 0.45;
    }
  });

  const explodeOffset = explodeProgress * 0.45;

  return (
    <group ref={groupRef} scale={[scale, scale, scale]}>
      {/* LAYER 1: Core Cast Zinc-Copper Alloy Body (Base Cast) */}
      <group position={[0, -explodeOffset * 1.5, 0]}>
        {/* Foot Base */}
        <mesh position={[0, -0.42, 0]}>
          <cylinderGeometry args={[0.26, 0.32, 0.08, 32]} />
          <meshStandardMaterial
            color={explodeProgress > 0 ? '#4A4A54' : '#101014'}
            metalness={0.88}
            roughness={explodeProgress > 0 ? 0.6 : 0.3}
          />
        </mesh>

        {/* Lower Spherical Bulb */}
        <mesh position={[0, -0.15, 0]}>
          <sphereGeometry args={[0.42, 32, 24]} />
          <meshStandardMaterial
            color={explodeProgress > 0 ? '#4A4A54' : '#0D0D12'}
            metalness={0.92}
            roughness={explodeProgress > 0 ? 0.55 : 0.28}
          />
        </mesh>
      </group>

      {/* LAYER 2: Chiseled Engraving Grooves (Tarkashi Recesses) */}
      <group position={[0, 0, 0]}>
        {/* Mid Neck Transition */}
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.13, 0.22, 0.38, 32]} />
          <meshStandardMaterial
            color={explodeProgress > 0 ? '#FF7A00' : '#0F0F14'}
            metalness={0.9}
            roughness={0.32}
          />
        </mesh>

        {/* Upper Flared Neck & Pouring Rim */}
        <mesh position={[0, 0.52, 0]}>
          <cylinderGeometry args={[0.18, 0.12, 0.28, 32]} />
          <meshStandardMaterial
            color={explodeProgress > 0 ? '#FF7A00' : '#0D0D12'}
            metalness={0.92}
            roughness={0.28}
          />
        </mesh>

        {/* Dome Finial Lid */}
        <mesh position={[0, 0.72 + explodeOffset * 1.2, 0]}>
          <coneGeometry args={[0.14, 0.18, 24]} />
          <meshStandardMaterial
            color="#0E0E14"
            metalness={0.9}
            roughness={0.25}
          />
        </mesh>
      </group>

      {/* LAYER 3: 99.9% Pure Silver Wire Inlay Vines (Tarkashi / Mehtabi) */}
      <group position={[0, explodeOffset * 0.8, 0]}>
        {/* Equatorial Silver Inlay Bands */}
        <mesh position={[0, -0.15, 0]}>
          <torusGeometry args={[0.424, 0.016, 16, 64]} />
          <meshStandardMaterial
            color="#FFFFFF"
            metalness={0.98}
            roughness={0.1}
            emissive="#E5E7EB"
            emissiveIntensity={isHovered || isSelected ? 0.4 : 0.15}
          />
        </mesh>
        <mesh position={[0, -0.05, 0]}>
          <torusGeometry args={[0.395, 0.012, 16, 64]} />
          <meshStandardMaterial color="#FFFFFF" metalness={0.98} roughness={0.08} />
        </mesh>
        <mesh position={[0, -0.25, 0]}>
          <torusGeometry args={[0.395, 0.012, 16, 64]} />
          <meshStandardMaterial color="#FFFFFF" metalness={0.98} roughness={0.08} />
        </mesh>

        {/* Neck Silver Rings */}
        <mesh position={[0, 0.38, 0]}>
          <torusGeometry args={[0.142, 0.012, 16, 32]} />
          <meshStandardMaterial color="#FFFFFF" metalness={0.98} roughness={0.08} />
        </mesh>
        <mesh position={[0, 0.58, 0]}>
          <torusGeometry args={[0.182, 0.014, 16, 32]} />
          <meshStandardMaterial color="#FFFFFF" metalness={0.98} roughness={0.08} />
        </mesh>
      </group>

      {/* S-Curved Pouring Spout & Handle */}
      <group position={[0, 0, 0]}>
        {/* Graceful S-Spout */}
        <mesh position={[0.34 + explodeOffset * 0.8, 0.15, 0]} rotation={[0, 0, -0.65]}>
          <cylinderGeometry args={[0.04, 0.075, 0.58, 16]} />
          <meshStandardMaterial color="#0E0E14" metalness={0.9} roughness={0.28} />
        </mesh>
        {/* Spout Tip Silver Ring */}
        <mesh position={[0.52 + explodeOffset * 0.8, 0.38, 0]} rotation={[0, 0, -0.65]}>
          <torusGeometry args={[0.044, 0.01, 12, 24]} />
          <meshStandardMaterial color="#FFFFFF" metalness={0.98} roughness={0.1} />
        </mesh>

        {/* Curved Handle */}
        <mesh position={[-0.32 - explodeOffset * 0.8, 0.12, 0]} rotation={[0, 0, 0.3]}>
          <torusGeometry args={[0.22, 0.032, 16, 32, Math.PI * 1.2]} />
          <meshStandardMaterial color="#0E0E14" metalness={0.9} roughness={0.28} />
        </mesh>
      </group>
    </group>
  );
};

// 2. BASTAR DHOKRA BRONZE FIGURINE (Lost-Wax Casting)
export const BastarDhokraElephant3D: React.FC<VolumetricArtifactProps> = ({
  isHovered = false,
  isSelected = false,
  explodeProgress = 0,
  scale = 1,
}) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current && !isSelected) {
      groupRef.current.rotation.y += delta * 0.4;
    }
  });

  const bronzeMaterial = new THREE.MeshStandardMaterial({
    color: explodeProgress > 0 ? '#C27838' : '#A26028',
    metalness: 0.84,
    roughness: 0.42,
  });

  const waxCoreMaterial = new THREE.MeshStandardMaterial({
    color: '#D97706',
    metalness: 0.2,
    roughness: 0.7,
  });

  const clayCoreMaterial = new THREE.MeshStandardMaterial({
    color: '#854D0E',
    metalness: 0.1,
    roughness: 0.88,
  });

  const offset = explodeProgress * 0.35;

  return (
    <group ref={groupRef} scale={[scale, scale, scale]}>
      {/* Inner Clay Core (revealed during explosion) */}
      {explodeProgress > 0 && (
        <group position={[0, -offset * 1.4, 0]}>
          <mesh position={[0, 0.05, 0]}>
            <sphereGeometry args={[0.28, 16, 16]} />
            <primitive object={clayCoreMaterial} attach="material" />
          </mesh>
        </group>
      )}

      {/* Main Bronze Barrel Body */}
      <mesh position={[0, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.25, 0.28, 0.58, 20]} />
        <primitive object={bronzeMaterial} attach="material" />
      </mesh>

      {/* Coiled Wire-Lattice Ribs (Signature Dhokra technique) */}
      {[-0.2, -0.1, 0, 0.1, 0.2].map((z, idx) => (
        <mesh key={idx} position={[0, 0.05, z]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.285, 0.016, 12, 32]} />
          <meshStandardMaterial
            color="#CA8A04"
            metalness={0.88}
            roughness={0.36}
            emissive="#78350F"
            emissiveIntensity={isHovered ? 0.3 : 0.1}
          />
        </mesh>
      ))}

      {/* 4 Tubular Columnar Legs */}
      {[
        [-0.18, -0.25, 0.2],
        [0.18, -0.25, 0.2],
        [-0.18, -0.25, -0.2],
        [0.18, -0.25, -0.2],
      ].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y - offset, z]}>
          <cylinderGeometry args={[0.048, 0.065, 0.45, 12]} />
          <primitive object={bronzeMaterial} attach="material" />
        </mesh>
      ))}

      {/* Stylized Elephant Head & Arched Trunk */}
      <group position={[0, 0.25 + offset, 0.36]}>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.18, 16, 16]} />
          <primitive object={bronzeMaterial} attach="material" />
        </mesh>
        {/* S-Curved Hollow Trunk */}
        <mesh position={[0, -0.15, 0.12]} rotation={[0.4, 0, 0]}>
          <cylinderGeometry args={[0.035, 0.06, 0.38, 12]} />
          <primitive object={bronzeMaterial} attach="material" />
        </mesh>
        {/* Fan-Shaped Filigree Ears */}
        <mesh position={[-0.2, 0.02, -0.05]} rotation={[0, -0.4, 0.2]}>
          <circleGeometry args={[0.14, 16]} />
          <meshStandardMaterial color="#CA8A04" metalness={0.85} roughness={0.38} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0.2, 0.02, -0.05]} rotation={[0, 0.4, -0.2]}>
          <circleGeometry args={[0.14, 16]} />
          <meshStandardMaterial color="#CA8A04" metalness={0.85} roughness={0.38} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Howdah Seat on Elephant Back */}
      <group position={[0, 0.42 + offset * 1.5, 0]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.34, 0.12, 0.38]} />
          <meshStandardMaterial color="#CA8A04" metalness={0.9} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.14, 0]}>
          <coneGeometry args={[0.12, 0.16, 16]} />
          <meshStandardMaterial color="#EAB308" metalness={0.92} roughness={0.25} />
        </mesh>
      </group>
    </group>
  );
};

// 3. KUTCH ROGAN SACRED SILK RELIEF (Castor Oil Pigment Filaments)
export const RoganSilkPlate3D: React.FC<VolumetricArtifactProps> = ({
  isHovered = false,
  isSelected = false,
  explodeProgress = 0,
  scale = 1,
}) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current && !isSelected) {
      groupRef.current.rotation.y += delta * 0.35;
    }
  });

  const explodeOffset = explodeProgress * 0.3;

  return (
    <group ref={groupRef} scale={[scale, scale, scale]}>
      {/* Layer 1: Mulberry Black Silk Fabric Base with natural drape */}
      <mesh position={[0, 0, -explodeOffset]}>
        <boxGeometry args={[0.92, 1.25, 0.025]} />
        <meshStandardMaterial color="#0A0A0D" roughness={0.78} metalness={0.12} />
      </mesh>

      {/* Layer 2: Boiled Wild Castor Oil Relief Strands (Tactile Thread Ridge) */}
      <group position={[0, 0, 0.02 + explodeOffset]}>
        {/* Tree of Life Curved Trunk */}
        <mesh position={[0, -0.2, 0]} rotation={[0, 0, 0.05]}>
          <cylinderGeometry args={[0.032, 0.05, 0.65, 12]} />
          <meshStandardMaterial color="#FF7A00" roughness={0.22} metalness={0.15} />
        </mesh>

        {/* Radiating Mirrored Boughs */}
        {[-0.32, -0.16, 0.16, 0.32].map((x, idx) => (
          <mesh key={idx} position={[x, 0.15 + Math.abs(x) * 0.25, 0]} rotation={[0, 0, -x * 1.2]}>
            <cylinderGeometry args={[0.016, 0.024, 0.45, 10]} />
            <meshStandardMaterial color="#EAB308" roughness={0.25} metalness={0.15} />
          </mesh>
        ))}

        {/* Malachite Green & Peacock Indigo Bud Beads */}
        {[
          [-0.24, 0.4, 0.01],
          [0.24, 0.4, 0.01],
          [-0.38, 0.22, 0.01],
          [0.38, 0.22, 0.01],
          [0, 0.52, 0.01],
        ].map(([bx, by, bz], i) => (
          <mesh key={i} position={[bx, by, bz]}>
            <sphereGeometry args={[0.042, 12, 12]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? '#10B981' : '#3B82F6'}
              roughness={0.18}
              metalness={0.2}
            />
          </mesh>
        ))}

        {/* Khatri Kalam Stylus Dot Rays */}
        {[...Array(12)].map((_, i) => {
          const angle = (i / 12) * Math.PI;
          const r = 0.46;
          return (
            <mesh key={i} position={[Math.cos(angle) * r, Math.sin(angle) * r + 0.15, 0.01]}>
              <sphereGeometry args={[0.022, 8, 8]} />
              <meshStandardMaterial color="#FFFFFF" roughness={0.2} metalness={0.1} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
};

// 4. CHANNAPATNA LACQUERWOOD TOY (Lathe-Turned Ivory Wood)
export const ChannapatnaWood3D: React.FC<VolumetricArtifactProps> = ({
  isSelected = false,
  scale = 1,
}) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current && !isSelected) {
      groupRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group ref={groupRef} scale={[scale, scale, scale]}>
      {/* High-Gloss Lacquer Sheen PBR Materials */}
      {/* Base: Teakwood Platform */}
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[0.26, 0.32, 0.1, 24]} />
        <meshStandardMaterial color="#92400E" roughness={0.15} metalness={0.08} />
      </mesh>

      {/* Tier 1: Canary Yellow Lathe Ring */}
      <mesh position={[0, -0.22, 0]}>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshStandardMaterial color="#FACC15" roughness={0.12} metalness={0.05} />
      </mesh>

      {/* Tier 2: Royal Kumkum Red Waist */}
      <mesh position={[0, 0.04, 0]}>
        <cylinderGeometry args={[0.12, 0.18, 0.22, 24]} />
        <meshStandardMaterial color="#DC2626" roughness={0.1} metalness={0.06} />
      </mesh>

      {/* Tier 3: Malachite Green Tapered Dome */}
      <mesh position={[0, 0.28, 0]}>
        <coneGeometry args={[0.16, 0.32, 24]} />
        <meshStandardMaterial color="#16A34A" roughness={0.11} metalness={0.05} />
      </mesh>

      {/* Top Finial Bead */}
      <mesh position={[0, 0.48, 0]}>
        <sphereGeometry args={[0.065, 16, 16]} />
        <meshStandardMaterial color="#F97316" roughness={0.12} metalness={0.05} />
      </mesh>
    </group>
  );
};

// Dispatcher Component matching Object Slug / Category to Volumetric 3D Artifact
export const VolumetricArtifactDispatcher: React.FC<{
  objectSlug: string;
  isHovered?: boolean;
  isSelected?: boolean;
  explodeProgress?: number;
  scale?: number;
}> = ({ objectSlug, isHovered, isSelected, explodeProgress = 0, scale = 1 }) => {
  const slug = objectSlug.toLowerCase();

  if (slug.includes('bidriware') || slug.includes('aftaba')) {
    return (
      <BidriwareAftaba3D
        isHovered={isHovered}
        isSelected={isSelected}
        explodeProgress={explodeProgress}
        scale={scale}
      />
    );
  }

  if (slug.includes('dhokra') || slug.includes('bastar') || slug.includes('elephant')) {
    return (
      <BastarDhokraElephant3D
        isHovered={isHovered}
        isSelected={isSelected}
        explodeProgress={explodeProgress}
        scale={scale}
      />
    );
  }

  if (slug.includes('rogan') || slug.includes('kutch') || slug.includes('tree')) {
    return (
      <RoganSilkPlate3D
        isHovered={isHovered}
        isSelected={isSelected}
        explodeProgress={explodeProgress}
        scale={scale}
      />
    );
  }

  if (slug.includes('channapatna') || slug.includes('toy') || slug.includes('wood')) {
    return (
      <ChannapatnaWood3D
        isHovered={isHovered}
        isSelected={isSelected}
        explodeProgress={explodeProgress}
        scale={scale}
      />
    );
  }

  // Fallback to Bidriware flagon
  return (
    <BidriwareAftaba3D
      isHovered={isHovered}
      isSelected={isSelected}
      explodeProgress={explodeProgress}
      scale={scale}
    />
  );
};
