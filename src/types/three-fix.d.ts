// src/types/three-fix.d.ts
// Type definitions for Three.js and related libraries

// Simple direct declaration for three - most important fix
declare module 'three';
declare module 'three/examples/jsm/*';
declare module 'three/addons/*';
declare module 'three/build/three.module';

// Fix for GSAP with ScrollTrigger
declare module 'gsap/ScrollTrigger' {
    export const ScrollTrigger: any;
    export default ScrollTrigger;
}

// Fix for Three.js extensions
declare module 'three/examples/jsm/controls/OrbitControls' {
    import { Camera, EventDispatcher } from 'three';
    export class OrbitControls extends EventDispatcher {
        constructor(camera: Camera, domElement?: HTMLElement);
        enabled: boolean;
        target: THREE.Vector3;
        update(): void;
        addEventListener(type: string, listener: (event: any) => void): void;
        removeEventListener(type: string, listener: (event: any) => void): void;
        dispose(): void;
    }
}

// Fix for stats.js
declare module 'stats.js' {
    export default class Stats {
        dom: HTMLDivElement;
        showPanel(panel: number): void;
        begin(): void;
        end(): void;
    }
}

// Fix for stats-gl
declare module 'stats-gl' {
    export default class StatsGL {
        constructor(options?: any);
        dom: HTMLDivElement;
        begin(): void;
        end(): void;
    }
}

// Fix for react-three-fiber types
declare namespace JSX {
    interface IntrinsicElements {
        effectComposer: any;
        renderPass: any;
        unrealBloomPass: any;
        meshPhongMaterial: any;
        meshStandardMaterial: any;
        primitive: any;
        shaderMaterial: any;
    }
}

// Global THREE namespace
declare namespace THREE {
    export interface Vector3 {
        x: number;
        y: number;
        z: number;
        set(x: number, y: number, z: number): Vector3;
    }

    export interface Object3D {
        position: Vector3;
        rotation: {x: number, y: number, z: number};
        scale: Vector3;
    }

    export interface AdditiveBlending {
        value: number;
    }
}

// Extend Window interface for custom global properties
interface Window {
    __THREE__?: any;
}