import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { Environment, Float, Sparkles, Lightformer } from '@react-three/drei';
import * as THREE from 'three';

function useNoiseTexture() {
    return useMemo(() => {
        const size = 256;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        const imageData = ctx.createImageData(size, size);
        for (let i = 0; i < imageData.data.length; i += 4) {
            const n = 118 + (((i * 2654435761) >>> 0) % 92);
            imageData.data[i] = n;
            imageData.data[i + 1] = n;
            imageData.data[i + 2] = n;
            imageData.data[i + 3] = 255;
        }
        ctx.putImageData(imageData, 0, 0);
        const tex = new THREE.CanvasTexture(canvas);
        tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
        tex.repeat.set(3, 3);
        tex.anisotropy = 4;
        return tex;
    }, []);
}

function SculpturalObject() {
    const meshRef = useRef();

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        if (meshRef.current) {
            meshRef.current.rotation.y = t * 0.15;
            meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.2;
            meshRef.current.position.y = Math.sin(t * 0.5) * 0.1;
        }
    });

    return (
        <mesh ref={meshRef}>
            <torusKnotGeometry args={[1.2, 0.4, 128, 32, 2, 3]} />
            <meshPhysicalMaterial
                color="#b0aea8"
                emissive="#8a8884"
                emissiveIntensity={0.11}
                roughness={0.12}
                metalness={1.0}
                clearcoat={1.0}
                clearcoatRoughness={0.08}
                envMapIntensity={2.8}
            />
        </mesh>
    );
}

/** Softer void gate: sphere with grainy roughness map */
function VoidSphere() {
    const meshRef = useRef();
    const noiseTex = useNoiseTexture();

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        if (meshRef.current) {
            meshRef.current.rotation.y = t * 0.12;
            meshRef.current.rotation.x = Math.sin(t * 0.25) * 0.12;
            meshRef.current.position.y = Math.sin(t * 0.4) * 0.08;
        }
    });

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[1.15, 96, 96]} />
            <meshPhysicalMaterial
                color="#9e9c98"
                emissive="#c4c2be"
                emissiveIntensity={0.07}
                roughness={0.34}
                roughnessMap={noiseTex}
                bumpMap={noiseTex}
                bumpScale={0.04}
                metalness={0.95}
                clearcoat={0.9}
                clearcoatRoughness={0.28}
                envMapIntensity={2.6}
            />
        </mesh>
    );
}

function OrbitingLights() {
    const light1Ref = useRef();
    const light2Ref = useRef();

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        if (light1Ref.current) {
            light1Ref.current.position.set(
                Math.sin(t * 0.5) * 4,
                1 + Math.sin(t * 0.8) * 1.5,
                Math.cos(t * 0.5) * 4
            );
        }
        if (light2Ref.current) {
            light2Ref.current.position.set(
                Math.sin(t * 0.3 + Math.PI) * 4,
                -1 + Math.cos(t * 0.6),
                Math.cos(t * 0.3 + Math.PI) * 4
            );
        }
    });

    return (
        <>
            <pointLight ref={light1Ref} color="#f2efe8" intensity={14} distance={12} decay={2} />
            <pointLight ref={light2Ref} color="#d6d4d0" intensity={11} distance={12} decay={2} />
        </>
    );
}

export default function Scene3D({ style, className, variant = 'default' }) {
    const isVoid = variant === 'void';

    return (
        <div style={{ width: '100%', height: '100%', ...style }} className={className}>
            <Canvas
                camera={{ position: [0, 0, 5.5], fov: 45 }}
                dpr={[1, 1.5]}
                gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
            >
                <ambientLight intensity={0.62} color="#ebeae8" />
                <directionalLight position={[5, 10, 5]} intensity={1.65} color="#f7f6f4" />

                <OrbitingLights />

                <Float speed={isVoid ? 1.2 : 1.5} rotationIntensity={isVoid ? 0.35 : 0.5} floatIntensity={isVoid ? 0.4 : 0.5}>
                    {isVoid ? <VoidSphere /> : <SculpturalObject />}
                </Float>

                <Sparkles
                    count={isVoid ? 56 : 80}
                    scale={12}
                    size={isVoid ? 1.2 : 1.5}
                    speed={0.35}
                    opacity={isVoid ? 0.22 : 0.3}
                    color="#efeeec"
                />

                <Environment resolution={256} background={false}>
                    <Lightformer form="rect" intensity={5} color="#f4f2f0" position={[-5, 5, -5]} scale={[10, 5]} />
                    <Lightformer form="rect" intensity={5} color="#9d9b98" position={[5, -5, 5]} scale={[10, 5]} />
                    <Lightformer form="circle" intensity={12} color="#ffffff" position={[0, 5, -9]} scale={10} />
                </Environment>
            </Canvas>
        </div>
    );
}
