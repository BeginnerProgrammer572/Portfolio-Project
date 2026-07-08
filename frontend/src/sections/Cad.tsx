import { useEffect, useRef, useState } from 'react';
import styles from './Cad.module.css';
import { useFadeIn } from '../hooks/useFadeIn';
import { createCadScene, type CadScene } from './cadScene';

const MODELS = [
  { name: 'Arm Bracket', desc: 'Mounting bracket for robotics arm' },
  { name: 'Drive Gear', desc: 'Transmission gear with spokes' },
  { name: 'Base Chassis', desc: 'Robot frame with standoffs' },
];

export default function Cad() {
  const { ref: fadeRef, inView } = useFadeIn<HTMLDivElement>();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<CadScene | null>(null);
  const [active, setActive] = useState(0);
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    if (!canvasRef.current || !wrapRef.current) return;
    const scene = createCadScene(canvasRef.current, wrapRef.current);
    sceneRef.current = scene;
    return () => {
      scene.destroy();
      sceneRef.current = null;
    };
  }, []);

  const handleSelect = (idx: number) => {
    setActive(idx);
    sceneRef.current?.switchModel(idx);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };
  const handleDragLeave = () => setDragOver(false);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (!file || !file.name.toLowerCase().endsWith('.stl')) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const buf = ev.target?.result;
      if (!(buf instanceof ArrayBuffer)) return;
      const ok = sceneRef.current?.loadSTL(buf);
      if (ok) {
        setActive(-1);
      } else {
        alert('Could not parse STL. Make sure it is a binary STL file.');
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <section id="cad" className={styles.cad}>
      <div ref={fadeRef} className={`wrap fadeUp ${inView ? 'in' : ''}`}>
        <div className="tag">3D Models</div>
        <h2 className="sectionTitle">CAD Portfolio</h2>
        <p className="sub">
          Interactive 3D previews of mechanical designs. Drag to rotate, scroll to zoom,
          double-click to reset.
        </p>
        <div className={styles.layout}>
          <div className={styles.sidebar}>
            {MODELS.map((m, idx) => (
              <button
                key={m.name}
                type="button"
                className={`${styles.modelBtn} ${active === idx ? styles.active : ''}`}
                onClick={() => handleSelect(idx)}
              >
                <div className={styles.modelBtnName}>{m.name}</div>
                <div className={styles.modelBtnDesc}>{m.desc}</div>
              </button>
            ))}
            <div className={styles.note}>
              <strong>Using your .DWG files:</strong> export from Fusion 360 or AutoCAD as{' '}
              <strong>.STL</strong>, then drop the file directly onto the 3D viewer to load it.
            </div>
          </div>
          <div
            ref={wrapRef}
            className={`${styles.canvasWrap} ${dragOver ? styles.dragover : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <canvas ref={canvasRef} className={styles.canvas} />
            <div className={styles.hint}>Drag to rotate &nbsp;·&nbsp; Scroll to zoom &nbsp;·&nbsp; Double-click to reset</div>
            <div className={styles.badge}>3D Interactive</div>
            <div className={styles.dropMsg}>Drop .STL file to load</div>
          </div>
        </div>
      </div>
    </section>
  );
}
