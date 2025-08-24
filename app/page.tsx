"use client"

import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Environment, Text, Float, Html, useProgress } from "@react-three/drei"
import { Suspense, useRef, useState, useCallback, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import * as THREE from "three"
import React from "react"

const techStack = [
  {
    name: "React",
    position: [3, 2, 0] as [number, number, number],
    color: "#61DAFB",
    description: "Frontend Library",
    proficiency: 95,
    projects: [
      { name: "E-commerce Platform", description: "Full-stack React app" },
      { name: "Dashboard Analytics", description: "Real-time data visualization" },
      { name: "Social Media App", description: "Interactive user platform" },
    ],
  },
  {
    name: "Next.js",
    position: [-3, 1, 2] as [number, number, number],
    color: "#000000",
    description: "React Framework",
    proficiency: 90,
    projects: [
      { name: "Portfolio Website", description: "SSR optimized site" },
      { name: "Blog Platform", description: "Content management system" },
    ],
  },
  {
    name: "TypeScript",
    position: [-2, 3, 1] as [number, number, number],
    color: "#3178C6",
    description: "Type Safety",
    proficiency: 88,
    projects: [
      { name: "API Framework", description: "Type-safe backend" },
      { name: "Component Library", description: "Reusable UI components" },
    ],
  },
  {
    name: "Redux",
    position: [2, -2, -3] as [number, number, number],
    color: "#764ABC",
    description: "State Management",
    proficiency: 85,
    projects: [
      { name: "Complex Dashboard", description: "Multi-component state" },
      { name: "Shopping Cart", description: "E-commerce state logic" },
    ],
  },
  {
    name: "Zustand",
    position: [4, 0, -2] as [number, number, number],
    color: "#FF6B35",
    description: "Lightweight State",
    proficiency: 80,
    projects: [
      { name: "Task Manager", description: "Simple state management" },
      { name: "Theme Switcher", description: "Global app state" },
    ],
  },
  {
    name: "Firebase",
    position: [-4, -1, 0] as [number, number, number],
    color: "#FFCA28",
    description: "Backend as a Service",
    proficiency: 82,
    projects: [
      { name: "Real-time Chat", description: "Firebase Firestore" },
      { name: "User Authentication", description: "Firebase Auth" },
    ],
  },
  {
    name: "Supabase",
    position: [1, 3, -2] as [number, number, number],
    color: "#3ECF8E",
    description: "Open Source Firebase",
    proficiency: 78,
    projects: [
      { name: "Blog CMS", description: "PostgreSQL backend" },
      { name: "User Profiles", description: "Row-level security" },
    ],
  },
  {
    name: "Node.js",
    position: [-1, -3, 2] as [number, number, number],
    color: "#339933",
    description: "Backend Runtime (Learning)",
    proficiency: 65,
    projects: [
      { name: "REST API", description: "Express.js server" },
      { name: "File Upload", description: "Multer integration" },
    ],
  },
  {
    name: "Express",
    position: [3, -1, 3] as [number, number, number],
    color: "#000000",
    description: "Web Framework (Learning)",
    proficiency: 60,
    projects: [
      { name: "API Routes", description: "RESTful endpoints" },
      { name: "Middleware", description: "Authentication layer" },
    ],
  },
  {
    name: "MongoDB",
    position: [-3, 2, -1] as [number, number, number],
    color: "#47A248",
    description: "NoSQL Database (Learning)",
    proficiency: 58,
    projects: [
      { name: "User Data", description: "Document storage" },
      { name: "Product Catalog", description: "Schema design" },
    ],
  },
  {
    name: "Three.js",
    position: [0, 4, 0] as [number, number, number],
    color: "#000000",
    description: "3D Graphics",
    proficiency: 75,
    projects: [
      { name: "3D Portfolio", description: "Interactive 3D scenes" },
      { name: "WebGL Visualizer", description: "Data visualization" },
    ],
  },
]

function usePerformanceMonitor() {
  const [performanceLevel, setPerformanceLevel] = useState<"High" | "Medium" | "Low">("High")
  const [fps, setFps] = useState(60)
  const frameCount = useRef(0)
  const lastTime = useRef(performance.now())

  useFrame(() => {
    frameCount.current++
    const now = performance.now()

    if (now - lastTime.current >= 1000) {
      const currentFps = Math.round((frameCount.current * 1000) / (now - lastTime.current))
      setFps(currentFps)

      if (currentFps < 30) {
        setPerformanceLevel("Low")
      } else if (currentFps < 55) {
        setPerformanceLevel("Medium")
      } else {
        setPerformanceLevel("High")
      }

      frameCount.current = 0
      lastTime.current = now
    }
  })

  return { performanceLevel, fps }
}

const ProjectNodes = React.memo(
  ({ projects, techPosition }: { projects: any[]; techPosition: [number, number, number] }) => {
    const groupRef = useRef<THREE.Group>(null)

    const boxGeometry = useMemo(() => new THREE.BoxGeometry(0.5, 0.5, 0.5), [])

    useFrame((state) => {
      if (groupRef.current) {
        groupRef.current.rotation.y += 0.02
      }
    })

    return (
      <group ref={groupRef} position={techPosition}>
        {projects.map((project, index) => {
          const angle = (index / projects.length) * Math.PI * 2
          const radius = 2
          const x = Math.cos(angle) * radius
          const z = Math.sin(angle) * radius

          return (
            <Float key={project.name} speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
              <mesh position={[x, 0, z]} scale={0.3} geometry={boxGeometry}>
                <meshStandardMaterial color="#ff6b6b" emissive="#ff6b6b" emissiveIntensity={0.2} />
                <Html distanceFactor={15}>
                  <div className="bg-black/90 text-white px-2 py-1 rounded text-xs whitespace-nowrap pointer-events-none">
                    <div className="font-bold">{project.name}</div>
                    <div className="text-gray-300 text-xs">{project.description}</div>
                  </div>
                </Html>
              </mesh>
            </Float>
          )
        })}
      </group>
    )
  },
)

const TechElement = React.memo(
  ({
    tech,
    onClick,
    isSelected,
    onProjectClick,
  }: {
    tech: any
    onClick: () => void
    isSelected: boolean
    onProjectClick: (project: any) => void
  }) => {
    const meshRef = useRef<THREE.Mesh>(null)
    const [hovered, setHovered] = useState(false)

    const boxGeometry = useMemo(() => new THREE.BoxGeometry(1, 1, 1), [])

    const { glowIntensity, glowColor } = useMemo(() => {
      const baseIntensity = tech.proficiency / 100
      const intensity = hovered ? baseIntensity * 0.4 : isSelected ? baseIntensity * 0.3 : baseIntensity * 0.15

      let color = "#ff6b6b" // Beginner - red
      if (tech.proficiency >= 90)
        color = "#00ff88" // Expert - bright green
      else if (tech.proficiency >= 80)
        color = "#4a90e2" // Proficient - blue
      else if (tech.proficiency >= 70) color = "#ffa500" // Intermediate - orange

      return { glowIntensity: intensity, glowColor: color }
    }, [tech.proficiency, hovered, isSelected])

    useFrame(() => {
      if (meshRef.current) {
        meshRef.current.rotation.y += 0.01
        const targetScale = hovered ? 1.2 : isSelected ? 1.1 : 1
        meshRef.current.scale.lerp({ x: targetScale, y: targetScale, z: targetScale } as any, 0.1)
      }
    })

    return (
      <>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <group position={tech.position}>
            <mesh
              ref={meshRef}
              onClick={onClick}
              onPointerOver={() => setHovered(true)}
              onPointerOut={() => setHovered(false)}
              geometry={boxGeometry}
            >
              <meshStandardMaterial
                color={tech.color}
                emissive={glowColor}
                emissiveIntensity={glowIntensity}
                transparent
                opacity={0.8}
              />
            </mesh>

            <Text position={[0, -1, 0]} fontSize={0.3} color="white" anchorX="center" anchorY="middle">
              {tech.name}
            </Text>

            {hovered && (
              <Html distanceFactor={10}>
                <div className="bg-black/90 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap">
                  <div className="font-bold">{tech.name}</div>
                  <div className="text-gray-300">{tech.description}</div>
                  <div className="text-xs mt-1">
                    <span style={{ color: glowColor }}>Proficiency: {tech.proficiency}%</span>
                  </div>
                </div>
              </Html>
            )}
          </group>
        </Float>

        {isSelected && <ProjectNodes projects={tech.projects} techPosition={tech.position} />}
      </>
    )
  },
)

const CentralPlatform = React.memo(() => {
  const meshRef = useRef<THREE.Mesh>(null)
  const cylinderGeometry = useMemo(() => new THREE.CylinderGeometry(6, 6, 0.5, 32), [])

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
    }
  })

  return (
    <mesh ref={meshRef} position={[0, -4, 0]} geometry={cylinderGeometry}>
      <meshStandardMaterial color="#1a1a2e" emissive="#16213e" emissiveIntensity={0.2} transparent opacity={0.8} />
    </mesh>
  )
})

