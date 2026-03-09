import { useRef, useMemo, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

interface PlanetData {
  name: string;
  radius: number;
  distance: number;
  color: string;
  orbitSpeed: number;
  hasRing?: boolean;
  facts: {
    diameter: string;
    distanceFromSun: string;
    orbitalPeriod: string;
    surfaceTemp: string;
    moons: string;
    funFact: string;
  };
}

const PLANETS: PlanetData[] = [
  {
    name: "Mercury",
    radius: 0.35,
    distance: 6,
    color: "#8C7853",
    orbitSpeed: 0.048,
    facts: {
      diameter: "4,879 km",
      distanceFromSun: "57.9M km",
      orbitalPeriod: "88 days",
      surfaceTemp: "-173 to 427\u00B0C",
      moons: "0",
      funFact: "Mercury has no atmosphere and its surface is covered in craters like our Moon!",
    },
  },
  {
    name: "Venus",
    radius: 0.8,
    distance: 9,
    color: "#FFC649",
    orbitSpeed: 0.035,
    facts: {
      diameter: "12,104 km",
      distanceFromSun: "108.2M km",
      orbitalPeriod: "225 days",
      surfaceTemp: "462\u00B0C",
      moons: "0",
      funFact: "A day on Venus is longer than its year! It also rotates backwards.",
    },
  },
  {
    name: "Earth",
    radius: 0.85,
    distance: 12.5,
    color: "#4A90E2",
    orbitSpeed: 0.03,
    facts: {
      diameter: "12,742 km",
      distanceFromSun: "149.6M km",
      orbitalPeriod: "365.25 days",
      surfaceTemp: "-88 to 58\u00B0C",
      moons: "1",
      funFact: "Earth is the only known planet with life. 71% of its surface is water!",
    },
  },
  {
    name: "Mars",
    radius: 0.45,
    distance: 16,
    color: "#E27B58",
    orbitSpeed: 0.024,
    facts: {
      diameter: "6,779 km",
      distanceFromSun: "227.9M km",
      orbitalPeriod: "687 days",
      surfaceTemp: "-87 to -5\u00B0C",
      moons: "2",
      funFact: "Mars has the largest volcano in the solar system - Olympus Mons, 3x taller than Mt. Everest!",
    },
  },
  {
    name: "Jupiter",
    radius: 2.2,
    distance: 22,
    color: "#C88B3A",
    orbitSpeed: 0.013,
    facts: {
      diameter: "139,820 km",
      distanceFromSun: "778.5M km",
      orbitalPeriod: "12 years",
      surfaceTemp: "-108\u00B0C",
      moons: "95+",
      funFact: "Jupiter's Great Red Spot is a storm larger than Earth that has raged for 400+ years!",
    },
  },
  {
    name: "Saturn",
    radius: 1.8,
    distance: 30,
    color: "#FAD5A5",
    orbitSpeed: 0.009,
    hasRing: true,
    facts: {
      diameter: "116,460 km",
      distanceFromSun: "1.4B km",
      orbitalPeriod: "29 years",
      surfaceTemp: "-138\u00B0C",
      moons: "146+",
      funFact: "Saturn is so light it could float in water! Its rings are billions of ice chunks.",
    },
  },
  {
    name: "Uranus",
    radius: 1.3,
    distance: 38,
    color: "#4FD0E7",
    orbitSpeed: 0.006,
    facts: {
      diameter: "50,724 km",
      distanceFromSun: "2.9B km",
      orbitalPeriod: "84 years",
      surfaceTemp: "-195\u00B0C",
      moons: "27+",
      funFact: "Uranus rotates on its side - likely knocked over by a massive collision!",
    },
  },
  {
    name: "Neptune",
    radius: 1.2,
    distance: 45,
    color: "#5B5DDF",
    orbitSpeed: 0.004,
    facts: {
      diameter: "49,244 km",
      distanceFromSun: "4.5B km",
      orbitalPeriod: "165 years",
      surfaceTemp: "-200\u00B0C",
      moons: "14+",
      funFact: "Neptune has the strongest winds in the solar system - 2,100 km/h, faster than sound!",
    },
  },
];

function OrbitRing({ distance }: { distance: number }) {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 128; i++) {
      const angle = (i / 128) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(angle) * distance, 0, Math.sin(angle) * distance));
    }
    return pts;
  }, [distance]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return geo;
  }, [points]);

  return (
    <line geometry={geometry}>
      <lineBasicMaterial color="#ffffff" opacity={0.08} transparent />
    </line>
  );
}

function Planet({
  data,
  onClick,
  isSelected,
}: {
  data: PlanetData;
  onClick: (d: PlanetData) => void;
  isSelected: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const angleRef = useRef(Math.random() * Math.PI * 2);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    angleRef.current += data.orbitSpeed * delta * 60;
    const x = Math.cos(angleRef.current) * data.distance;
    const z = Math.sin(angleRef.current) * data.distance;
    meshRef.current.position.x = x;
    meshRef.current.position.z = z;
    meshRef.current.rotation.y += delta * 0.5;

    if (ringRef.current) {
      ringRef.current.position.x = x;
      ringRef.current.position.z = z;
    }
  });

  return (
    <group>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onClick(data);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto";
        }}
      >
        <sphereGeometry args={[data.radius, 32, 32]} />
        <meshStandardMaterial
          color={data.color}
          emissive={isSelected ? data.color : "#000000"}
          emissiveIntensity={isSelected ? 0.4 : 0}
        />
      </mesh>
      {data.hasRing && (
        <mesh ref={ringRef} rotation={[Math.PI / 2.5, 0, 0]}>
          <ringGeometry args={[data.radius * 1.4, data.radius * 2.2, 64]} />
          <meshBasicMaterial
            color={data.color}
            side={THREE.DoubleSide}
            transparent
            opacity={0.4}
          />
        </mesh>
      )}
    </group>
  );
}

