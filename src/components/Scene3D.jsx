import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Environment, Float, Sparkles, Lightformer } from '@react-three/drei';
import * as THREE from 'three';

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
                color="#080808"
                emissive="#000000"
                roughness={0.15}
                metalness={1.0}
                clearcoat={1.0}
                clearcoatRoughness={0.1}
                envMapIntensity={2.5}
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
            <pointLight ref={light1Ref} color="#ffebc2" intensity={15} distance={12} decay={2} />
            <pointLight ref={light2Ref} color="#a69477" intensity={10} distance={12} decay={2} />
        </>
    );
}

export default function Scene3D({ style, className }) {
    return (
        <div style={{ width: '100%', height: '100%', ...style }} className={className}>
            <Canvas
                camera={{ position: [0, 0, 5.5], fov: 45 }}
                dpr={[1, 1.5]}
                gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
            >
                <ambientLight intensity={0.5} color="#ffffff" />
                <directionalLight position={[5, 10, 5]} intensity={1.5} color="#ffffff" />
                
                <OrbitingLights />

                <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                    <SculpturalObject />
                </Float>
                
                <Sparkles count={80} scale={12} size={1.5} speed={0.4} opacity={0.3} color="#ffe8cc" />

                <Environment resolution={256} background={false}>
                    <Lightformer form="rect" intensity={5} color="#ffebc2" position={[-5, 5, -5]} scale={[10, 5]} />
                    <Lightformer form="rect" intensity={5} color="#a0907a" position={[5, -5, 5]} scale={[10, 5]} />
                    <Lightformer form="circle" intensity={10} color="#ffffff" position={[0, 5, -9]} scale={10} />
                </Environment>
            </Canvas>
        </div>
    );
}