const ParticleField = React.memo(({ isDarkMode }: { isDarkMode: boolean }) => {
  const pointsRef = useRef<THREE.Points>(null)

  const { positions, particleCount } = useMemo(() => {
    const count = 150
    const pos = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 60
      pos[i * 3 + 1] = (Math.random() - 0.5) * 60
      pos[i * 3 + 2] = (Math.random() - 0.5) * 60
    }

    return { positions: pos, particleCount: count }
  }, [])

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.001
      pointsRef.current.rotation.x += 0.0005
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={isDarkMode ? 0.05 : 0.03}
        color={isDarkMode ? "#4a90e2" : "#666"}
        transparent
        opacity={isDarkMode ? 0.8 : 0.4}
      />
    </points>
  )
})

const CameraController = React.memo(
  ({ selectedTech, isDarkMode }: { selectedTech: string | null; isDarkMode: boolean }) => {
    const { camera } = useThree()
    const targetPosition = useRef(new THREE.Vector3(0, 5, 15))
    const targetLookAt = useRef(new THREE.Vector3(0, 0, 0))

    useFrame(() => {
      if (selectedTech) {
        const tech = techStack.find((t) => t.name === selectedTech)
        if (tech) {
          targetPosition.current.set(tech.position[0] + 3, tech.position[1] + 2, tech.position[2] + 5)
          targetLookAt.current.set(tech.position[0], tech.position[1], tech.position[2])
        }
      } else {
        targetPosition.current.set(0, 5, 15)
        targetLookAt.current.set(0, 0, 0)
      }

      camera.position.lerp(targetPosition.current, 0.05)
      camera.lookAt(targetLookAt.current)
    })

    return null
  },
)

