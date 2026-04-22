import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Suspense, useEffect, useMemo, useRef } from 'react';
import { Environment, Float, Lightformer } from '@react-three/drei';
import * as THREE from 'three';

const SNOISE_3D_GLSL = /* glsl */ `
vec3 snoise3_mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 snoise3_mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 snoise3_permute(vec4 x) { return snoise3_mod289(((x * 34.0) + 1.0) * x); }
vec4 snoise3_taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
float snoise3(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
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
    i = snoise3_mod289(i);
    vec4 p = snoise3_permute(snoise3_permute(snoise3_permute(
                 i.z + vec4(0.0, i1.z, i2.z, 1.0))
               + i.y + vec4(0.0, i1.y, i2.y, 1.0))
               + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 xN = x_ * ns.x + ns.yyyy;
    vec4 yN = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(xN) - abs(yN);
    vec4 b0 = vec4(xN.xy, yN.xy);
    vec4 b1 = vec4(xN.zw, yN.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = snoise3_taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.5 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

vec3 morphDisplace(vec3 p, float t, float seed, float strength) {
    float flowA = snoise3(p * 1.05 + vec3(seed * 0.85, t * 0.42, -t * 0.24));
    float flowB = snoise3(p.zyx * 2.15 + vec3(-seed * 0.65, t * 0.68, seed * 1.2)) * 0.32;
    float flowC = snoise3(p * 3.1 + vec3(t * 0.2, -t * 0.14, seed * 2.4)) * 0.18;
    float mercuryBreath = 0.78 + 0.22 * sin(t * 1.15 + seed * 11.0);
    return p + normalize(p) * (flowA + flowB + flowC) * strength * mercuryBreath;
}
`;

function Blob({
    rest,
    radius,
    seed,
    floatProps,
    cursorRef,
    reduceMotion,
    mergeDirection = 1,
    mergeCenterX = 0,
    mergeCenterY = 0,
    mergeSpan = 1,
    shape = 'capsule',
}) {
    const meshRef = useRef(null);
    const shaderRef = useRef(null);

    const restVec = useMemo(() => new THREE.Vector3(...rest), [rest]);
    const targetPosRef = useRef(new THREE.Vector3(...rest));
    const tmpRef = useRef(new THREE.Vector3());
    const baseRotation = useMemo(
        () => [
            Math.sin(seed * 12.7) * 0.7,
            Math.cos(seed * 8.9) * Math.PI,
            Math.sin(seed * 5.3 + 1.4) * 0.7,
        ],
        [seed]
    );

    const materialProps = useMemo(
        () => ({
            color: '#ececea',
            emissive: '#d8d8d4',
            emissiveIntensity: 0.02,
            metalness: 0.18,
            roughness: 0.12,
            clearcoat: 1.0,
            clearcoatRoughness: 0.04,
            envMapIntensity: 2.4,
            iridescence: 0.9,
            iridescenceIOR: 1.3,
            iridescenceThicknessRange: [160, 520],
            transmission: 0.97,
            thickness: 1.35,
            ior: 1.4,
            attenuationDistance: 0.45,
            attenuationColor: '#f0f0ee',
            transparent: true,
            opacity: 0.72,
            depthWrite: false,
        }),
        []
    );
    const shapeScale = shape === 'oval' ? [1.25, 0.78, 1] : [1, 1, 1];

    const baseStrength = 0.18;
    const maxStrength = 0.4;

    const handleBeforeCompile = (shader) => {
        shader.uniforms.u_time = { value: 0 };
        shader.uniforms.u_strength = { value: baseStrength };
        shader.uniforms.u_seed = { value: seed };
        shader.vertexShader = shader.vertexShader
            .replace(
                '#include <common>',
                `#include <common>
                uniform float u_time;
                uniform float u_strength;
                uniform float u_seed;
                ${SNOISE_3D_GLSL}
                `
            )
            .replace(
                '#include <beginnormal_vertex>',
                `
                float _eps = 0.001;
                vec3 _tangent1 = normalize(cross(normal, vec3(0.0, 1.0, 0.0) + vec3(0.001)));
                vec3 _tangent2 = normalize(cross(normal, _tangent1));
                vec3 _p0 = morphDisplace(position, u_time, u_seed, u_strength);
                vec3 _p1 = morphDisplace(position + _tangent1 * _eps, u_time, u_seed, u_strength);
                vec3 _p2 = morphDisplace(position + _tangent2 * _eps, u_time, u_seed, u_strength);
                vec3 objectNormal = normalize(cross(_p1 - _p0, _p2 - _p0));
                #ifdef USE_TANGENT
                    vec3 objectTangent = vec3(tangent.xyz);
                #endif
                `
            )
            .replace(
                '#include <begin_vertex>',
                `
                vec3 transformed = _p0;
                `
            );
        shaderRef.current = shader;
    };

    useFrame((state) => {
        if (reduceMotion) return;
        const t = state.clock.elapsedTime;

        let proximity = 0;
        const targetPos = targetPosRef.current;
        const tmp = tmpRef.current;
        if (cursorRef?.current?.active) {
            tmp.copy(cursorRef.current.world);
            const dist = tmp.distanceTo(restVec);
            const influence = 3.8;
            let k = Math.max(0, 1 - dist / influence);
            k = k * k * (3 - 2 * k);
            proximity = k;
            targetPos.copy(restVec).lerp(tmp, k * 0.7);
        } else {
            targetPos.copy(restVec);
        }

        const mergeCycle = 0.14 + (Math.sin(t * 0.82 + seed * 0.6) * 0.5 + 0.5) * 0.72;
        targetPos.x = mergeCenterX + (mergeDirection * mergeCycle * mergeSpan);
        targetPos.y = mergeCenterY + Math.cos(t * 0.65 + seed * 1.7) * 0.12;

        if (meshRef.current) {
            meshRef.current.position.lerp(targetPos, 0.12);
        }

        if (shaderRef.current) {
            shaderRef.current.uniforms.u_time.value = t;
            const loopPulse = Math.sin(t * 1.1 + seed * 11.0) * 0.03 + 0.05;
            shaderRef.current.uniforms.u_strength.value =
                baseStrength + loopPulse + (maxStrength - baseStrength) * proximity;
        }
    });

    return (
        <Float {...floatProps}>
            <mesh ref={meshRef} position={rest} rotation={baseRotation} scale={shapeScale}>
                {shape === 'sphere' ? (
                    <sphereGeometry args={[radius * 0.72, 44, 44]} />
                ) : (
                    <sphereGeometry args={[radius * 0.72, 44, 44]} />
                )}
                <meshPhysicalMaterial
                    {...materialProps}
                    onBeforeCompile={handleBeforeCompile}
                />
            </mesh>
        </Float>
    );
}

