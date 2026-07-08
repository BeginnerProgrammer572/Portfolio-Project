import * as THREE from 'three';

const RESET_SPHERICAL = { t: 0.5, p: 1.1, r: 5.5 };

function makeEdges(mesh: THREE.Mesh, color = 0xdf7b18) {
  const edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(mesh.geometry),
    new THREE.LineBasicMaterial({ color }),
  );
  mesh.add(edges);
}

function buildMaterials() {
  return {
    metal: new THREE.MeshStandardMaterial({ color: 0xb4bdc4, metalness: 0.7, roughness: 0.28 }),
    dark: new THREE.MeshStandardMaterial({ color: 0x2a2a36, metalness: 0.4, roughness: 0.55 }),
    amber: new THREE.MeshStandardMaterial({ color: 0xdf7b18, metalness: 0.3, roughness: 0.4, emissive: 0xdf7b18, emissiveIntensity: 0.08 }),
  };
}

function makeArmBracket(mat: ReturnType<typeof buildMaterials>) {
  const g = new THREE.Group();
  const base = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.18, 1.4), mat.metal);
  makeEdges(base);
  g.add(base);

  const wall = new THREE.Mesh(new THREE.BoxGeometry(2.8, 1.7, 0.18), mat.metal);
  wall.position.set(0, 0.94, -0.61);
  makeEdges(wall);
  g.add(wall);

  for (const x of [-1.05, 1.05]) {
    const rib = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.95, 0.7), mat.metal);
    rib.position.set(x, 0.48, -0.2);
    makeEdges(rib);
    g.add(rib);
  }

  for (const [x, y, z] of [[1.0, 0, -0.35], [-1.0, 0, -0.35], [1.0, 0, 0.5], [-1.0, 0, 0.5]]) {
    const h = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.22, 12), mat.dark);
    h.position.set(x, y, z);
    g.add(h);
  }
  for (const [x, y, z] of [[0.9, 0.65, -0.61], [-0.9, 0.65, -0.61], [0.9, 1.35, -0.61], [-0.9, 1.35, -0.61]]) {
    const h = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.25, 12), mat.dark);
    h.position.set(x, y, z);
    h.rotation.x = Math.PI / 2;
    g.add(h);
  }
  g.position.y = -0.2;
  return g;
}

function makeDriveGear(mat: ReturnType<typeof buildMaterials>) {
  const g = new THREE.Group();
  const disk = new THREE.Mesh(new THREE.CylinderGeometry(1.32, 1.32, 0.38, 48), mat.metal);
  makeEdges(disk);
  g.add(disk);

  const bore = new THREE.Mesh(new THREE.CylinderGeometry(0.27, 0.27, 0.45, 20), mat.dark);
  g.add(bore);

  for (let i = 0; i < 18; i++) {
    const a = (i / 18) * Math.PI * 2;
    const t = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.36, 0.16), mat.metal);
    t.position.set(Math.cos(a) * 1.44, 0, Math.sin(a) * 1.44);
    t.rotation.y = a;
    makeEdges(t);
    g.add(t);
  }
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    const s = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.33, 0.88), mat.metal);
    s.position.set(Math.cos(a) * 0.55, 0, Math.sin(a) * 0.55);
    s.rotation.y = a;
    makeEdges(s);
    g.add(s);
  }
  g.rotation.x = Math.PI / 2;
  return g;
}

function makeBaseChassis(mat: ReturnType<typeof buildMaterials>) {
  const g = new THREE.Group();
  const plate = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.14, 2.1), mat.metal);
  makeEdges(plate);
  g.add(plate);

  for (const [x, y, z] of [[-1.5, 0.3, 0], [1.5, 0.3, 0]]) {
    const r = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.58, 2.1), mat.metal);
    r.position.set(x, y, z);
    makeEdges(r);
    g.add(r);
  }
  for (const [x, y, z] of [[0, 0.3, -0.9], [0, 0.3, 0.9]]) {
    const c = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.28, 0.16), mat.metal);
    c.position.set(x, y, z);
    makeEdges(c);
    g.add(c);
  }
  for (const [x, y, z] of [[1.3, 0.4, 0.75], [-1.3, 0.4, 0.75], [1.3, 0.4, -0.75], [-1.3, 0.4, -0.75]]) {
    const p = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.65, 12), mat.amber);
    p.position.set(x, y, z);
    g.add(p);
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.06, 12), mat.metal);
    cap.position.set(x, y + 0.35, z);
    g.add(cap);
  }
  for (const [x, y, z] of [[-0.65, 0.2, 0], [0.65, 0.2, 0]]) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.3, 0.42), mat.dark);
    m.position.set(x, y, z);
    makeEdges(m);
    g.add(m);
  }
  g.position.y = -0.15;
  return g;
}

