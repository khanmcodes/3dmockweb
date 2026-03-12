import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { useRef, useMemo, useEffect } from 'react';
import { Environment, Float } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

/* ── Custom Iridescent Shader Material ── */

const IridescentMaterial = {
    uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color('#0d0c0b') },
        uColor2: { value: new THREE.Color('#2a2520') },
        uColor3: { value: new THREE.Color('#4a3f35') },
        uFresnelPower: { value: 3.0 },
        uNoiseScale: { value: 2.5 },
        uMetalness: { value: 0.92 },
    },
    vertexShader: `
    varying vec3 vNormal;
    varying vec3 vViewDir;
    varying vec3 vWorldPos;
    varying vec2 vUv;
    
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vWorldPos = worldPos.xyz;
      vViewDir = normalize(cameraPosition - worldPos.xyz);
      gl_Position = projectionMatrix * viewMatrix * worldPos;
    }
  `,
    fragmentShader: `
    uniform float uTime;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    uniform float uFresnelPower;
    uniform float uNoiseScale;
    uniform float uMetalness;
    
    varying vec3 vNormal;
    varying vec3 vViewDir;
    varying vec3 vWorldPos;
    varying vec2 vUv;
    
    // Simplex-style noise for surface variation
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x * 34.0) + 10.0) * x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
    
    float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      i = mod289(i);
      vec4 p = permute(permute(permute(
        i.z + vec4(0.0, i1.z, i2.z, 1.0))
        + i.y + vec4(0.0, i1.y, i2.y, 1.0))
        + i.x + vec4(0.0, i1.x, i2.x, 1.0));
      float n_ = 0.142857142857;
      vec3 ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);
      vec4 x = x_ * ns.x + ns.yyyy;
      vec4 y = y_ * ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);
      vec4 s0 = floor(b0) * 2.0 + 1.0;
      vec4 s1 = floor(b1) * 2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
      p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
      vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 105.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
    }
    
    void main() {
      vec3 normal = normalize(vNormal);
      vec3 viewDir = normalize(vViewDir);
      
      // Fresnel effect — bright edges
      float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), uFresnelPower);
      
      // Animated noise for surface shimmer
      float noise = snoise(vWorldPos * uNoiseScale + uTime * 0.08) * 0.5 + 0.5;
      float noise2 = snoise(vWorldPos * uNoiseScale * 1.5 - uTime * 0.05) * 0.5 + 0.5;
      
      // Iridescent color shift based on view angle + noise
      float colorMix = fresnel * 0.6 + noise * 0.4;
      vec3 baseColor = mix(uColor1, uColor2, colorMix);
      baseColor = mix(baseColor, uColor3, fresnel * noise2 * 0.5);
      
      // Metallic reflections
      vec3 reflectDir = reflect(-viewDir, normal);
      float spec = pow(max(dot(reflectDir, vec3(0.3, 1.0, 0.5)), 0.0), 64.0);
      float spec2 = pow(max(dot(reflectDir, vec3(-0.5, 0.7, -0.3)), 0.0), 32.0);
      
      vec3 specColor = vec3(0.78, 0.75, 0.69); // warm metallic
      vec3 finalColor = baseColor + specColor * (spec * 0.6 + spec2 * 0.3) * uMetalness;
      
      // Fresnel edge glow
      finalColor += vec3(0.45, 0.40, 0.35) * fresnel * 0.35;
      
      // Subtle surface shimmer
      finalColor += vec3(noise2 * 0.03);
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `,
};