function CursorTracker({ cursorRef, reduceMotion }) {
    const { camera } = useThree();

    useEffect(() => {
        if (reduceMotion) return undefined;
        const dir = new THREE.Vector3();
        const ndc = new THREE.Vector3();

        const onMove = (e) => {
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = -(e.clientY / window.innerHeight) * 2 + 1;
            ndc.set(x, y, 0.5).unproject(camera);
            dir.copy(ndc).sub(camera.position).normalize();
            if (Math.abs(dir.z) < 1e-4) return;
            const tPlane = (0 - camera.position.z) / dir.z;
            cursorRef.current.world
                .copy(camera.position)
                .add(dir.multiplyScalar(tPlane));
            cursorRef.current.active = true;
        };
        const onLeave = () => {
            cursorRef.current.active = false;
        };

        window.addEventListener('pointermove', onMove, { passive: true });
        window.addEventListener('pointerleave', onLeave);
        window.addEventListener('blur', onLeave);
        return () => {
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerleave', onLeave);
            window.removeEventListener('blur', onLeave);
        };
    }, [camera, cursorRef, reduceMotion]);

    return null;
}

const BLOBS = [
    {
        id: 'patchLeftCircle',
        rest: [-10.25, 0, -0.2],
        radius: 0.72,
        seed: 1.83,
        mergeDirection: 2,
        mergeCenterX: -3.50,
        mergeCenterY: 1,
        mergeSpan: 0.18,
        shape: 'oval',
        floatProps: { speed: 0.7, rotationIntensity: 0.18, floatIntensity: 0.18 },
    },
    {
        id: 'patchRightCylinderA',
        rest: [10.25, 0.0, -0.2],
        radius: 0.88,
        seed: 3.16,
        mergeDirection: 2,
        mergeCenterX: 3.86,
        mergeCenterY: -1.5,
        mergeSpan: 0.5,
        shape: 'oval',
        floatProps: { speed: 0.72, rotationIntensity: 0.23, floatIntensity: 0.2 },
    },
];

function Scene({ reduceMotion }) {
    const cursorRef = useRef({ world: new THREE.Vector3(), active: false });

    return (
        <>
            <ambientLight intensity={0.65} color="#ffffff" />
            <directionalLight position={[5, 10, 5]} intensity={1.25} color="#ffffff" />

            <CursorTracker cursorRef={cursorRef} reduceMotion={reduceMotion} />

            {BLOBS.map((b) => (
                <Blob
                    key={b.id}
                    rest={b.rest}
                    radius={b.radius}
                    seed={b.seed}
                    floatProps={b.floatProps}
                    cursorRef={cursorRef}
                    reduceMotion={reduceMotion}
                    mergeDirection={b.mergeDirection}
                    mergeCenterX={b.mergeCenterX}
                    mergeCenterY={b.mergeCenterY}
                    mergeSpan={b.mergeSpan}
                    shape={b.shape}
                />
            ))}

            <Environment resolution={128} background={false} frames={1}>
                <Lightformer
                    form="rect"
                    intensity={5}
                    color="#f4f2f0"
                    position={[-5, 5, -5]}
                    scale={[10, 5]}
                />
                <Lightformer
                    form="rect"
                    intensity={4.5}
                    color="#d1d0cc"
                    position={[5, -5, 5]}
                    scale={[10, 5]}
                />
                <Lightformer
                    form="rect"
                    intensity={3.2}
                    color="#f5f5f2"
                    position={[0, 6, -3]}
                    scale={[7, 3.5]}
                />
                <Lightformer
                    form="circle"
                    intensity={8}
                    color="#ffffff"
                    position={[0, 5, -9]}
                    scale={8}
                />
            </Environment>
        </>
    );
}

export default function MorphingBlobs({ reduceMotion = false, className = '' }) {
    return (
        <div
            className={`pointer-events-none ${className}`}
            aria-hidden
            style={{ width: '100%', height: '100%' }}
        >
            <Canvas
                camera={{ position: [0, 0, 6], fov: 40 }}
                dpr={[1, 1.25]}
                frameloop={reduceMotion ? 'demand' : 'always'}
                gl={{
                    antialias: false,
                    alpha: true,
                    powerPreference: 'high-performance',
                    stencil: false,
                    depth: true,
                }}
                style={{ width: '100%', height: '100%' }}
            >
                <Suspense fallback={null}>
                    <Scene reduceMotion={reduceMotion} />
                </Suspense>
            </Canvas>
        </div>
    );
}
