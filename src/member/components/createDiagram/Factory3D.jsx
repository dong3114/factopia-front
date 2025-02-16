import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useState } from "react";
import CreateUI from "./CreateUI";
import FactoryObjectMove from "./objectForm/ObjectMove";
import PageMove from "./navigate/ObjectPageMove";
import ObjectManipulate from "./objectForm/ObjectManipulate";

export default function Factory3D() {
  const [factory, setFactory] = useState(null); // 공장 부지 객체
  const [objects, setObjects] = useState([]); // 모든 객체 상태 관리
  const [selectedObject, setSelectedObject] = useState(null);
  const [cameraMode, setCameraMode] = useState(false);
  const [moveMode, setMoveMode] = useState(false);

  const { handlePointerDown, handlePointerMove, handlePointerUp } = FactoryObjectMove({ 
    selectedObject,
    setSelectedObject,
    objects,
    setObjects
  });

  const handleNavigate = PageMove({ selectedObject });

  return (
    <div className="flex h-screen">
      {/* 🔹 UI 패널 (스크롤 가능하도록 `overflow-y-auto`) */}
      <div className="w-1/4 p-3 bg-gray-200 overflow-y-auto h-screen">
        <CreateUI 
          selectedObject={selectedObject} 
          objects={objects}
          setObjects={setObjects} 
          setSelectedObject={setSelectedObject}
          onNavigate={handleNavigate} 
          factory={factory}
          setFactory={setFactory}
        />
        <ObjectManipulate setCameraMode={setCameraMode} setMoveMode={setMoveMode} />
      </div>

      {/* 🔹 3D 화면 (고정된 풀스크린) */}
      <div className="w-3/4 h-screen fixed top-0 right-0">
        <Canvas 
          style={{ width: "100%", height: "100vh" }} 
          camera={{ position: [20, 20, 20], fov: 50 }}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          {cameraMode && <OrbitControls />}

          {/* 도형 렌더링 */}
          {factory && (
            <mesh key={factory.id} position={factory.position}>
              <boxGeometry args={factory.size} />
              <meshStandardMaterial
                color="gray"
                transparent
                opacity={0.3} // 공장부지는 반투명
                wireframe // 공장부지는 와이어프레임
              />
            </mesh>
          )}
        </Canvas>
      </div>
    </div>
  );
}