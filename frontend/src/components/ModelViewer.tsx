import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF } from '@react-three/drei';

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

interface Props {
  glbPath: string;
}

export default function ModelViewer({ glbPath }: Props) {
  return (
    <Canvas camera={{ position: [2, 2, 2], fov: 45 }} style={{ width: '100%', height: '100%' }}>
      <Suspense fallback={null}>
        <Stage environment="studio" intensity={0.5}>
          <Model url={glbPath} />
        </Stage>
        <OrbitControls enablePan enableZoom enableRotate />
      </Suspense>
    </Canvas>
  );
}
