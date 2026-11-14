import React, { useRef, useState, useMemo, useEffect, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, MeshReflectorMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Eye,
  Flame,
  Sun,
  Footprints,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Landmark,
  Sparkles,
  Compass,
  X,
  Layers,
  Scan,
  Atom
} from 'lucide-react';
import { HeritageObject } from '../../data/heritageDataset';
import { VolumetricArtifactDispatcher } from './VolumetricArtifacts';
import { JaliArchitecture3D } from './JaliArchitecture3D';
import { ExplodedDissectionModal } from './ExplodedDissectionModal';
import { MacroMagnifierOverlay } from './MacroMagnifierOverlay';

interface Heritage3DSceneProps {
  objects: HeritageObject[];
  selectedObject: HeritageObject | null;
  onSelectObject: (obj: HeritageObject | null) => void;
  selectedCategory: string;
  searchQuery: string;
  topHudCenter?: React.ReactNode;
}

// 1. GPU Native WebGL Exhibition Panel
const ExhibitionPanel: React.FC<{
  object: HeritageObject;
  position: [number, number, number];
  rotation: [number, number, number];
  isSelected: boolean;
  onSelect: () => void;
  onHoverChange?: (hovered: boolean) => void;
}> = ({ object, position, rotation, isSelected, onSelect, onHoverChange }) => {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const textureRef = useRef<THREE.Texture | null>(null);
  const pointerDownPos = useRef({ x: 0, y: 0 });
  const vecTarget = useMemo(() => new THREE.Vector3(), []);

  // Pre-load texture on native Three.js texture loader with procedural fallback
  useEffect(() => {
    let isMounted = true;

    const createFallbackTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const grad = ctx.createLinearGradient(0, 0, 512, 512);
        grad.addColorStop(0, '#3A141A'); // Deep royal maroon
        grad.addColorStop(1, '#5C2516'); // Ancient teakwood brown
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 512, 512);
        ctx.fillStyle = '#D97706';
        ctx.font = 'bold 36px serif';
        ctx.textAlign = 'center';
        ctx.fillText((object.name || 'Masterpiece').substring(0, 18), 256, 240);
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '22px sans-serif';
        ctx.fillText(object.region || 'India', 256, 290);
        const fallbackTex = new THREE.CanvasTexture(canvas);
        fallbackTex.colorSpace = THREE.SRGBColorSpace;
        textureRef.current = fallbackTex;
        if (isMounted) setTexture(fallbackTex);
      }
    };

    if (!object.image_url) {
      createFallbackTexture();
      return () => {
        isMounted = false;
        if (textureRef.current) textureRef.current.dispose();
      };
    }

    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin('anonymous');

    loader.load(
      object.image_url,
      (loadedTex) => {
        if (!isMounted) return;
        loadedTex.colorSpace = THREE.SRGBColorSpace;
        loadedTex.minFilter = THREE.LinearFilter;
        loadedTex.generateMipmaps = true;
        textureRef.current = loadedTex;
        setTexture(loadedTex);
      },
      undefined,
      () => {
        if (!isMounted) return;
        createFallbackTexture();
      }
    );

    return () => {
      isMounted = false;
      if (textureRef.current) {
        textureRef.current.dispose();
      }
    };
  }, [object.image_url, object.name, object.region]);

  // Silky smooth hover & selection scale transition in useFrame
  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const targetScale = isSelected ? 1.12 : hovered ? 1.05 : 1.0;
    meshRef.current.scale.lerp(vecTarget.set(targetScale, targetScale, targetScale), delta * 9);
  });

  return (
    <group
      ref={meshRef}
      position={position}
      rotation={rotation}
      onPointerDown={(e) => {
        pointerDownPos.current = { x: e.clientX, y: e.clientY };
      }}
      onPointerUp={(e) => {
        // Distinguish between camera orbiting/dragging and intentional clicking
        const dragDist = Math.hypot(
          e.clientX - pointerDownPos.current.x,
          e.clientY - pointerDownPos.current.y
        );
        if (dragDist < 7) {
          e.stopPropagation();
          onSelect();
        }
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
        onHoverChange?.(true);
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
        onHoverChange?.(false);
      }}
    >
      {/* Outer Golden Brass Frame */}
      <mesh position={[0, 0, -0.02]}>
        <boxGeometry args={[2.5, 3.2, 0.08]} />
        <meshStandardMaterial
          color={isSelected ? '#FF7A00' : hovered ? '#FFA033' : '#332617'}
          metalness={0.88}
          roughness={0.22}
        />
      </mesh>

      {/* Frame Inset Accent Border */}
      <mesh position={[0, 0, 0.025]}>
        <boxGeometry args={[2.34, 3.04, 0.02]} />
        <meshStandardMaterial
          color={isSelected ? '#201205' : hovered ? '#1B141E' : '#0E0E12'}
          metalness={0.6}
          roughness={0.28}
        />
      </mesh>

      {/* GPU Hardware-Accelerated Artwork Mesh */}
      <mesh position={[0, 0.35, 0.045]}>
        <planeGeometry args={[2.14, 2.14]} />
        {texture ? (
          <meshBasicMaterial map={texture} />
        ) : (
          <meshStandardMaterial color="#16161C" roughness={0.5} />
        )}
      </mesh>

      {/* Base Plinth / Brass Label Stand */}
      <mesh position={[0, -0.98, 0.045]}>
        <boxGeometry args={[2.14, 0.46, 0.02]} />
        <meshStandardMaterial
          color={isSelected ? '#251508' : '#121218'}
          metalness={0.7}
          roughness={0.25}
        />
      </mesh>

      {/* High-DPI SDF Text: Artefact Title (Silk Pearl) */}
      <Text
        position={[0, -0.88, 0.07]}
        fontSize={0.11}
        color={isSelected ? '#FFE082' : '#F5F3EF'}
        anchorX="center"
        anchorY="middle"
        maxWidth={2.0}
      >
        {object.name.length > 26 ? object.name.substring(0, 24) + '...' : object.name}
      </Text>

      {/* High-DPI SDF Text: Geographic Origin (Temple Gold) */}
      <Text
        position={[0, -1.07, 0.07]}
        fontSize={0.08}
        color={isSelected ? '#FFA033' : '#FF7A00'}
        anchorX="center"
        anchorY="middle"
        maxWidth={2.0}
      >
        {object.gi_status ? `${object.gi_status.split('(')[0]}` : `${object.region} • ${object.state}`}
      </Text>

      {/* Reverse Back: Dark Obsidian Teakwood with Brass Inlay Ring */}
      <mesh position={[0, 0, -0.062]}>
        <boxGeometry args={[2.42, 3.12, 0.01]} />
        <meshStandardMaterial color="#0A0A0E" roughness={0.7} metalness={0.3} />
      </mesh>
      <mesh position={[0, 0, -0.07]} rotation={[0, Math.PI, 0]}>
        <ringGeometry args={[0.3, 0.38, 32]} />
        <meshStandardMaterial color="#FF7A00" metalness={0.9} roughness={0.18} />
      </mesh>

      {/* Supporting Vertical Stanchion Column down to Gallery Floor */}
      <mesh position={[0, -1.95, 0]}>
        <cylinderGeometry args={[0.06, 0.08, 1.05, 16]} />
        <meshStandardMaterial color="#2B1E12" metalness={0.8} roughness={0.25} />
      </mesh>

      {/* Forward Viewing Plinth & Volumetric 3D Masterwork */}
      <group position={[0, -0.62, 0.46]}>
        {/* Plinth Disk */}
        <mesh position={[0, -0.42, 0]}>
          <cylinderGeometry args={[0.42, 0.48, 0.06, 24]} />
          <meshStandardMaterial color="#1E1E26" roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[0, -0.385, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.38, 0.42, 24]} />
          <meshStandardMaterial color="#FF7A00" roughness={0.15} metalness={0.95} />
        </mesh>
        {/* Volumetric Procedural 3D Mesh */}
        <VolumetricArtifactDispatcher
          objectSlug={object.id}
          isHovered={hovered}
          isSelected={isSelected}
          scale={0.58}
        />
      </group>

      {/* Architectural Plinth Pedestal Base on Floor */}
      <mesh position={[0, -2.5, 0]}>
        <cylinderGeometry args={[0.65, 0.75, 0.1, 24]} />
        <meshStandardMaterial
          color={isSelected ? '#351B08' : '#121216'}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Ground Spot Indicator Ring */}
      <mesh position={[0, -2.44, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.45, 0.85, 32]} />
        <meshBasicMaterial
          color={isSelected ? '#FF7A00' : hovered ? '#FFA033' : '#2A1C10'}
          transparent
          opacity={isSelected ? 0.75 : hovered ? 0.45 : 0.2}
        />
      </mesh>
    </group>
  );
};

