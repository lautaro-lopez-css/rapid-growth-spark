import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * 3D particle sphere background for the Hero.
 * - Auto rotates gently, follows mouse for parallax rotation
 * - Click anywhere on the canvas to trigger an "explode" burst
 * - Colors pulled from the neon palette so it blends with the site
 */
export function ParticleSphere() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 4.6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";

    // Build particle sphere via fibonacci lattice for even distribution
    const COUNT = 3200;
    const RADIUS = 2.4;
    const positions = new Float32Array(COUNT * 3);
    const basePositions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const velocities = new Float32Array(COUNT * 3);

    const cyan = new THREE.Color("#22d3ee");
    const violet = new THREE.Color("#a78bfa");
    const pink = new THREE.Color("#f472b6");

    const phi = Math.PI * (Math.sqrt(5) - 1);
    for (let i = 0; i < COUNT; i++) {
      const y = 1 - (i / (COUNT - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;

      positions[i * 3] = x * RADIUS;
      positions[i * 3 + 1] = y * RADIUS;
      positions[i * 3 + 2] = z * RADIUS;
      basePositions[i * 3] = positions[i * 3];
      basePositions[i * 3 + 1] = positions[i * 3 + 1];
      basePositions[i * 3 + 2] = positions[i * 3 + 2];

      // Gradient by latitude, with a warm pink accent near equator
      const t = (y + 1) / 2;
      const c = cyan.clone().lerp(violet, t);
      const eq = 1 - Math.abs(y);
      c.lerp(pink, eq * 0.35);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Soft circular sprite for particles
    const sprite = (() => {
      const size = 64;
      const c = document.createElement("canvas");
      c.width = c.height = size;
      const ctx = c.getContext("2d")!;
      const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      g.addColorStop(0, "rgba(255,255,255,1)");
      g.addColorStop(0.4, "rgba(255,255,255,0.6)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, size, size);
      const tex = new THREE.CanvasTexture(c);
      tex.needsUpdate = true;
      return tex;
    })();

    const material = new THREE.PointsMaterial({
      size: 0.055,
      vertexColors: true,
      map: sprite,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Interaction state
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    let exploding = 0; // 0..1 progress toward exploded
    let explodeVel = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.tx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.ty = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    };
    const onClick = () => {
      explodeVel = 1;
      for (let i = 0; i < COUNT; i++) {
        const bx = basePositions[i * 3];
        const by = basePositions[i * 3 + 1];
        const bz = basePositions[i * 3 + 2];
        const len = Math.hypot(bx, by, bz) || 1;
        const jitter = 0.6 + Math.random() * 0.9;
        velocities[i * 3] = (bx / len) * jitter;
        velocities[i * 3 + 1] = (by / len) * jitter;
        velocities[i * 3 + 2] = (bz / len) * jitter;
      }
    };

    renderer.domElement.addEventListener("mousemove", onMouseMove);
    renderer.domElement.addEventListener("click", onClick);

    // Resize
    const onResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    let raf = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const dt = Math.min(clock.getDelta(), 0.05);

      // Ease mouse
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;

      // Rotate group
      points.rotation.y += dt * 0.15 + mouse.x * dt * 0.6;
      points.rotation.x += mouse.y * dt * 0.4;

      // Explode decay: particles drift out then return
      explodeVel *= 0.94;
      exploding = Math.max(0, exploding + explodeVel * dt * 3 - dt * 0.4);
      exploding = Math.min(exploding, 1.6);

      const pos = geometry.attributes.position as THREE.BufferAttribute;
      const arr = pos.array as Float32Array;
      const t = performance.now() * 0.0006;
      for (let i = 0; i < COUNT; i++) {
        const ix = i * 3;
        const bx = basePositions[ix];
        const by = basePositions[ix + 1];
        const bz = basePositions[ix + 2];
        // Subtle breathing
        const breath = 1 + Math.sin(t + i * 0.02) * 0.015;
        const ex = velocities[ix] * exploding;
        const ey = velocities[ix + 1] * exploding;
        const ez = velocities[ix + 2] * exploding;
        arr[ix] = bx * breath + ex;
        arr[ix + 1] = by * breath + ey;
        arr[ix + 2] = bz * breath + ez;
      }
      pos.needsUpdate = true;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      renderer.domElement.removeEventListener("mousemove", onMouseMove);
      renderer.domElement.removeEventListener("click", onClick);
      geometry.dispose();
      material.dispose();
      sprite.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden
      className="absolute inset-0 h-full w-full"
      style={{ pointerEvents: "auto" }}
    />
  );
}