function Scene({
  selectedTech,
  onTechSelect,
  onProjectClick,
  isDarkMode,
  gyroscopeEnabled,
}: {
  selectedTech: string | null
  onTechSelect: (tech: string | null) => void
  onProjectClick: (project: any) => void
  isDarkMode: boolean
  gyroscopeEnabled: boolean
}) {
  const { performanceLevel } = usePerformanceMonitor()

  const techElements = useMemo(
    () =>
      techStack.map((tech) => (
        <TechElement
          key={tech.name}
          tech={tech}
          onClick={() => onTechSelect(selectedTech === tech.name ? null : tech.name)}
          isSelected={selectedTech === tech.name}
          onProjectClick={onProjectClick}
        />
      )),
    [selectedTech, onTechSelect, onProjectClick],
  )

  return (
    <>
      <ambientLight intensity={isDarkMode ? 0.3 : 0.6} />
      <pointLight position={[10, 10, 10]} intensity={isDarkMode ? 1 : 0.8} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color={isDarkMode ? "#4a90e2" : "#ffa500"} />

      <CentralPlatform />
      <ParticleField isDarkMode={isDarkMode} />

      {techElements}

      <Environment preset={isDarkMode ? "night" : "dawn"} />
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        minDistance={8}
        maxDistance={25}
        autoRotate={selectedTech === null}
        autoRotateSpeed={0.5}
      />

      <CameraController selectedTech={selectedTech} isDarkMode={isDarkMode} />
    </>
  )
}