// 2. Central Hero Monument: The Statue of Unity (Sardar Vallabhbhai Patel)
// 182-metre monument recreation in radiant Indian bronze & 24K temple gold
const StatueOfUnityModel: React.FC<{
  onInspect?: () => void;
  isAartiMode: boolean;
}> = ({ onInspect, isAartiMode }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [modelScene, setModelScene] = useState<THREE.Group | null>(null);

  useEffect(() => {
    let isMounted = true;
    const loader = new GLTFLoader();
    loader.load(
      '/models/statue_of_unity.glb',
      (gltf) => {
        if (!isMounted) return;
        const root = gltf.scene;

        // Auto-center and normalize scale using 3D bounding box
        const box = new THREE.Box3().setFromObject(root);
        const size = new THREE.Vector3();
        box.getSize(size);
        const center = new THREE.Vector3();
        box.getCenter(center);

        // Desired target height on the pedestal (3.55 units tall)
        const targetHeight = 3.55;
        const scaleFactor = targetHeight / (size.y || 0.5896);
        root.scale.set(scaleFactor, scaleFactor, scaleFactor);

        // Position base flush on the top plinth (y = -0.92) and centered on X/Z
        root.position.set(
          -center.x * scaleFactor,
          -0.92 - (box.min.y * scaleFactor),
          -center.z * scaleFactor
        );

        // Enhance materials with rich 24K temple gold specular highlights and crisp textures
        root.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            if (mesh.material) {
              const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
              materials.forEach((mat) => {
                if ((mat as THREE.MeshStandardMaterial).isMeshStandardMaterial) {
                  const m = mat as THREE.MeshStandardMaterial;
                  m.metalness = 0.62;
                  m.roughness = 0.26;
                  m.color = new THREE.Color('#FFF5D0');
                  if (m.map) {
                    m.map.colorSpace = THREE.SRGBColorSpace;
                    m.map.needsUpdate = true;
                  }
                  m.needsUpdate = true;
                }
              });
            }
          }
        });

        setModelScene(root);
      },
      undefined,
      (err) => {
        console.warn('Could not load external GLB model, using procedural statue:', err);
      }
    );

    return () => {
      isMounted = false;
    };
  }, []);

  useFrame((_, delta) => {
    // Stately, dignified slow rotation
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12;
    }
  });

  // Radiant Golden PBR Materials
  const goldMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: hovered ? '#FBBF24' : '#F59E0B',
        metalness: 0.88,
        roughness: hovered ? 0.16 : 0.24,
      }),
    [hovered]
  );

  const antiqueBronzeMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#B45309',
        metalness: 0.82,
        roughness: 0.32,
      }),
    []
  );

  const goldLeafAccentMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#FEF08A',
        metalness: 0.94,
        roughness: 0.12,
      }),
    []
  );

  const pedestalStoneMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#0A0A0E',
        roughness: 0.45,
        metalness: 0.6,
      }),
    []
  );

  const pedestalObsidianMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#121218',
        roughness: 0.3,
        metalness: 0.75,
      }),
    []
  );

  const plaqueBrassMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#FF7A00',
        metalness: 0.94,
        roughness: 0.16,
      }),
    []
  );

  return (
    <group position={[0, 0, 0]}>
      {/* --- 1. CONCENTRIC ROYAL SACRED FLOOR PLAZA --- */}
      <mesh position={[0, -1.95, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0, 4.8, 64]} />
        <meshStandardMaterial color="#08080A" metalness={0.75} roughness={0.3} />
      </mesh>
      <mesh position={[0, -1.94, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[4.4, 4.6, 64]} />
        <meshStandardMaterial color="#FF7A00" metalness={0.95} roughness={0.12} />
      </mesh>
      <mesh position={[0, -1.938, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.2, 3.35, 64]} />
        <meshStandardMaterial color="#FFA033" metalness={0.85} roughness={0.2} />
      </mesh>

      {/* --- 2. STEPPED OCTAGONAL ISLAND PEDESTAL (SADHU BET FOUNDATION) --- */}
      {/* Tier 1: Lower Octagonal Granite Foundation */}
      <mesh position={[0, -1.78, 0]} material={pedestalStoneMaterial}>
        <cylinderGeometry args={[2.7, 3.1, 0.35, 8]} />
      </mesh>
      <mesh position={[0, -1.6, 0]} rotation={[-Math.PI / 2, 0, 0]} material={goldLeafAccentMaterial}>
        <ringGeometry args={[2.5, 2.72, 8]} />
      </mesh>

      {/* Tier 2: Obsidian Architectural Level */}
      <mesh position={[0, -1.42, 0]} material={pedestalObsidianMaterial}>
        <cylinderGeometry args={[2.0, 2.35, 0.38, 8]} />
      </mesh>
      <mesh position={[0, -1.22, 0]} rotation={[-Math.PI / 2, 0, 0]} material={goldLeafAccentMaterial}>
        <ringGeometry args={[1.85, 2.02, 8]} />
      </mesh>

      {/* Tier 3: Upper Golden Podium */}
      <mesh position={[0, -1.08, 0]} material={pedestalStoneMaterial}>
        <cylinderGeometry args={[1.45, 1.7, 0.3, 8]} />
      </mesh>
      <mesh position={[0, -0.92, 0]} material={plaqueBrassMaterial}>
        <cylinderGeometry args={[1.35, 1.45, 0.08, 8]} />
      </mesh>

      {/* 4 Architectural Golden Ground Spotlights on Plinth Facets */}
      {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, idx) => {
        const dist = 1.9;
        const lx = Math.sin(angle) * dist;
        const lz = Math.cos(angle) * dist;
        return (
          <group key={idx} position={[lx, -1.2, lz]}>
            {/* Brass Spotlight Fixture Body */}
            <mesh position={[0, 0, 0]} rotation={[0.4, angle, 0]} material={plaqueBrassMaterial}>
              <cylinderGeometry args={[0.08, 0.12, 0.18, 12]} />
            </mesh>
            {/* Luminous Bulb */}
            <mesh position={[0, 0.1, 0]}>
              <sphereGeometry args={[0.06, 12, 12]} />
              <meshBasicMaterial color="#FEF08A" />
            </mesh>
            {/* Uplight Beam illuminating the Statue */}
            <pointLight color="#F59E0B" intensity={hovered ? 2.2 : 1.4} distance={6} position={[0, 0.3, 0]} />
          </group>
        );
      })}

      {/* Commemorative Inscription Plaque (Facing Default Entrance at z = 2.02) */}
      <group position={[0, -1.35, 2.02]} rotation={[-0.2, 0, 0]}>
        {/* Plaque Baseplate */}
        <mesh position={[0, 0, 0]} material={plaqueBrassMaterial}>
          <boxGeometry args={[1.85, 0.58, 0.05]} />
        </mesh>
        <mesh position={[0, 0, 0.026]}>
          <boxGeometry args={[1.75, 0.48, 0.02]} />
          <meshStandardMaterial color="#1A0D08" roughness={0.8} />
        </mesh>
        {/* Plaque Title */}
        <Text
          position={[0, 0.12, 0.04]}
          fontSize={0.095}
          color="#FDE047"
          anchorX="center"
          anchorY="middle"
        >
          STATUE OF UNITY
        </Text>
        <Text
          position={[0, -0.02, 0.04]}
          fontSize={0.068}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
        >
          Sardar Vallabhbhai Patel (1875 - 1950)
        </Text>
        <Text
          position={[0, -0.14, 0.04]}
          fontSize={0.05}
          color="#D97706"
          anchorX="center"
          anchorY="middle"
        >
          182 Metres • World's Tallest Monument • Ekta Nagar
        </Text>
      </group>

      {/* --- 3. THE STATUE OF UNITY SCULPTURE (ROTATING HERO MONUMENT) --- */}
      <group
        ref={groupRef}
        position={[0, 0, 0]}
        onClick={onInspect}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {modelScene ? (
          <primitive object={modelScene} />
        ) : (
          <group>
            {/* --- FEET & SANDALS (TRADITIONAL INDIAN CHAPPALS) --- */}
        {/* Left Sandal Sole */}
        <mesh position={[-0.32, -0.86, 0.06]} material={antiqueBronzeMaterial}>
          <boxGeometry args={[0.26, 0.05, 0.55]} />
        </mesh>
        {/* Left Foot */}
        <mesh position={[-0.32, -0.81, 0.05]} material={goldMaterial}>
          <boxGeometry args={[0.22, 0.08, 0.46]} />
        </mesh>
        {/* Left Sandal Toe Strap */}
        <mesh position={[-0.32, -0.77, 0.14]} rotation={[0.5, 0, 0]} material={goldLeafAccentMaterial}>
          <cylinderGeometry args={[0.018, 0.018, 0.16, 8]} />
        </mesh>

        {/* Right Sandal Sole */}
        <mesh position={[0.32, -0.86, 0.06]} material={antiqueBronzeMaterial}>
          <boxGeometry args={[0.26, 0.05, 0.55]} />
        </mesh>
        {/* Right Foot */}
        <mesh position={[0.32, -0.81, 0.05]} material={goldMaterial}>
          <boxGeometry args={[0.22, 0.08, 0.46]} />
        </mesh>
        {/* Right Sandal Toe Strap */}
        <mesh position={[0.32, -0.77, 0.14]} rotation={[0.5, 0, 0]} material={goldLeafAccentMaterial}>
          <cylinderGeometry args={[0.018, 0.018, 0.16, 8]} />
        </mesh>

        {/* --- LOWER BODY: DHOTI (PLEATED INDIAN ROBES) --- */}
        {/* Left Leg in Dhoti */}
        <mesh position={[-0.32, 0.05, 0]} rotation={[0, 0, 0.02]} material={goldMaterial}>
          <cylinderGeometry args={[0.27, 0.35, 1.7, 24]} />
        </mesh>
        {/* Right Leg in Dhoti */}
        <mesh position={[0.32, 0.05, 0]} rotation={[0, 0, -0.02]} material={goldMaterial}>
          <cylinderGeometry args={[0.27, 0.35, 1.7, 24]} />
        </mesh>
        {/* Dhoti Ankle Hems */}
        <mesh position={[-0.32, -0.76, 0]} rotation={[Math.PI / 2, 0, 0]} material={goldLeafAccentMaterial}>
          <torusGeometry args={[0.31, 0.035, 12, 32]} />
        </mesh>
        <mesh position={[0.32, -0.76, 0]} rotation={[Math.PI / 2, 0, 0]} material={goldLeafAccentMaterial}>
          <torusGeometry args={[0.31, 0.035, 12, 32]} />
        </mesh>

        {/* Central Cascading Dhoti Pleats (Signature Gujarati fold) */}
        <mesh position={[0, 0.04, 0.22]} rotation={[0.02, 0, 0]} material={goldMaterial}>
          <boxGeometry args={[0.24, 1.62, 0.14]} />
        </mesh>
        {/* Vertical Fluted Crease Ribs */}
        {[-0.08, 0, 0.08].map((ox, i) => (
          <mesh key={i} position={[ox, 0.04, 0.3]} rotation={[0.02, 0, 0]} material={goldLeafAccentMaterial}>
            <cylinderGeometry args={[0.018, 0.018, 1.58, 8]} />
          </mesh>
        ))}

        {/* --- UPPER BODY: KURTA TUNIC & WAIST --- */}
        {/* Lower Kurta Skirt (Draping over upper dhoti) */}
        <mesh position={[0, 0.65, 0]} material={goldMaterial}>
          <cylinderGeometry args={[0.62, 0.72, 0.62, 24]} />
        </mesh>
        {/* Kurta Lower Border Accent */}
        <mesh position={[0, 0.36, 0]} rotation={[Math.PI / 2, 0, 0]} material={goldLeafAccentMaterial}>
          <torusGeometry args={[0.69, 0.025, 12, 32]} />
        </mesh>

        {/* Main Chest Torso */}
        <mesh position={[0, 1.45, 0]} material={goldMaterial}>
          <cylinderGeometry args={[0.76, 0.62, 1.05, 24]} />
        </mesh>

        {/* Kurta Front Button Placket (Bandh-gala) */}
        <mesh position={[0, 1.5, 0.38]} material={goldLeafAccentMaterial}>
          <boxGeometry args={[0.08, 0.92, 0.03]} />
        </mesh>
        {/* Placket Buttons */}
        {[1.2, 1.38, 1.56, 1.74].map((by, i) => (
          <mesh key={i} position={[0, by, 0.4]}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshStandardMaterial color="#FEF08A" metalness={0.95} roughness={0.1} />
          </mesh>
        ))}

        {/* --- THE ICONIC SARDAR PATEL SHAWL (CHADDAR) --- */}
        {/* Back Mantle connecting both shoulders */}
        <mesh position={[0, 1.76, -0.06]} rotation={[0, 0, 0]} material={goldMaterial}>
          <cylinderGeometry args={[0.82, 0.78, 0.65, 20, 1, false, Math.PI / 2, Math.PI]} />
        </mesh>

        {/* Left Shoulder Shawl Drape (Vertical sash down front-left) */}
        <group position={[-0.46, 1.36, 0.34]} rotation={[0, 0, -0.04]}>
          {/* Main Fold Body */}
          <mesh position={[0, 0, 0]} material={goldMaterial}>
            <boxGeometry args={[0.26, 1.28, 0.1]} />
          </mesh>
          {/* Golden Brocade Border Trim */}
          <mesh position={[0.12, 0, 0.04]} material={goldLeafAccentMaterial}>
            <boxGeometry args={[0.03, 1.28, 0.05]} />
          </mesh>
          <mesh position={[-0.12, 0, 0.04]} material={goldLeafAccentMaterial}>
            <boxGeometry args={[0.03, 1.28, 0.05]} />
          </mesh>
          {/* Bottom Fringe */}
          <mesh position={[0, -0.63, 0.02]} material={antiqueBronzeMaterial}>
            <boxGeometry args={[0.26, 0.04, 0.06]} />
          </mesh>
        </group>

        {/* Right Shoulder Shawl Drape (Vertical sash down front-right) */}
        <group position={[0.46, 1.36, 0.34]} rotation={[0, 0, 0.04]}>
          {/* Main Fold Body */}
          <mesh position={[0, 0, 0]} material={goldMaterial}>
            <boxGeometry args={[0.26, 1.28, 0.1]} />
          </mesh>
          {/* Golden Brocade Border Trim */}
          <mesh position={[-0.12, 0, 0.04]} material={goldLeafAccentMaterial}>
            <boxGeometry args={[0.03, 1.28, 0.05]} />
          </mesh>
          <mesh position={[0.12, 0, 0.04]} material={goldLeafAccentMaterial}>
            <boxGeometry args={[0.03, 1.28, 0.05]} />
          </mesh>
          {/* Bottom Fringe */}
          <mesh position={[0, -0.63, 0.02]} material={antiqueBronzeMaterial}>
            <boxGeometry args={[0.26, 0.04, 0.06]} />
          </mesh>
        </group>

        {/* --- ARMS & RESOLUTE HANDS --- */}
        {/* Left Arm */}
        <group position={[-0.78, 1.48, 0]}>
          {/* Upper Arm Sleeve */}
          <mesh position={[0, 0.08, 0]} rotation={[0, 0, -0.12]} material={goldMaterial}>
            <cylinderGeometry args={[0.18, 0.16, 0.65, 16]} />
          </mesh>
          {/* Forearm */}
          <mesh position={[0.04, -0.48, 0.04]} rotation={[0.08, 0, -0.06]} material={goldMaterial}>
            <cylinderGeometry args={[0.15, 0.13, 0.62, 16]} />
          </mesh>
          {/* Hand at side (Resolute fist / palm) */}
          <mesh position={[0.06, -0.85, 0.06]} material={goldMaterial}>
            <boxGeometry args={[0.13, 0.18, 0.13]} />
          </mesh>
        </group>

        {/* Right Arm */}
        <group position={[0.78, 1.48, 0]}>
          {/* Upper Arm Sleeve */}
          <mesh position={[0, 0.08, 0]} rotation={[0, 0, 0.12]} material={goldMaterial}>
            <cylinderGeometry args={[0.18, 0.16, 0.65, 16]} />
          </mesh>
          {/* Forearm */}
          <mesh position={[-0.04, -0.48, 0.04]} rotation={[0.08, 0, 0.06]} material={goldMaterial}>
            <cylinderGeometry args={[0.15, 0.13, 0.62, 16]} />
          </mesh>
          {/* Hand at side */}
          <mesh position={[-0.06, -0.85, 0.06]} material={goldMaterial}>
            <boxGeometry args={[0.13, 0.18, 0.13]} />
          </mesh>
        </group>

        {/* --- NECK & SARDAR PATEL SCULPTED HEAD --- */}
        {/* Bandh-gala Raised High Collar */}
        <mesh position={[0, 2.05, 0.04]} material={goldLeafAccentMaterial}>
          <cylinderGeometry args={[0.26, 0.28, 0.16, 20]} />
        </mesh>
        {/* Neck */}
        <mesh position={[0, 2.18, 0.04]} material={goldMaterial}>
          <cylinderGeometry args={[0.21, 0.23, 0.18, 20]} />
        </mesh>

        {/* Head / Cranium */}
        <group position={[0, 2.52, 0.06]}>
          {/* Main Skull */}
          <mesh position={[0, 0.08, 0]} material={goldMaterial}>
            <sphereGeometry args={[0.34, 28, 24]} />
          </mesh>
          {/* Resolute Jaw & Chin */}
          <mesh position={[0, -0.14, 0.12]} rotation={[0.25, 0, 0]} material={goldMaterial}>
            <cylinderGeometry args={[0.18, 0.26, 0.24, 16]} />
          </mesh>
          {/* Cheekbones */}
          <mesh position={[-0.2, -0.02, 0.12]} material={goldMaterial}>
            <sphereGeometry args={[0.12, 12, 12]} />
          </mesh>
          <mesh position={[0.2, -0.02, 0.12]} material={goldMaterial}>
            <sphereGeometry args={[0.12, 12, 12]} />
          </mesh>
          {/* Nose Bridge */}
          <mesh position={[0, 0.02, 0.33]} rotation={[-0.2, 0, 0]} material={goldMaterial}>
            <coneGeometry args={[0.048, 0.16, 12]} />
          </mesh>
          {/* Eyebrow Ridge */}
          <mesh position={[0, 0.12, 0.28]} material={goldMaterial}>
            <boxGeometry args={[0.28, 0.04, 0.08]} />
          </mesh>
          {/* Classic Slicked-Back Combed Hair (Receding hairline of Sardar Patel) */}
          <mesh position={[0, 0.15, -0.04]} rotation={[0.1, 0, 0]} material={antiqueBronzeMaterial}>
            <sphereGeometry args={[0.345, 24, 16, 0, Math.PI * 2, 0, Math.PI / 1.7]} />
          </mesh>
          {/* Left Ear */}
          <mesh position={[-0.34, 0.02, 0.04]} rotation={[0, 0.2, 0]} material={goldMaterial}>
            <cylinderGeometry args={[0.06, 0.04, 0.12, 8]} />
          </mesh>
          {/* Right Ear */}
          <mesh position={[0.34, 0.02, 0.04]} rotation={[0, -0.2, 0]} material={goldMaterial}>
            <cylinderGeometry args={[0.06, 0.04, 0.12, 8]} />
          </mesh>
        </group>
      </group>
    )}
      </group>
    </group>
  );
};

