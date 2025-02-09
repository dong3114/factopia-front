import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useState } from "react";
import CreateUI from "./CreateUI";
import FactoryObjectMove from "./objectForm/ObjectMove";
import PageMove from "./navigate/ObjectPageMove";
import ObjectManipulate from "./objectForm/ObjectManipulate";

export default function Factory3D() {
  const [objects, setObjects] = useState([]); // 모든 객체 상태 관리
  const [selectedObject, setSelectedObject] = useState(null);
  const [cameraMode, setCameraMode] = useState(false);
  const [moveMode, setMoveMode] = useState(false);

  const { handlePointerDown, handlePointerMove, handlePointerUp } = FactoryObjectMove({ selectedObject, setSelectedObject });
  const handleNavigate = PageMove({ selectedObject });

  return (
    <div className="flex">
      {/* UI 패널 */}
      <div className="w-1/4 p-3 bg-gray-200">
        <CreateUI selectedObject={selectedObject} onNavigate={handleNavigate} />
        <ObjectManipulate setCameraMode={setCameraMode} setMoveMode={setMoveMode} />
      </div>

      {/* 3D 화면 */}
      <div className="w-3/4 h-screen">
        <Canvas style={{ width: "100%", height: "100vh" }} camera={{ position: [20, 20, 20], fov: 50 }}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          {cameraMode && <OrbitControls />}

          {/* 도형 렌더링 */}
          {objects.map((obj) => (
            <mesh key={obj.id} position={obj.position} onPointerDown={(e) => handlePointerDown(e, obj)}>
              <boxGeometry args={obj.size} />
              <meshStandardMaterial
                color={obj.type === "factorySite" ? "gray" : obj.type === "factoryZone" ? "blue" : "purple"}
                transparent
                opacity={obj.type === "factorySite" ? 0.3 : 1} // 공장부지는 반투명
                wireframe={obj.type === "factorySite"} // 공장부지는 와이어프레임
              />
            </mesh>
          ))}
        </Canvas>
      </div>
    </div>
  );
}