import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';

export default function FactoryMap({ factorySize = { width: 10, height: 1, length: 10 } }) {
  return (
    <Canvas className="w-full h-full">
      <PerspectiveCamera makeDefault position={[0, 50, 100]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[50, 50, 50]} intensity={1} />
      <OrbitControls enableDamping />
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[factorySize.width, factorySize.height, factorySize.length]} />
        <meshBasicMaterial color="gray" wireframe transparent opacity={0.5} />
      </mesh>
    </Canvas>
  );
}
