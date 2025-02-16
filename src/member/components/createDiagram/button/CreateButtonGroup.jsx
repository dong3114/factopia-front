import { useState } from "react";
import FactoryObjectCreate from "../objectForm/FactoryObjectCreate";

export default function CreateButtonGroup({ objects, setObjects, setSelectedObject, factory, setFactory }) {
  const [isCreating, setIsCreating] = useState(false);

  const handleClose = () => {
    setIsCreating(false);
  };

  return (
    <div className="p-3 border rounded bg-gray-100">
      <h3 className="text-lg font-bold">공장 관리</h3>

      {/* 🔹 생성 버튼 클릭 시 팝업처럼 FactoryObjectCreate 렌더링 */}
      {!isCreating ? (
        <button
          onClick={() => setIsCreating(true)}
          className="p-2 mt-2 bg-green-500 text-white rounded w-full"
        >
          새 객체 생성
        </button>
      ) : (
        <FactoryObjectCreate
          objects={objects}
          setObjects={setObjects}
          setSelectedObject={setSelectedObject}
          factory={factory}
          setFactory={setFactory}
          onClose={handleClose}
        />
      )}
    </div>
  );
}
