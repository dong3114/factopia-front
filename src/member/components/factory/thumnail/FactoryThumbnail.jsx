import { PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export default function FactoryThumbnail({ factory }) {
  return (
    <div className="border p-4 flex flex-col items-start justify-start w-full">
      <Canvas className="w-32 h-32">
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[1, 1, 1]} intensity={1} />
        <mesh>
          <boxGeometry args={[3, 3, 3]} />
          <meshStandardMaterial color={factory.color || "#808080"} />
        </mesh>
      </Canvas>
      <h3 className="mt-2 text-lg font-semibold text-left w-full">
        {factory.name || `공장 ${factory.f_no}`}
      </h3>
      <p className="text-sm text-left w-full">
        Size: {factory.total_width} x {factory.total_depth}
      </p>
    </div>
  );
}
