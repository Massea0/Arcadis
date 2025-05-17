// src/types/three-imports.d.ts

declare module 'three' {
  // Core
  export class WebGLRenderer {
    constructor(parameters?: {alpha?: boolean; antialias?: boolean; canvas?: HTMLCanvasElement; precision?: string; premultipliedAlpha?: boolean; preserveDrawingBuffer?: boolean; powerPreference?: string; failIfMajorPerformanceCaveat?: boolean});
    setSize(width: number, height: number): void;
    setClearColor(color: number | string, alpha?: number): void;
    render(scene: Scene, camera: Camera): void;
    domElement: HTMLCanvasElement;
    dispose(): void;
  }

  export class Scene {
    constructor();
    add(object: Object3D): this;
    remove(object: Object3D): this;
  }

  export class PerspectiveCamera extends Camera {
    constructor(fov?: number, aspect?: number, near?: number, far?: number);
    aspect: number;
    updateProjectionMatrix(): void;
  }

  export class Camera extends Object3D {
    constructor();
  }

  export class Object3D {
    constructor();
    position: Vector3;
    rotation: Euler;
    scale: Vector3;
  }

  export class Points extends Object3D {
    constructor(geometry?: BufferGeometry, material?: Material);
    type: "Points";
    geometry: BufferGeometry;
    material: Material;
  }

  export class BufferGeometry {
    constructor();
    setAttribute(name: string, attribute: BufferAttribute): BufferGeometry;
    attributes: {
      position: BufferAttribute;
      [key: string]: BufferAttribute;
    };
    dispose(): void;
  }

  export class BufferAttribute {
    constructor(array: ArrayLike<number>, itemSize: number, normalized?: boolean);
    array: ArrayLike<number>;
    needsUpdate: boolean;
  }

  export class Material {
    constructor();
    dispose(): void;
  }

  export class PointsMaterial extends Material {
    constructor(parameters?: {color?: number | string; size?: number; transparent?: boolean; opacity?: number; sizeAttenuation?: boolean});
    color: Color;
    size: number;
    transparent: boolean;
    opacity: number;
    sizeAttenuation: boolean;
  }

  export class Vector3 {
    constructor(x?: number, y?: number, z?: number);
    x: number;
    y: number;
    z: number;
    set(x: number, y: number, z: number): this;
  }

  export class Euler {
    constructor(x?: number, y?: number, z?: number, order?: string);
    x: number;
    y: number;
    z: number;
  }

  export class Color {
    constructor(color?: string | number);
  }

  // Constants
  export const AdditiveBlending: number;

  export class Light extends Object3D {
    constructor(color?: string | number, intensity?: number);
    color: Color;
    intensity: number;
  }

  export class AmbientLight extends Light {
    constructor(color?: string | number, intensity?: number);
  }
}