function SculpturalObject() {
    const meshRef = useRef();
    const materialRef = useRef();

    const geometry = useMemo(() => {
        return new THREE.TorusKnotGeometry(1.2, 0.35, 256, 48, 3, 5);
    }, []);

    const uniforms = useMemo(() => {
        return {
            uTime: { value: 0 },
            uColor1: { value: new THREE.Color('#0d0c0b') },
            uColor2: { value: new THREE.Color('#2a2520') },
            uColor3: { value: new THREE.Color('#4a3f35') },
            uFresnelPower: { value: 3.0 },
            uNoiseScale: { value: 2.5 },
            uMetalness: { value: 0.92 },
        };
    }, []);

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.0008;
            meshRef.current.rotation.x = Math.sin(t * 0.12) * 0.08;
            meshRef.current.position.y = Math.sin(t * 0.18) * 0.06;
        }
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = t;
        }
    });

    return (
        <mesh ref={meshRef} geometry={geometry} scale={1.0}>
            <shaderMaterial
                ref={materialRef}
                vertexShader={IridescentMaterial.vertexShader}
                fragmentShader={IridescentMaterial.fragmentShader}
                uniforms={uniforms}
            />
        </mesh>
    );
}

/* ── Orbiting accent lights ── */

function SweepLight() {
    const lightRef = useRef();

    useFrame((state) => {
        const t = state.clock.elapsedTime * 0.25;
        if (lightRef.current) {
            lightRef.current.position.x = Math.sin(t) * 4.5;
            lightRef.current.position.z = Math.cos(t) * 4.5;
            lightRef.current.position.y = 1.2 + Math.sin(t * 0.6) * 1.8;
        }
    });

    return (
        <pointLight
            ref={lightRef}
            color="#c8bfb0"
            intensity={50}
            distance={14}
            decay={2}
        />
    );
}

function AccentLight() {
    const ref = useRef();

    useFrame((state) => {
        const t = state.clock.elapsedTime * 0.18 + Math.PI;
        if (ref.current) {
            ref.current.position.x = Math.sin(t) * 3.5;
            ref.current.position.z = Math.cos(t) * 3.5;
            ref.current.position.y = -0.5 + Math.cos(t * 0.5) * 1.2;
        }
    });

    return (
        <pointLight
            ref={ref}
            color="#8a7e6e"
            intensity={25}
            distance={10}
            decay={2}
        />
    );
}

/* ── Floating particles ── */

function Particles() {
    const ref = useRef();
    const count = 80;

    const [positions, sizes] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const sz = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 10;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
            sz[i] = Math.random() * 0.015 + 0.005;
        }
        return [pos, sz];
    }, []);

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.y = state.clock.elapsedTime * 0.015;
            ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
        }
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-size"
                    count={count}
                    array={sizes}
                    itemSize={1}
                />
            </bufferGeometry>
            <pointsMaterial
                color="#6a6258"
                size={0.02}
                transparent
                opacity={0.4}
                sizeAttenuation
                depthWrite={false}
            />
        </points>
    );
}

/* ── Post-processing ── */

function Effects() {
    return (
        <EffectComposer>
            <Bloom
                intensity={0.4}
                luminanceThreshold={0.6}
                luminanceSmoothing={0.9}
                radius={0.8}
            />
            <Vignette
                offset={0.3}
                darkness={0.7}
                eskil={false}
            />
        </EffectComposer>
    );
}

/* ── Main Scene ── */

export default function Scene3D({ style, className }) {
    return (
        <div style={{ width: '100%', height: '100%', ...style }} className={className}>
            <Canvas
                camera={{ position: [0, 0, 4], fov: 45 }}
                dpr={[1, 1.5]}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: 'high-performance',
                    toneMapping: THREE.ACESFilmicToneMapping,
                    toneMappingExposure: 1.1,
                }}
                style={{ background: 'transparent' }}
            >
                <ambientLight intensity={0.1} color="#8a8680" />
                <directionalLight position={[3, 5, 2]} intensity={0.6} color="#e8e6e3" />
                <SweepLight />
                <AccentLight />
                <Float speed={0.8} rotationIntensity={0.05} floatIntensity={0.15}>
                    <SculpturalObject />
                </Float>
                <Particles />
                <fog attach="fog" args={['#0a0a0a', 5, 14]} />
                <Effects />
            </Canvas>
        </div>
    );
}