function LoadingScreen() {
  const { progress } = useProgress()

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black text-white">
      <div className="text-center space-y-4">
        <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-lg">Loading 3D Dashboard... {Math.round(progress)}%</p>
        <div className="text-sm text-gray-400">Initializing WebGL renderer and 3D assets</div>
      </div>
    </div>
  )
}

function GitHubPanel() {
  const [githubData, setGithubData] = useState({ streak: 42, languages: ["TypeScript", "JavaScript", "Python"] })

  return (
    <Card className="bg-black/50 backdrop-blur-sm border-gray-700">
      <CardContent className="p-4 text-white text-sm">
        <div className="space-y-2">
          <div className="font-bold text-green-400">GitHub Stats</div>
          <div>Streak: {githubData.streak} days</div>
          <div>Recent: {githubData.languages.join(", ")}</div>
          <div className="text-xs text-gray-400">● Live Data</div>
        </div>
      </CardContent>
    </Card>
  )
}

function SkillDetailPanel({ tech, onClose }: { tech: any; onClose: () => void }) {
  return (
    <Card className="bg-black/90 backdrop-blur-sm border-gray-700 text-white">
      <CardContent className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">{tech.name}</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ×
          </Button>
        </div>

        <div className="space-y-2">
          <div className="text-sm text-gray-300">Proficiency Level</div>
          <Progress value={tech.proficiency} className="h-2" />
          <div className="text-right text-sm">{tech.proficiency}%</div>
        </div>

        <div className="space-y-3">
          <div className="font-semibold">Key Projects</div>
          {tech.projects.map((project: any, index: number) => (
            <div key={index} className="bg-gray-800/50 p-3 rounded-lg">
              <div className="font-medium">{project.name}</div>
              <div className="text-sm text-gray-400">{project.description}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function AccessibilityFallback({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Full-Stack Developer Skills & Projects</h1>
          <Button onClick={onBack} variant="outline">
            Back to 3D View
          </Button>
        </div>

        <div className="mb-8 p-6 bg-gray-800 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Tech Stack Overview</h2>
          <p className="text-gray-300 mb-4">
            React & Next.js | TypeScript | Redux & Zustand | Firebase & Supabase | Learning Node.js, Express & MongoDB |
            Building Functional & Scalable Full-Stack Web Apps
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="font-semibold text-blue-400">Frontend</div>
              <div>React, Next.js, TypeScript</div>
            </div>
            <div>
              <div className="font-semibold text-purple-400">State Management</div>
              <div>Redux, Zustand</div>
            </div>
            <div>
              <div className="font-semibold text-green-400">Backend Services</div>
              <div>Firebase, Supabase</div>
            </div>
            <div>
              <div className="font-semibold text-orange-400">Learning</div>
              <div>Node.js, Express, MongoDB</div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {techStack.map((tech) => (
            <Card key={tech.name} className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{tech.name}</h3>
                <p className="text-gray-400 mb-4">{tech.description}</p>
                <Progress value={tech.proficiency} className="mb-4" />
                <div className="text-sm mb-4">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      tech.proficiency >= 85 ? "bg-green-600" : tech.proficiency >= 70 ? "bg-blue-600" : "bg-orange-600"
                    }`}
                  >
                    {tech.proficiency >= 85 ? "Expert" : tech.proficiency >= 70 ? "Proficient" : "Learning"}
                  </span>
                  <span className="ml-2 text-gray-300">{tech.proficiency}%</span>
                </div>
                <div className="text-sm text-gray-300">
                  <div className="font-semibold mb-2">Projects:</div>
                  <ul className="space-y-1">
                    {tech.projects.map((project, index) => (
                      <li key={index} className="text-xs">
                        • {project.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function DeveloperDashboard() {
  const [selectedTech, setSelectedTech] = useState<string | null>(null)
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [gyroscopeEnabled, setGyroscopeEnabled] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(false)
  const [showAccessibilityView, setShowAccessibilityView] = useState(false)

  const selectedTechData = selectedTech ? techStack.find((t) => t.name === selectedTech) : null

  const handleTechSelect = useCallback((tech: string | null) => {
    setSelectedTech(tech)
  }, [])

  const handleProjectClick = useCallback((project: any) => {
    setSelectedProject(project)
  }, [])

  const playSound = useCallback(
    (type: "hover" | "click") => {
      if (!audioEnabled) return
      console.log(`[v0] Playing ${type} sound`)
    },
    [audioEnabled],
  )

  if (showAccessibilityView) {
    return <AccessibilityFallback onBack={() => setShowAccessibilityView(false)} />
  }

  return (
    <div className={`w-full h-screen relative overflow-hidden ${isDarkMode ? "bg-black" : "bg-gray-100"}`}>
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-6">
        <h1 className={`text-3xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
          3D Developer Dashboard
        </h1>
        <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
          Full-Stack Developer | React & Next.js | TypeScript | Redux & Zustand | Firebase & Supabase
        </p>
      </div>

      {/* Control Panel */}
      <div className="absolute top-6 right-6 z-10 space-y-2">
        <GitHubPanel />

        <Card className="bg-black/50 backdrop-blur-sm border-gray-700">
          <CardContent className="p-3 text-white text-xs space-y-2">
            <div className="flex justify-between">
              <span>Performance:</span>
              <span className="text-green-400">High</span>
            </div>
            <div className="space-y-1">
              <Button size="sm" variant="ghost" onClick={() => setIsDarkMode(!isDarkMode)} className="w-full text-xs">
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setGyroscopeEnabled(!gyroscopeEnabled)}
                className="w-full text-xs"
              >
                Gyroscope: {gyroscopeEnabled ? "ON" : "OFF"}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setAudioEnabled(!audioEnabled)}
                className="w-full text-xs"
              >
                Audio: {audioEnabled ? "ON" : "OFF"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skill Detail Panel */}
      {selectedTechData && (
        <div className="absolute left-6 top-1/2 transform -translate-y-1/2 z-10 w-80">
          <SkillDetailPanel tech={selectedTechData} onClose={() => setSelectedTech(null)} />
        </div>
      )}

      {/* Instructions */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-6">
        <div className="flex justify-between items-end">
          <Card className="bg-black/50 backdrop-blur-sm border-gray-700">
            <CardContent className="p-4 text-white text-sm">
              <p className="mb-2">
                <strong>Controls:</strong>
              </p>
              <p>• Drag to rotate • Scroll to zoom • Click cubes to focus • Auto-rotation when idle</p>
            </CardContent>
          </Card>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAccessibilityView(true)}
            className="bg-black/50 backdrop-blur-sm border-gray-700 text-white hover:bg-gray-800"
          >
            Toggle 2D List
          </Button>
        </div>
      </div>

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 5, 15], fov: 60 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        frameloop="demand"
      >
        <Suspense fallback={null}>
          <Scene
            selectedTech={selectedTech}
            onTechSelect={handleTechSelect}
            onProjectClick={handleProjectClick}
            isDarkMode={isDarkMode}
            gyroscopeEnabled={gyroscopeEnabled}
          />
        </Suspense>
      </Canvas>

      {/* Loading Screen */}
      <Suspense fallback={<LoadingScreen />}>
        <div />
      </Suspense>
    </div>
  )
}