export function parseBinarySTL(buf: ArrayBuffer): THREE.BufferGeometry {
  const view = new DataView(buf);
  const n = view.getUint32(80, true);
  const pos: number[] = [];
  const nor: number[] = [];
  for (let i = 0; i < n; i++) {
    const b = 84 + i * 50;
    const nx = view.getFloat32(b, true);
    const ny = view.getFloat32(b + 4, true);
    const nz = view.getFloat32(b + 8, true);
    for (let v = 0; v < 3; v++) {
      const o = b + 12 + v * 12;
      pos.push(view.getFloat32(o, true), view.getFloat32(o + 4, true), view.getFloat32(o + 8, true));
      nor.push(nx, ny, nz);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
  geo.computeBoundingBox();
  const box = geo.boundingBox!;
  const center = new THREE.Vector3();
  box.getCenter(center);
  geo.translate(-center.x, -center.y, -center.z);
  const size = new THREE.Vector3();
  box.getSize(size);
  const scale = 3.2 / Math.max(size.x, size.y, size.z);
  geo.scale(scale, scale, scale);
  return geo;
}

export interface CadScene {
  switchModel: (idx: number) => void;
  loadSTL: (buf: ArrayBuffer) => boolean;
  destroy: () => void;
}

export function createCadScene(canvas: HTMLCanvasElement, wrap: HTMLElement): CadScene {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x09090f);

  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  let sph = { ...RESET_SPHERICAL };

  function applyCamera() {
    camera.position.set(
      sph.r * Math.sin(sph.p) * Math.sin(sph.t),
      sph.r * Math.cos(sph.p),
      sph.r * Math.sin(sph.p) * Math.cos(sph.t),
    );
    camera.lookAt(0, 0, 0);
  }
  applyCamera();

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const sun = new THREE.DirectionalLight(0xffffff, 0.9);
  sun.position.set(5, 9, 4);
  sun.castShadow = true;
  scene.add(sun);
  const fill = new THREE.DirectionalLight(0xc8d8ff, 0.3);
  fill.position.set(-4, 2, -3);
  scene.add(fill);
  const accentPt = new THREE.PointLight(0xdf7b18, 0.65, 18);
  accentPt.position.set(-3, 3, 4);
  scene.add(accentPt);

  const grid = new THREE.GridHelper(7, 14, 0x1a1a2e, 0x14141f);
  grid.position.y = -1.2;
  scene.add(grid);

  const materials = buildMaterials();
  const modelMakers = [
    () => makeArmBracket(materials),
    () => makeDriveGear(materials),
    () => makeBaseChassis(materials),
  ];

  let currentObj: THREE.Object3D | null = null;
  let autoSpin = true;

  function switchModel(idx: number) {
    if (currentObj) scene.remove(currentObj);
    currentObj = modelMakers[idx]();
    scene.add(currentObj);
    sph = { ...RESET_SPHERICAL };
    applyCamera();
    autoSpin = true;
  }
  switchModel(0);

  function loadSTL(buf: ArrayBuffer): boolean {
    try {
      const geo = parseBinarySTL(buf);
      if (currentObj) scene.remove(currentObj);
      const mesh = new THREE.Mesh(geo, materials.metal);
      const lines = new THREE.LineSegments(new THREE.EdgesGeometry(geo), new THREE.LineBasicMaterial({ color: 0xdf7b18 }));
      mesh.add(lines);
      currentObj = mesh;
      scene.add(currentObj);
      sph = { ...RESET_SPHERICAL };
      applyCamera();
      autoSpin = false;
      return true;
    } catch {
      return false;
    }
  }

  // ── Orbit controls ──
  let dragging = false;
  let px = 0;
  let py = 0;
  const onMouseDown = (e: MouseEvent) => { dragging = true; px = e.clientX; py = e.clientY; autoSpin = false; };
  const onMouseUp = () => { dragging = false; };
  const onMouseMove = (e: MouseEvent) => {
    if (!dragging) return;
    sph.t -= (e.clientX - px) * 0.007;
    sph.p = Math.max(0.12, Math.min(Math.PI - 0.12, sph.p - (e.clientY - py) * 0.007));
    px = e.clientX;
    py = e.clientY;
    applyCamera();
  };
  const onWheel = (e: WheelEvent) => {
    e.preventDefault();
    sph.r = Math.max(2.8, Math.min(14, sph.r + e.deltaY * 0.012));
    applyCamera();
  };
  const onDblClick = () => { sph = { ...RESET_SPHERICAL }; autoSpin = true; applyCamera(); };

  let touch0: { clientX: number; clientY: number } | null = null;
  const onTouchStart = (e: TouchEvent) => {
    if (e.touches.length === 1) { touch0 = e.touches[0]; autoSpin = false; }
  };
  const onTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    if (e.touches.length === 1 && touch0) {
      const t = e.touches[0];
      sph.t -= (t.clientX - touch0.clientX) * 0.007;
      sph.p = Math.max(0.12, Math.min(Math.PI - 0.12, sph.p - (t.clientY - touch0.clientY) * 0.007));
      touch0 = t;
      applyCamera();
    }
  };
  const onTouchEnd = () => { touch0 = null; };

  canvas.addEventListener('mousedown', onMouseDown);
  window.addEventListener('mouseup', onMouseUp);
  window.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('wheel', onWheel, { passive: false });
  canvas.addEventListener('dblclick', onDblClick);
  canvas.addEventListener('touchstart', onTouchStart);
  canvas.addEventListener('touchmove', onTouchMove, { passive: false });
  canvas.addEventListener('touchend', onTouchEnd);

  // ── Resize ──
  function onResize() {
    const w = wrap.clientWidth;
    const h = wrap.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', onResize);
  onResize();

  // ── Render loop ──
  let tick = 0;
  let frameId = 0;
  function loop() {
    frameId = requestAnimationFrame(loop);
    tick += 0.01;
    if (autoSpin) { sph.t += 0.004; applyCamera(); }
    if (currentObj) currentObj.position.y = Math.sin(tick * 0.7) * 0.05;
    renderer.render(scene, camera);
  }
  loop();

  function destroy() {
    cancelAnimationFrame(frameId);
    canvas.removeEventListener('mousedown', onMouseDown);
    window.removeEventListener('mouseup', onMouseUp);
    window.removeEventListener('mousemove', onMouseMove);
    canvas.removeEventListener('wheel', onWheel);
    canvas.removeEventListener('dblclick', onDblClick);
    canvas.removeEventListener('touchstart', onTouchStart);
    canvas.removeEventListener('touchmove', onTouchMove);
    canvas.removeEventListener('touchend', onTouchEnd);
    window.removeEventListener('resize', onResize);
    renderer.dispose();
  }

  return { switchModel, loadSTL, destroy };
}