// 3. Fluid Camera Controller Rig with Frame-by-Frame Damping
const CameraRig: React.FC<{
  targetCamPos: THREE.Vector3;
  targetLookAt: THREE.Vector3;
  controlsRef: React.RefObject<any>;
  isAnimating: boolean;
  onAnimationDone: () => void;
}> = ({ targetCamPos, targetLookAt, controlsRef, isAnimating, onAnimationDone }) => {
  const { camera } = useThree();

  useFrame((_, delta) => {
    if (!isAnimating) return;

    // Frame-rate independent smooth exponential damping
    const smoothDamp = 1.0 - Math.exp(-5.0 * Math.min(delta, 0.1));
    camera.position.lerp(targetCamPos, smoothDamp);

    if (controlsRef.current) {
      controlsRef.current.target.lerp(targetLookAt, smoothDamp);
      controlsRef.current.update();
    }

    // When camera is close enough, transition completes seamlessly
    if (camera.position.distanceTo(targetCamPos) < 0.05) {
      camera.position.copy(targetCamPos);
      if (controlsRef.current) {
        controlsRef.current.target.copy(targetLookAt);
        controlsRef.current.update();
      }
      onAnimationDone();
    }
  });

  return null;
};

// 4. Diwali Sacred Aarti Diya Ring
const SacredAartiDiyaRing: React.FC<{ isAartiMode: boolean }> = ({ isAartiMode }) => {
  const diyaCount = 20;
  const radius = 9.8;
  const flamesRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!flamesRef.current || !isAartiMode) return;
    const t = clock.elapsedTime;
    flamesRef.current.children.forEach((child, i) => {
      const flicker = 1.0 + Math.sin(t * 8 + i * 1.7) * 0.16 + Math.cos(t * 13 + i * 2.3) * 0.1;
      child.scale.set(flicker, flicker * 1.15, flicker);
    });
  });

  if (!isAartiMode) return null;

  return (
    <group ref={flamesRef} position={[0, -1.93, 0]}>
      {[...Array(diyaCount)].map((_, i) => {
        const angle = (i / diyaCount) * Math.PI * 2;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;
        return (
          <group key={i} position={[x, 0, z]}>
            {/* Clay Earthen Lamp Diya */}
            <mesh position={[0, 0.04, 0]}>
              <cylinderGeometry args={[0.16, 0.09, 0.08, 16]} />
              <meshStandardMaterial color="#78350F" roughness={0.9} />
            </mesh>
            {/* Golden Ghee Pool */}
            <mesh position={[0, 0.081, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <circleGeometry args={[0.12, 16]} />
              <meshStandardMaterial color="#CA8A04" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Sacred Flame Teardrop */}
            <mesh position={[0, 0.16, 0]}>
              <coneGeometry args={[0.06, 0.18, 12]} />
              <meshBasicMaterial color="#F59E0B" />
            </mesh>
            {/* Warm Diya Light Glow (every alternate diya) */}
            {i % 2 === 0 && (
              <pointLight position={[0, 0.35, 0]} color="#F59E0B" intensity={1.1} distance={4.5} />
            )}
          </group>
        );
      })}
    </group>
  );
};