function Sun() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshBasicMaterial color="#FDB813" />
      </mesh>
      <mesh>
        <sphereGeometry args={[3, 32, 32]} />
        <meshBasicMaterial color="#FDB813" transparent opacity={0.15} />
      </mesh>
      <pointLight position={[0, 0, 0]} intensity={2} distance={120} color="#FDB813" />
    </group>
  );
}

function Scene({
  onPlanetClick,
  selectedPlanet,
}: {
  onPlanetClick: (p: PlanetData) => void;
  selectedPlanet: PlanetData | null;
}) {
  return (
    <>
      <OrbitControls
        enablePan
        enableZoom
        enableRotate
        minDistance={8}
        maxDistance={80}
        zoomSpeed={0.6}
        rotateSpeed={0.5}
      />
      <ambientLight intensity={0.15} />
      <Stars radius={100} depth={60} count={3000} factor={3} saturation={0} fade speed={0.5} />
      <Sun />
      {PLANETS.map((p) => (
        <OrbitRing key={`orbit-${p.name}`} distance={p.distance} />
      ))}
      {PLANETS.map((p) => (
        <Planet
          key={p.name}
          data={p}
          onClick={onPlanetClick}
          isSelected={selectedPlanet?.name === p.name}
        />
      ))}
    </>
  );
}

function InfoPanel({ planet, onClose }: { planet: PlanetData; onClose: () => void }) {
  return (
    <div
      className="absolute top-3 right-3 w-64 sm:w-72 rounded-md p-4 z-20 text-white text-sm"
      style={{
        backgroundColor: "rgba(0,0,0,0.92)",
        border: `2px solid ${planet.color}`,
        backdropFilter: "blur(8px)",
      }}
      data-testid={`panel-planet-${planet.name.toLowerCase()}`}
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xl font-bold" style={{ color: planet.color }}>
          {planet.name}
        </h3>
        <button
          onClick={onClose}
          className="text-white/70 text-lg leading-none px-1"
          aria-label="Close planet info"
          data-testid="button-close-planet-info"
        >
          x
        </button>
      </div>
      <div className="space-y-1.5 text-xs leading-relaxed">
        <InfoRow label="Diameter" value={planet.facts.diameter} />
        <InfoRow label="From Sun" value={planet.facts.distanceFromSun} />
        <InfoRow label="Orbit" value={planet.facts.orbitalPeriod} />
        <InfoRow label="Temp" value={planet.facts.surfaceTemp} />
        <InfoRow label="Moons" value={planet.facts.moons} />
      </div>
      <div
        className="mt-3 p-2 rounded text-xs"
        style={{
          backgroundColor: "rgba(255,255,255,0.08)",
          borderLeft: `3px solid ${planet.color}`,
        }}
      >
        <p className="font-bold opacity-60 mb-0.5">DID YOU KNOW?</p>
        <p>{planet.facts.funFact}</p>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="opacity-60 font-semibold">{label}:</span> {value}
    </div>
  );
}

export function SolarSystemGame() {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    setWebglSupported(hasWebGL());
  }, []);

  if (!webglSupported) {
    return (
      <div
        className="relative w-full rounded-md flex flex-col items-center justify-center text-center p-8"
        style={{ height: 450, backgroundColor: "#050510" }}
        data-testid="solar-system-game"
      >
        <div className="text-4xl mb-4">&#127758;</div>
        <p className="text-white/70 text-sm mb-2 font-medium">
          3D Solar System Explorer
        </p>
        <p className="text-white/40 text-xs max-w-sm">
          This interactive 3D experience requires a browser with WebGL support.
          Open this site in Chrome, Firefox, Safari, or Edge to explore the solar system in 3D!
        </p>
      </div>
    );
  }

  return (
    <div
      className="relative w-full rounded-md overflow-hidden"
      style={{ height: 450, backgroundColor: "#050510" }}
      data-testid="solar-system-game"
    >
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-full text-white/40 text-sm">
            Loading 3D Solar System...
          </div>
        }
      >
        <Canvas
          camera={{ position: [0, 25, 40], fov: 50 }}
          style={{ width: "100%", height: "100%" }}
          onPointerMissed={() => setSelectedPlanet(null)}
        >
          <Scene
            onPlanetClick={(p) =>
              setSelectedPlanet(selectedPlanet?.name === p.name ? null : p)
            }
            selectedPlanet={selectedPlanet}
          />
        </Canvas>
      </Suspense>

      {selectedPlanet && (
        <InfoPanel planet={selectedPlanet} onClose={() => setSelectedPlanet(null)} />
      )}

      <div className="absolute bottom-3 left-3 text-white/40 text-xs pointer-events-none">
        Drag to rotate | Scroll to zoom | Click planets for info
      </div>
    </div>
  );
}
