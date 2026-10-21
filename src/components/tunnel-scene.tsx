"use client";

import { useEffect, useRef, useState } from "react";

/** Loaded only near the viewport. No remote textures, models, or continuous React updates. */
export default function TunnelScene() {
  const host = useRef<HTMLDivElement>(null);
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let disposed = false;
    let cleanup: (() => void) | undefined;
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        try {
          const THREE = await import("three");
          if (disposed) return;
          const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: "low-power",
          });
          renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
          renderer.setClearColor(0x050807, 0);
          renderer.outputColorSpace = THREE.SRGBColorSpace;
          renderer.toneMapping = THREE.ACESFilmicToneMapping;
          renderer.toneMappingExposure = 1.5;
          element.appendChild(renderer.domElement);
          const scene = new THREE.Scene();
          scene.fog = new THREE.FogExp2(0x050907, 0.026);
          const camera = new THREE.PerspectiveCamera(39, 1, 0.1, 120);
          camera.position.set(0, 2.4, 13);
          camera.lookAt(0, -0.3, -17);
          const metal = new THREE.MeshStandardMaterial({
            color: 0x243f35,
            metalness: 0.88,
            roughness: 0.28,
          });
          const silver = new THREE.MeshStandardMaterial({
            color: 0xa2b7ac,
            metalness: 0.92,
            roughness: 0.22,
          });
          const dark = new THREE.MeshStandardMaterial({
            color: 0x091b15,
            metalness: 0.68,
            roughness: 0.35,
          });
          const green = new THREE.MeshStandardMaterial({
            color: 0x11efa3,
            emissive: 0x00ca7d,
            emissiveIntensity: 1.6,
            metalness: 0.35,
            roughness: 0.25,
          });
          const yellow = new THREE.MeshStandardMaterial({
            color: 0xf5d76a,
            emissive: 0xd4a120,
            emissiveIntensity: 0.35,
            metalness: 0.5,
            roughness: 0.35,
          });
          const red = new THREE.MeshStandardMaterial({
            color: 0xde4143,
            metalness: 0.5,
            roughness: 0.3,
          });
          scene.add(new THREE.HemisphereLight(0xbbeedd, 0x030806, 3));
          const key = new THREE.DirectionalLight(0xf2fff8, 5);
          key.position.set(2, 7, 6);
          scene.add(key);
          const rim = new THREE.PointLight(0x00ffa3, 100, 35, 1.5);
          rim.position.set(-4, 2, 1);
          scene.add(rim);
          const backlight = new THREE.PointLight(0x04b87a, 90, 45, 1.3);
          backlight.position.set(2, 2, -22);
          scene.add(backlight);

          function frameGeometry(
            size: number,
            thickness: number,
            depth: number,
            bevel: number,
          ) {
            const shape = new THREE.Shape();
            shape.moveTo(-size, -size);
            shape.lineTo(size, -size);
            shape.lineTo(size, size);
            shape.lineTo(-size, size);
            shape.closePath();
            const hole = new THREE.Path();
            const inner = size - thickness;
            hole.moveTo(-inner, -inner);
            hole.lineTo(-inner, inner);
            hole.lineTo(inner, inner);
            hole.lineTo(inner, -inner);
            hole.closePath();
            shape.holes.push(hole);
            const geometry = new THREE.ExtrudeGeometry(shape, {
              depth,
              bevelEnabled: true,
              bevelSegments: 3,
              steps: 1,
              bevelSize: bevel,
              bevelThickness: bevel,
            });
            geometry.center();
            return geometry;
          }
          const tunnel = new THREE.Group();
          tunnel.position.set(2.5, 0.1, -9);
          scene.add(tunnel);
          const portalGeometry = frameGeometry(4, 0.21, 0.35, 0.07);
          const insetGeometry = frameGeometry(3.73, 0.024, 0.04, 0.012);
          const portals: InstanceType<typeof THREE.Group>[] = [];
          for (let i = 0; i < 15; i++) {
            const portal = new THREE.Group();
            portal.position.z = -i * 3.3;
            portal.rotation.z = Math.PI / 4;
            portal.add(
              new THREE.Mesh(portalGeometry, i % 3 === 0 ? silver : metal),
            );
            const inset = new THREE.Mesh(insetGeometry, green);
            inset.position.z = 0.22;
            portal.add(inset);
            tunnel.add(portal);
            portals.push(portal);
          }
          const floor = new THREE.Mesh(
            new THREE.PlaneGeometry(110, 110),
            new THREE.MeshStandardMaterial({
              color: 0x06100c,
              roughness: 0.3,
              metalness: 0.6,
              transparent: true,
              opacity: 0.7,
            }),
          );
          floor.rotation.x = -Math.PI / 2;
          floor.position.set(0, -4, -20);
          scene.add(floor);
          const grid = new THREE.GridHelper(100, 60, 0x12583c, 0x0a261b);
          grid.position.y = -3.98;
          scene.add(grid);

          // Machined, layered core: solid bevelled geometry, not an icon or flat illustration.
          const core = new THREE.Group();
          core.position.set(2.15, 0.15, 0.3);
          core.rotation.set(0.3, -0.4, 0.23);
          scene.add(core);
          const ringGeometry = frameGeometry(1.82, 0.48, 0.48, 0.15);
          for (let i = 0; i < 3; i++) {
            const ring = new THREE.Mesh(ringGeometry, i === 1 ? metal : silver);
            ring.position.z = (i - 1) * 0.72;
            ring.rotation.z = i * 0.17 + Math.PI / 4;
            core.add(ring);
          }
          const crystal = new THREE.Mesh(
            new THREE.IcosahedronGeometry(0.94, 0),
            green,
          );
          core.add(crystal);
          const orbit = new THREE.Mesh(
            new THREE.TorusGeometry(2.58, 0.045, 10, 100),
            silver,
          );
          orbit.rotation.set(1.1, 0.4, 0.1);
          core.add(orbit);
          const satellites: InstanceType<typeof THREE.Mesh>[] = [];
          [green, yellow, red].forEach((material, i) => {
            const satellite = new THREE.Mesh(
              new THREE.BoxGeometry(0.25, 0.25, 0.25),
              material,
            );
            const angle = (i * Math.PI * 2) / 3;
            satellite.position.set(
              Math.cos(angle) * 2.58,
              Math.sin(angle) * 1.2,
              Math.sin(angle) * 2.2,
            );
            satellite.rotation.set(0.5, 0.5, 0.5);
            core.add(satellite);
            satellites.push(satellite);
          });
          const base = new THREE.Mesh(
            new THREE.CylinderGeometry(3.3, 3.5, 0.24, 64),
            dark,
          );
          base.position.set(2.15, -3.65, 0.3);
          scene.add(base);
          const baseRim = new THREE.Mesh(
            new THREE.TorusGeometry(3.3, 0.025, 8, 100),
            green,
          );
          baseRim.rotation.x = Math.PI / 2;
          baseRim.position.copy(base.position);
          baseRim.position.y += 0.14;
          scene.add(baseRim);

          const agentArms: InstanceType<typeof THREE.Group>[] = [];
          function makeAgent(x: number, z: number) {
            const agent = new THREE.Group();
            agent.position.set(x, -2.9, z);
            agent.rotation.y = x < 2 ? -0.4 : 0.4;
            const body = new THREE.Mesh(
              new THREE.BoxGeometry(0.62, 0.82, 0.45),
              silver,
            );
            body.position.y = 0.7;
            agent.add(body);
            const head = new THREE.Mesh(
              new THREE.BoxGeometry(0.77, 0.52, 0.59),
              metal,
            );
            head.position.y = 1.45;
            agent.add(head);
            const face = new THREE.Mesh(
              new THREE.BoxGeometry(0.63, 0.24, 0.025),
              dark,
            );
            face.position.set(0, 1.47, 0.31);
            agent.add(face);
            for (const side of [-1, 1]) {
              const eye = new THREE.Mesh(
                new THREE.BoxGeometry(0.09, 0.05, 0.03),
                green,
              );
              eye.position.set(side * 0.17, 1.48, 0.33);
              agent.add(eye);
              const leg = new THREE.Mesh(
                new THREE.BoxGeometry(0.16, 0.4, 0.19),
                dark,
              );
              leg.position.set(side * 0.2, 0.09, 0);
              agent.add(leg);
              const joint = new THREE.Group();
              joint.position.set(side * 0.43, 0.96, 0);
              const arm = new THREE.Mesh(
                new THREE.CylinderGeometry(0.07, 0.07, 0.65, 10),
                silver,
              );
              arm.rotation.x = -0.7;
              arm.position.set(0, -0.22, 0.18);
              joint.add(arm);
              const hand = new THREE.Mesh(
                new THREE.SphereGeometry(0.12, 12, 12),
                green,
              );
              hand.position.set(0, -0.45, 0.36);
              joint.add(hand);
              agent.add(joint);
              agentArms.push(joint);
            }
            const desk = new THREE.Mesh(
              new THREE.BoxGeometry(1.4, 0.12, 0.78),
              metal,
            );
            desk.position.set(0, 0.4, 0.8);
            agent.add(desk);
            for (let i = 0; i < 5; i++) {
              const indicator = new THREE.Mesh(
                new THREE.BoxGeometry(0.12, 0.025, 0.25),
                i % 2 ? silver : green,
              );
              indicator.position.set(-0.46 + i * 0.23, 0.48, 0.8);
              agent.add(indicator);
            }
            scene.add(agent);
          }
          makeAgent(-1.9, -9);
          makeAgent(5.8, -14);
          makeAgent(1.9, -22);
          let width = 0,
            height = 0;
          const resize = () => {
            width = element.clientWidth;
            height = element.clientHeight;
            if (!width || !height) return;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.fov = width < 600 ? 52 : 39;
            camera.updateProjectionMatrix();
            renderer.render(scene, camera);
          };
          const resizeObserver = new ResizeObserver(resize);
          resizeObserver.observe(element);
          resize();
          const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
          let visible = true,
            raf = 0,
            lastFrame = 0;
          const started = performance.now();
          function animate(now: number) {
            raf = requestAnimationFrame(animate);
            if (!visible || document.hidden || now - lastFrame < 32) return;
            lastFrame = now;
            const t = (now - started) / 1000;
            core.position.y = 0.15 + Math.sin(t * 0.55) * 0.17;
            core.rotation.y = -0.4 + Math.sin(t * 0.22) * 0.22;
            crystal.rotation.set(t * 0.18, t * 0.25, 0.2);
            satellites.forEach((satellite, i) => {
              satellite.rotation.y = t * 0.4 + i;
            });
            portals.forEach((portal, i) => {
              portal.position.z = -((i * 3.3 - t * 0.6 + 49.5) % 49.5);
            });
            agentArms.forEach((arm, i) => {
              arm.rotation.x = Math.sin(t * 2.4 + i * 1.8) * 0.22;
            });
            renderer.render(scene, camera);
          }
          const syncMotion = () => {
            cancelAnimationFrame(raf);
            if (!motion.matches) raf = requestAnimationFrame(animate);
            else renderer.render(scene, camera);
          };
          const visibility = new IntersectionObserver(([e]) => {
            visible = e.isIntersecting;
          });
          visibility.observe(element);
          motion.addEventListener("change", syncMotion);
          syncMotion();
          const contextLost = (event: Event) => {
            event.preventDefault();
            cancelAnimationFrame(raf);
            setAvailable(false);
          };
          renderer.domElement.addEventListener("webglcontextlost", contextLost);
          setAvailable(true);
          cleanup = () => {
            cancelAnimationFrame(raf);
            motion.removeEventListener("change", syncMotion);
            renderer.domElement.removeEventListener(
              "webglcontextlost",
              contextLost,
            );
            visibility.disconnect();
            resizeObserver.disconnect();
            const geometries = new Set<
              InstanceType<typeof THREE.BufferGeometry>
            >();
            const materials = new Set<InstanceType<typeof THREE.Material>>();
            scene.traverse((object) => {
              if (
                object instanceof THREE.Mesh ||
                object instanceof THREE.LineSegments
              ) {
                geometries.add(object.geometry);
                const list = Array.isArray(object.material)
                  ? object.material
                  : [object.material];
                list.forEach((material) => materials.add(material));
              }
            });
            geometries.forEach((geometry) => geometry.dispose());
            materials.forEach((material) => material.dispose());
            renderer.dispose();
            renderer.domElement.remove();
          };
        } catch {
          // The CSS solid portal stays visible when WebGL is unavailable.
          if (!disposed) setAvailable(false);
        }
      },
      { rootMargin: "160px" },
    );
    observer.observe(element);
    return () => {
      disposed = true;
      observer.disconnect();
      cleanup?.();
    };
  }, []);

  return (
    <div
      className={`tunnel-scene ${available ? "scene-ready" : ""}`}
      aria-hidden="true"
    >
      <div className="scene-fallback">
        <div className="fallback-portal" />
        <div className="fallback-portal portal-two" />
        <div className="fallback-core" />
      </div>
      <div ref={host} className="webgl-host" />
      <div className="scene-vignette" />
    </div>
  );
}