// 5. Floating Sacred Temple Golden Embers
const FloatingAartiEmbers: React.FC<{ isAartiMode: boolean }> = ({ isAartiMode }) => {
  const count = 36;
  const particles = useMemo(() => {
    return [...Array(count)].map((_, i) => ({
      angle: (i / count) * Math.PI * 2,
      radius: 4.5 + Math.random() * 7.5,
      speed: 0.35 + Math.random() * 0.5,
      yOffset: Math.random() * 5.5,
      size: 0.025 + Math.random() * 0.035,
    }));
  }, [count]);

  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current || !isAartiMode) return;
    const t = clock.elapsedTime;
    groupRef.current.children.forEach((child, i) => {
      const p = particles[i];
      const y = ((t * p.speed + p.yOffset) % 6) - 1.5;
      const curAngle = p.angle + t * 0.07;
      child.position.set(Math.sin(curAngle) * p.radius, y, Math.cos(curAngle) * p.radius);
    });
  });

  if (!isAartiMode) return null;

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <mesh key={i} position={[0, -10, 0]}>
          <sphereGeometry args={[p.size, 8, 8]} />
          <meshBasicMaterial color={i % 2 === 0 ? '#F59E0B' : '#EA580C'} transparent opacity={0.65} />
        </mesh>
      ))}
    </group>
  );
};

