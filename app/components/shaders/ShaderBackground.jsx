"use client";

import { OrbitControls, shaderMaterial } from "@react-three/drei";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import * as THREE from "three";
import { useRef, useState } from "react";
import './scene.css';

import PlanetMaterial from './PlanetMaterial';

const GlowMaterial = shaderMaterial(
  {
    u_color: new THREE.Color("#4060ff"),
    u_intensity: 0.8,
  },
  /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  /* glsl */ `
    uniform vec3 u_color;
    uniform float u_intensity;
    varying vec2 vUv;
    void main() {
      float dist = length(vUv - 0.5) * 2.0;
      float alpha = 1.0 - smoothstep(0.3, 1.0, dist);
      alpha = pow(alpha, 1.5) * u_intensity;
      gl_FragColor = vec4(u_color, alpha);
    }
  `
);

extend({ PlanetMaterial, GlowMaterial });

const modes = ["Ocean", "Nebula", "Aurora"];

const colorPresets = [
  {
    // Drift — current blue/cyan
    colorA: new THREE.Color("#124dd8"),
    colorB: new THREE.Color("#2bffe7"),
    cloudTint: new THREE.Color("#001741"),
    depthA: new THREE.Color("blue"),
    depthB: new THREE.Color("aqua"),
    fresnel: new THREE.Color("#FEB3D9"),
    glow: new THREE.Color("#4060ff"),
  },
  {
    // Nebula — light blue
    colorA: new THREE.Color("#0a3d6b"),
    colorB: new THREE.Color("#a8d8f0"),
    cloudTint: new THREE.Color("#021224"),
    depthA: new THREE.Color("#0b2e4f"),
    depthB: new THREE.Color("#7ec8e3"),
    fresnel: new THREE.Color("#d0efff"),
    glow: new THREE.Color("#4a9ece"),
  },
  {
    // Aurora — warm rose, brighter
    colorA: new THREE.Color("#d81b60"),
    colorB: new THREE.Color("#ff80ab"),
    cloudTint: new THREE.Color("#1a0510"),
    depthA: new THREE.Color("#ad1457"),
    depthB: new THREE.Color("#f8bbd0"),
    fresnel: new THREE.Color("#ffe0b2"),
    glow: new THREE.Color("#f06292"),
  },
];

const LERP_SPEED = 2.5;

const Glow = ({ glowRef }) => {
  return (
    <mesh>
      <planeGeometry args={[10, 10]} />
      <glowMaterial ref={glowRef} transparent depthWrite={false} />
    </mesh>
  );
};

const Planet = ({ mode }) => {
  const materialRef = useRef();
  const glowRef = useRef();
  const smoothMode = useRef(0);

  useFrame((state, delta) => {
    const mat = materialRef.current;
    const glow = glowRef.current;
    const target = colorPresets[mode];
    const t = 1 - Math.exp(-LERP_SPEED * delta);

    mat.u_time = state.clock.getElapsedTime();

    // Smoothly interpolate mode for movement blending
    smoothMode.current += (mode - smoothMode.current) * t;
    mat.u_mode = smoothMode.current;

    // Smoothly lerp all colors
    mat.u_colorA.lerp(target.colorA, t);
    mat.u_colorB.lerp(target.colorB, t);
    mat.u_cloudTint.lerp(target.cloudTint, t);
    mat.u_depthColorA.lerp(target.depthA, t);
    mat.u_depthColorB.lerp(target.depthB, t);
    mat.u_fresnelColor.lerp(target.fresnel, t);

    if (glow) {
      glow.u_color.lerp(target.glow, t);
    }
  });

  return (
    <group>
      <Glow glowRef={glowRef} />
      <mesh position={[0, 0, 0]} rotation={[0, Math.PI, 0]} scale={1.5}>
        <icosahedronGeometry args={[2, 11]} />
        <planetMaterial ref={materialRef} />
      </mesh>
    </group>
  );
};

const Scene = () => {
  const [active, setActive] = useState(0);

  return (
    <div className="scene-container">
      <Canvas camera={{ position: [0.0, 0.0, 8.0] }}>
        <Planet mode={active} />
        <OrbitControls />
      </Canvas>
      <div className="mode-buttons">
        {modes.map((name, i) => (
          <button
            key={name}
            onClick={() => setActive(i)}
            className={`mode-btn ${active === i ? "active" : ""}`}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Scene;