// 6. First-Person Walk Navigation Camera Controller (WASD / Eye-Level Mode)
const WalkCameraController: React.FC<{
  isWalkMode: boolean;
  walkMoveForward: number;
  walkTurn: number;
}> = ({ isWalkMode, walkMoveForward, walkTurn }) => {
  const { camera } = useThree();
  const headingRef = useRef(0);
  const currentPos = useRef(new THREE.Vector3(0, 1.6, 7.5));
  const smoothVelocity = useRef(0);
  const smoothTurn = useRef(0);

  // Initialize camera position when entering walk mode
  useEffect(() => {
    if (isWalkMode) {
      currentPos.current.set(0, 1.6, 7.5);
      headingRef.current = 0;
      smoothVelocity.current = 0;
      smoothTurn.current = 0;
    }
  }, [isWalkMode]);

  useFrame((_, delta) => {
    if (!isWalkMode) return;

    const clampedDelta = Math.min(delta, 0.1);
    const damp = 1.0 - Math.exp(-8.0 * clampedDelta);

    smoothTurn.current = THREE.MathUtils.lerp(smoothTurn.current, walkTurn, damp);
    smoothVelocity.current = THREE.MathUtils.lerp(smoothVelocity.current, walkMoveForward, damp);

    if (Math.abs(smoothTurn.current) > 0.001) {
      headingRef.current += smoothTurn.current * clampedDelta * 1.8;
    }

    if (Math.abs(smoothVelocity.current) > 0.001) {
      const speed = clampedDelta * 4.2 * smoothVelocity.current;
      const dx = Math.sin(headingRef.current) * speed;
      const dz = -Math.cos(headingRef.current) * speed;

      const nextX = currentPos.current.x + dx;
      const nextZ = currentPos.current.z + dz;
      const nextDist = Math.hypot(nextX, nextZ);

      // Keep within circular promenade bounds (between radius 3.2 and 11.2)
      if (nextDist >= 3.2 && nextDist <= 11.2) {
        currentPos.current.x = nextX;
        currentPos.current.z = nextZ;
      }
    }

    currentPos.current.y = 1.6;
    camera.position.copy(currentPos.current);

    const lookAtX = currentPos.current.x + Math.sin(headingRef.current) * 6;
    const lookAtZ = currentPos.current.z - Math.cos(headingRef.current) * 6;
    camera.lookAt(lookAtX, 1.55, lookAtZ);
  });

  return null;
};

// 7. Main 3D Heritage Scene Component
export const Heritage3DScene: React.FC<Heritage3DSceneProps> = ({
  objects,
  selectedObject,
  onSelectObject,
  selectedCategory,
  searchQuery,
  topHudCenter,
}) => {
  const controlsRef = useRef<any>(null);

  // Camera animation target vectors
  const [targetCamPos] = useState(() => new THREE.Vector3(0, 4.2, 16.5));
  const [targetLookAt] = useState(() => new THREE.Vector3(0, 0.4, 0));
  const [isCameraAnimating, setIsCameraAnimating] = useState(false);
  const [isHoveringObject, setIsHoveringObject] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);

  // Aarti Mode is permanently disabled per user request
  const isAartiMode = false;
  const [isWalkMode, setIsWalkMode] = useState(false);
  const [walkForward, setWalkForward] = useState(0);
  const [walkTurn, setWalkTurn] = useState(0);

  // 360 degree rotation: continuously moves when idle, halts immediately on object hover or selection
  const shouldAutoRotate = autoRotate && !isWalkMode && !isHoveringObject && !selectedObject && !isCameraAnimating;

  // Statue of Unity Focus & Commemorative State
  const [showStatueBadge, setShowStatueBadge] = useState(false);

  // Interactive Lighting Modes: 'twilight' (Temple Nocturne) | 'daylight' (Museum Natural) | 'uv_spectrum' (Forensic Ultraviolet)
  const [lightingMode, setLightingMode] = useState<'twilight' | 'daylight' | 'uv_spectrum'>('twilight');

  // Exploded Dissection Modal & Forensic Loupe Overlay states
  const [isExplodeModalOpen, setIsExplodeModalOpen] = useState(false);
  const [isMacroLoupeActive, setIsMacroLoupeActive] = useState(false);

  // Keyboard controls for first-person walk navigation (WASD / Arrows)
  useEffect(() => {
    if (!isWalkMode) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'w' || e.key === 'W' || e.key === 'ArrowUp') setWalkForward(1);
      if (e.key === 's' || e.key === 'S' || e.key === 'ArrowDown') setWalkForward(-1);
      if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') setWalkTurn(1);
      if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') setWalkTurn(-1);
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (['w', 'W', 's', 'S', 'ArrowUp', 'ArrowDown'].includes(e.key)) setWalkForward(0);
      if (['a', 'A', 'd', 'D', 'ArrowLeft', 'ArrowRight'].includes(e.key)) setWalkTurn(0);
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isWalkMode]);

  // Filter objects based on category and search query
  const displayedObjects = useMemo(() => {
    return objects.filter((obj) => {
      const matchesCategory = selectedCategory === 'all' || obj.category === selectedCategory;
      const matchesSearch =
        !searchQuery.trim() ||
        obj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        obj.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
        obj.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        obj.techniques.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        obj.materials.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [objects, selectedCategory, searchQuery]);

  // Arrange items in an unclustered 360-degree circular gallery rotunda
  const panelPositions = useMemo(() => {
    const count = displayedObjects.length;
    if (count === 0) return [];

    if (count === 1) {
      return [
        {
          obj: displayedObjects[0],
          position: [0, 0.6, -11.5] as [number, number, number],
          rotation: [0, 0, 0] as [number, number, number],
        },
      ];
    }

    // Panel width is 2.5 units. A slot width of 3.9 units ensures generous gap of 1.4 units (~1cm+ on screen)
    // Minimum radius 12.0 units guarantees panels never touch and never crowd the central showcase
    const panelSlotWidth = 3.9;
    const radius = Math.max(12.0, (count * panelSlotWidth) / (2 * Math.PI));

    return displayedObjects.map((obj, idx) => {
      // Offset by half a slot (0.5) so the entrance portal directly facing the default camera is open and unobstructed
      const angle = (idx + 0.5) * ((Math.PI * 2) / count);
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;
      const y = 0.6; // Uniform stately eye-level height (no jagged vertical clutter)
      // Facing inward towards the central courtyard at (0, 0, 0)
      const rotY = angle + Math.PI;

      return {
        obj,
        position: [x, y, z] as [number, number, number],
        rotation: [0, rotY, 0] as [number, number, number],
      };
    });
  }, [displayedObjects]);

  // Smooth camera navigation function
  const triggerCameraGlide = useCallback(
    (camX: number, camY: number, camZ: number, lookX = 0, lookY = 0.4, lookZ = 0) => {
      targetCamPos.set(camX, camY, camZ);
      targetLookAt.set(lookX, lookY, lookZ);
      setIsCameraAnimating(true);
    },
    [targetCamPos, targetLookAt]
  );

  const handleFocusStatueOfUnity = useCallback(() => {
    if (isWalkMode) setIsWalkMode(false);
    triggerCameraGlide(0, 1.8, 6.2, 0, 1.2, 0);
    setShowStatueBadge(true);
  }, [isWalkMode, triggerCameraGlide]);

  // Respond smoothly when category changes: glide smoothly to the first item in the selected category
  useEffect(() => {
    if (selectedCategory === 'all') {
      triggerCameraGlide(0, 4.2, 16.5, 0, 0.4, 0);
    } else {
      const firstInCategory = panelPositions.find((p) => p.obj.category === selectedCategory);
      if (firstInCategory) {
        const [px, py, pz] = firstInCategory.position;
        const dist = Math.hypot(px, pz) || 1;
        const camDist = Math.max(2.5, dist - 5.0);
        const camX = (px / dist) * camDist;
        const camZ = (pz / dist) * camDist;
        triggerCameraGlide(camX, py + 0.35, camZ, px, py, pz);
      } else {
        triggerCameraGlide(0, 4.2, 16.5, 0, 0.4, 0);
      }
    }
  }, [selectedCategory, panelPositions, triggerCameraGlide]);

  // Respond smoothly when an object is selected: position camera directly in front of the inward-facing panel
  useEffect(() => {
    if (!selectedObject) return;
    setShowStatueBadge(false);
    const match = panelPositions.find((p) => p.obj.id === selectedObject.id);
    if (match) {
      const [px, py, pz] = match.position;
      const dist = Math.hypot(px, pz) || 1;
      const camDist = Math.max(2.5, dist - 4.4); // 4.4 units directly facing the artwork
      const camX = (px / dist) * camDist;
      const camZ = (pz / dist) * camDist;
      triggerCameraGlide(camX, py + 0.15, camZ, px, py + 0.05, pz);
    }
  }, [selectedObject, panelPositions, triggerCameraGlide]);

  // Smooth return & resume auto-rotation when an object is deselected (e.g. drawer closed or Esc pressed)
  const prevSelectedRef = useRef<HeritageObject | null>(selectedObject);
  useEffect(() => {
    if (prevSelectedRef.current && !selectedObject) {
      // Just deselected: smoothly glide camera back to overview and resume rotation
      triggerCameraGlide(0, 4.2, 16.5, 0, 0.4, 0);
      setAutoRotate(true);
    }
    prevSelectedRef.current = selectedObject;
  }, [selectedObject, triggerCameraGlide]);

  // Global Escape key listener to return to the 3D moving museum
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedObject) {
          onSelectObject(null);
        }
        if (isWalkMode) {
          setIsWalkMode(false);
        }
        setShowStatueBadge(false);
        triggerCameraGlide(0, 4.2, 16.5, 0, 0.4, 0);
        setAutoRotate(true);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [selectedObject, isWalkMode, onSelectObject, triggerCameraGlide]);

  // Quick navigation helpers
  const handleNextObject = () => {
    setShowStatueBadge(false);
    if (displayedObjects.length === 0) return;
    const currentIdx = selectedObject
      ? displayedObjects.findIndex((o) => o.id === selectedObject.id)
      : -1;
    const nextIdx = (currentIdx + 1) % displayedObjects.length;
    onSelectObject(displayedObjects[nextIdx]);
  };

  const handlePrevObject = () => {
    setShowStatueBadge(false);
    if (displayedObjects.length === 0) return;
    const currentIdx = selectedObject
      ? displayedObjects.findIndex((o) => o.id === selectedObject.id)
      : 0;
    const prevIdx = (currentIdx - 1 + displayedObjects.length) % displayedObjects.length;
    onSelectObject(displayedObjects[prevIdx]);
  };

  const handleResetCamera = () => {
    setShowStatueBadge(false);
    triggerCameraGlide(0, 4.2, 16.5, 0, 0.4, 0);
  };

  const handleZoom = (inward: boolean) => {
    if (!controlsRef.current) return;
    const cam = controlsRef.current.object;
    const factor = inward ? 0.8 : 1.25;
    cam.position.multiplyScalar(factor);
    controlsRef.current.update();
  };

  return (
    <div
      className="w-full h-full relative transition-colors duration-700 select-none overflow-hidden bg-gradient-to-b from-[#08080A] via-[#0D0D12] to-[#08080A]"
    >
      {/* Three.js R3F Canvas */}
      <Canvas
        camera={{ position: [0, 4.2, 16.5], fov: 46 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
      >
        {/* Dynamic Multi-Mode Lighting: Daylight | Temple Twilight | Forensic UV Spectrum */}
        {lightingMode === 'daylight' && (
          <>
            <ambientLight intensity={1.1} color="#F8FAFC" />
            <directionalLight position={[6, 16, 6]} intensity={2.2} color="#FFFFFF" />
            <pointLight position={[0, 6, 0]} intensity={1.4} color="#F59E0B" distance={30} />
            <pointLight position={[0, 6, -9]} intensity={0.9} color="#E2E8F0" distance={20} />
            <pointLight position={[0, 6, 9]} intensity={0.9} color="#E2E8F0" distance={20} />
            <pointLight position={[9, 6, 0]} intensity={0.9} color="#E2E8F0" distance={20} />
            <pointLight position={[-9, 6, 0]} intensity={0.9} color="#E2E8F0" distance={20} />
          </>
        )}

        {lightingMode === 'twilight' && (
          <>
            <ambientLight intensity={0.65} color="#FFF2DE" />
            <directionalLight position={[0, 14, 0]} intensity={1.2} color="#FFE8B2" />
            <pointLight position={[0, 5, 0]} intensity={2.2} color="#FF7A00" distance={28} />
            <pointLight position={[0, 5, -9]} intensity={1.1} color="#FFA033" distance={20} />
            <pointLight position={[0, 5, 9]} intensity={1.1} color="#FFA033" distance={20} />
            <pointLight position={[9, 5, 0]} intensity={1.0} color="#FF7A00" distance={20} />
            <pointLight position={[-9, 5, 0]} intensity={1.0} color="#FF7A00" distance={20} />
          </>
        )}

        {lightingMode === 'uv_spectrum' && (
          <>
            <ambientLight intensity={0.4} color="#3B0764" />
            <directionalLight position={[0, 14, 0]} intensity={1.0} color="#818CF8" />
            <pointLight position={[0, 5, 0]} intensity={3.8} color="#C084FC" distance={30} />
            <pointLight position={[0, 5, -9]} intensity={1.6} color="#6366F1" distance={20} />
            <pointLight position={[0, 5, 9]} intensity={1.6} color="#6366F1" distance={20} />
            <pointLight position={[9, 5, 0]} intensity={1.6} color="#818CF8" distance={20} />
            <pointLight position={[-9, 5, 0]} intensity={1.6} color="#818CF8" distance={20} />
          </>
        )}

        {/* Traditional Indian Architectural Colonnade & Jali Lattice Screens */}
        <JaliArchitecture3D radius={17.5} count={16} pillarHeight={7.5} />

        {/* First-Person Eye-Level Walk Controller */}
        <WalkCameraController
          isWalkMode={isWalkMode}
          walkMoveForward={walkForward}
          walkTurn={walkTurn}
        />

        {/* Royal Obsidian Architectural Floor Promenade with Specular Reflections */}
        <group position={[0, -1.95, 0]}>
          {/* Main Outer Obsidian Plaza (Real-Time MeshReflector Reflections) */}
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[22, 64]} />
            <MeshReflectorMaterial
              blur={[300, 100]}
              resolution={512}
              mixBlur={1}
              mixStrength={35}
              roughness={0.28}
              depthScale={1.2}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.4}
              color="#08080A"
              metalness={0.8}
              mirror={0.65}
            />
          </mesh>
          {/* Circular Exhibition Walkway under Panels */}
          <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[10.2, 14.5, 80]} />
            <meshStandardMaterial color="#0E0E14" roughness={0.35} metalness={0.7} />
          </mesh>
          {/* Inner Brass Guide Inlay Ring */}
          <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[10.15, 10.25, 80]} />
            <meshStandardMaterial color="#FF7A00" metalness={0.95} roughness={0.15} />
          </mesh>
          {/* Outer Brass Guide Inlay Ring */}
          <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[14.42, 14.52, 80]} />
            <meshStandardMaterial color="#FF7A00" metalness={0.95} roughness={0.15} />
          </mesh>
          {/* Center Amber Gold Inlay Under Panel Plinths */}
          <mesh position={[0, 0.012, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[12.16, 12.24, 96]} />
            <meshStandardMaterial color="#FFA033" metalness={0.9} roughness={0.18} />
          </mesh>
        </group>

        {/* Dedicated Golden Key Spotlight focused on the Statue of Unity */}
        <spotLight
          position={[0, 9, 3.5]}
          intensity={3.6}
          color="#FFF0C2"
          angle={Math.PI / 5}
          penumbra={0.55}
          distance={24}
        />

        {/* Central Hero Monument: The Statue of Unity (Sardar Vallabhbhai Patel) */}
        <StatueOfUnityModel
          onInspect={handleFocusStatueOfUnity}
          isAartiMode={isAartiMode}
        />

        {/* GPU-Accelerated Exhibition Panels */}
        {panelPositions.map(({ obj, position, rotation }) => (
          <ExhibitionPanel
            key={obj.id}
            object={obj}
            position={position}
            rotation={rotation}
            isSelected={selectedObject?.id === obj.id}
            onSelect={() => onSelectObject(obj)}
            onHoverChange={setIsHoveringObject}
          />
        ))}

        {/* Subtle Atmospheric Gold Dust Particles */}
        <group position={[0, 2, 0]}>
          {[...Array(20)].map((_, i) => (
            <mesh
              key={i}
              position={[
                Math.sin(i * 1.7) * 12,
                Math.cos(i * 2.3) * 3 + 1,
                Math.cos(i * 1.4) * 10,
              ]}
            >
              <sphereGeometry args={[0.025, 8, 8]} />
              <meshBasicMaterial color="#FDE68A" transparent opacity={0.35} />
            </mesh>
          ))}
        </group>

        {/* Smooth Camera Rig Controller */}
        <CameraRig
          targetCamPos={targetCamPos}
          targetLookAt={targetLookAt}
          controlsRef={controlsRef}
          isAnimating={isCameraAnimating}
          onAnimationDone={() => setIsCameraAnimating(false)}
        />

        {/* High-Performance OrbitControls (active when not in eye-level walk mode) */}
        <OrbitControls
          ref={controlsRef}
          enabled={!isWalkMode && !isCameraAnimating}
          enableDamping
          dampingFactor={0.05}
          rotateSpeed={0.65}
          maxPolarAngle={Math.PI / 2 - 0.04}
          minPolarAngle={Math.PI / 8}
          minDistance={3}
          maxDistance={28}
          target={[0, 0.4, 0]}
          autoRotate={shouldAutoRotate}
          autoRotateSpeed={0.65}
        />
      </Canvas>

      {/* UNIFIED TOP HUD: Single Coordinated Flex Header (Guaranteed Zero Overlap Across Viewports) */}
      <header className="absolute top-4 left-4 right-4 z-20 pointer-events-none flex items-center justify-between gap-2 overflow-hidden">
        {/* 1. Left: 360° Sanctum Info Capsule */}
        <div className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#121216]/90 backdrop-blur-md border border-white/10 shadow-2xl shrink-0">
          <Compass className="w-3.5 h-3.5 text-terracotta" />
          <span className="text-xs font-mono text-white/90 font-medium hidden xl:inline">360° Sanctum</span>
        </div>

        {/* 2. Center: Curated Lenses & Search HUD (Passed from ExplorePage) */}
        {topHudCenter && (
          <div className="pointer-events-auto shrink-0">
            {topHudCenter}
          </div>
        )}

        {/* 3. Right: Floating Camera Controls HUD (Royal Obsidian & Temple Gold) */}
        <div className="pointer-events-auto flex items-center gap-1 bg-[#121216]/95 backdrop-blur-md p-1.5 rounded-xl border border-white/10 shadow-2xl shrink-0">
          {/* Statue of Unity Hero Focus Button */}
          <button
            onClick={handleFocusStatueOfUnity}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
              showStatueBadge
                ? 'bg-[#FF7A00] text-white shadow-[0_0_15px_rgba(255,122,0,0.4)]'
                : 'text-[#A19E95] hover:text-[#F5F3EF] hover:bg-white/5'
            }`}
            title="Focus 182m Golden Statue of Unity in 3D"
          >
            <Landmark className="w-3.5 h-3.5 text-[#FF7A00]" />
            <span className="hidden 2xl:inline">Statue</span>
          </button>

          {/* First-Person Eye-Level Walk Toggle */}
          <button
            onClick={() => {
              setIsWalkMode(!isWalkMode);
              if (autoRotate) setAutoRotate(false);
            }}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
              isWalkMode
                ? 'bg-[#FF7A00] text-white shadow-[0_0_15px_rgba(255,122,0,0.4)]'
                : 'text-[#A19E95] hover:text-[#F5F3EF] hover:bg-white/5'
            }`}
            title={isWalkMode ? 'Return to Orbit View' : 'Step Inside & Walk the Gallery'}
          >
            <Footprints className="w-3.5 h-3.5" />
            <span className="hidden 2xl:inline">{isWalkMode ? 'Orbit' : 'Walk'}</span>
          </button>

          {/* Auto-Tour Toggle */}
          <button
            onClick={() => {
              if (isWalkMode) setIsWalkMode(false);
              setAutoRotate(!autoRotate);
            }}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
              autoRotate
                ? 'bg-[#FF7A00] text-white shadow-[0_0_15px_rgba(255,122,0,0.4)]'
                : 'text-[#A19E95] hover:text-[#F5F3EF] hover:bg-white/5'
            }`}
            title={autoRotate ? 'Pause 360° Museum Tour' : 'Start 360° Museum Tour'}
          >
            {autoRotate ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="hidden 2xl:inline">{autoRotate ? 'Touring' : 'Tour'}</span>
          </button>

          <div className="w-[1px] h-4 bg-white/10 mx-0.5" />

          {/* 3D Exploded Technique Dissection Modal Toggle */}
          <button
            onClick={() => setIsExplodeModalOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium text-[#A19E95] hover:text-[#F5F3EF] hover:bg-white/5 transition-all"
            title="Layer-by-Layer Exploded Technique Dissection"
          >
            <Layers className="w-3.5 h-3.5 text-[#FF7A00]" />
            <span className="hidden xl:inline">Explode</span>
          </button>

          {/* Forensic Macro Loupe Toggle */}
          <button
            onClick={() => setIsMacroLoupeActive(!isMacroLoupeActive)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
              isMacroLoupeActive
                ? 'bg-[#FF7A00] text-white shadow-[0_0_15px_rgba(255,122,0,0.4)]'
                : 'text-[#A19E95] hover:text-[#F5F3EF] hover:bg-white/5'
            }`}
            title="8x Forensic Surface Loupe"
          >
            <Scan className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">Loupe</span>
          </button>

          {/* Multi-Mode Lighting Cycle Button */}
          <button
            onClick={() => {
              const modes: ('twilight' | 'daylight' | 'uv_spectrum')[] = ['twilight', 'daylight', 'uv_spectrum'];
              const nextMode = modes[(modes.indexOf(lightingMode) + 1) % modes.length];
              setLightingMode(nextMode);
            }}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium text-[#A19E95] hover:text-[#F5F3EF] hover:bg-white/5 transition-all"
            title={`Current Lighting: ${lightingMode}. Click to switch.`}
          >
            {lightingMode === 'twilight' && <Flame className="w-3.5 h-3.5 text-amber-500" />}
            {lightingMode === 'daylight' && <Sun className="w-3.5 h-3.5 text-yellow-400" />}
            {lightingMode === 'uv_spectrum' && <Atom className="w-3.5 h-3.5 text-purple-400" />}
            <span className="hidden xl:inline capitalize">
              {lightingMode === 'uv_spectrum' ? 'UV' : lightingMode}
            </span>
          </button>

          <div className="w-[1px] h-4 bg-white/10 mx-0.5" />

          {/* Zoom In */}
          <button
            onClick={() => handleZoom(true)}
            disabled={isWalkMode}
            className="p-1.5 rounded-lg text-[#A19E95] hover:text-[#F5F3EF] hover:bg-white/5 disabled:opacity-30 transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          {/* Zoom Out */}
          <button
            onClick={() => handleZoom(false)}
            disabled={isWalkMode}
            className="p-1.5 rounded-lg text-[#A19E95] hover:text-[#F5F3EF] hover:bg-white/5 disabled:opacity-30 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          {/* Reset Camera */}
          <button
            onClick={() => {
              if (isWalkMode) setIsWalkMode(false);
              handleResetCamera();
            }}
            className="p-1.5 rounded-lg text-[#A19E95] hover:text-[#F5F3EF] hover:bg-white/5 transition-colors"
            title="Reset Panoramic View"
          >
            <RotateCcw className="w-3.5 h-3.5 text-terracotta" />
          </button>
        </div>
      </header>

      {/* STATUE OF UNITY COMMEMORATIVE TRIBUTE BADGE */}
      {showStatueBadge && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-30 max-w-md w-[92%] sm:w-auto bg-surface/95 backdrop-blur-md p-4 rounded-lg border border-border shadow-2xl flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-md bg-paper border border-border flex items-center justify-center shrink-0">
              <Landmark className="w-5 h-5 text-terracotta" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-muted font-semibold">
                  National Monument · 182 Metres
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-sm bg-paper text-ink border border-border">
                  World's Tallest
                </span>
              </div>
              <h3 className="text-sm font-editorial font-bold text-ink">
                Statue of Unity · Sardar Vallabhbhai Patel
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                Sculpted in radiant 24K temple gold & antique Indian bronze at the museum sanctum. Symbol of national unity and living cultural integration.
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowStatueBadge(false)}
            className="p-1 rounded text-muted hover:text-ink hover:bg-paper transition-colors"
            title="Dismiss badge"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* BOTTOM RIGHT: Walk Navigation D-Pad for Mouse / Touch */}
      {isWalkMode && (
        <div className="absolute bottom-4 right-4 z-20 flex flex-col items-center gap-1 bg-surface/95 backdrop-blur-md p-2.5 rounded-lg border border-border shadow-card">
          <div className="text-[11px] font-mono text-muted mb-1">
            Walk promenade (WASD)
          </div>
          <button
            onPointerDown={() => setWalkForward(1)}
            onPointerUp={() => setWalkForward(0)}
            onPointerLeave={() => setWalkForward(0)}
            className="p-2 rounded bg-paper hover:bg-surface text-ink transition-colors border border-border"
            title="Step Forward (W / Up)"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-1.5">
            <button
              onPointerDown={() => setWalkTurn(1)}
              onPointerUp={() => setWalkTurn(0)}
              onPointerLeave={() => setWalkTurn(0)}
              className="p-2 rounded bg-paper hover:bg-surface text-ink transition-colors border border-border"
              title="Turn Left (A / Left)"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onPointerDown={() => setWalkForward(-1)}
              onPointerUp={() => setWalkForward(0)}
              onPointerLeave={() => setWalkForward(0)}
              className="p-2 rounded bg-paper hover:bg-surface text-ink transition-colors border border-border"
              title="Step Backward (S / Down)"
            >
              <ArrowDown className="w-4 h-4" />
            </button>
            <button
              onPointerDown={() => setWalkTurn(-1)}
              onPointerUp={() => setWalkTurn(0)}
              onPointerLeave={() => setWalkTurn(0)}
              className="p-2 rounded bg-paper hover:bg-surface text-ink transition-colors border border-border"
              title="Turn Right (D / Right)"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* BOTTOM CENTER: Quick Artefact Navigator Bar (Sleek Floating Glass Capsule) */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-[#121216]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 shadow-2xl">
        <button
          onClick={handlePrevObject}
          className="p-1 rounded-full text-[#A19E95] hover:text-white hover:bg-white/10 transition-colors"
          title="Previous Artefact"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          onClick={() => {
            if (selectedObject) onSelectObject(selectedObject);
            else if (displayedObjects.length > 0) onSelectObject(displayedObjects[0]);
          }}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-terracotta hover:bg-terracotta-hover text-white text-xs font-medium transition-colors shadow-sm"
        >
          <Eye className="w-3.5 h-3.5 text-white" />
          <span className="max-w-[180px] truncate">
            {selectedObject ? selectedObject.name : 'Inspect Object'}
          </span>
        </button>

        <button
          onClick={handleNextObject}
          className="p-1 rounded-full text-[#A19E95] hover:text-white hover:bg-white/10 transition-colors"
          title="Next Artefact"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        <div className="w-[1px] h-3.5 bg-white/15 mx-0.5" />

        {/* Quick Dissection Action */}
        <button
          onClick={() => setIsExplodeModalOpen(true)}
          className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-mono text-[#FFE8B2] hover:text-white hover:bg-white/10 transition-colors"
          title="Dissect Technique Layers"
        >
          <Layers className="w-3 h-3 text-[#FF7A00]" />
          <span className="hidden sm:inline">Dissect</span>
        </button>

        {/* Quick Loupe Action */}
        <button
          onClick={() => setIsMacroLoupeActive(!isMacroLoupeActive)}
          className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-mono transition-colors ${
            isMacroLoupeActive
              ? 'bg-[#FF7A00] text-white shadow-[0_0_10px_rgba(255,122,0,0.4)]'
              : 'text-[#A19E95] hover:text-white hover:bg-white/10'
          }`}
          title="Forensic Loupe"
        >
          <Scan className="w-3 h-3" />
          <span className="hidden sm:inline">Loupe</span>
        </button>
      </div>

      {/* 3D Exploded Technique Dissection Modal */}
      <ExplodedDissectionModal
        isOpen={isExplodeModalOpen}
        onClose={() => setIsExplodeModalOpen(false)}
        craftSlug={selectedObject?.id || (displayedObjects[0]?.id ?? 'bidriware')}
        craftName={selectedObject?.name || (displayedObjects[0]?.name ?? 'Bidriware Silver Inlay')}
      />

      {/* Forensic Macro Magnifier Loupe Overlay */}
      <MacroMagnifierOverlay
        isActive={isMacroLoupeActive}
        onToggle={() => setIsMacroLoupeActive(!isMacroLoupeActive)}
        selectedObject={selectedObject || (displayedObjects.length > 0 ? displayedObjects[0] : null)}
      />
    </div>
  );
};
