import { useState } from "react";
import ObjectSizeForm from "./ObjectSizeForm";
import ObjectValidator from "../validate/ObjectValidator";

export default function FactoryObjectCreate({ 
  factory, setFactory, objects, setObjects, 
  setSelectedObject, onClose }) {

  const [name, setName] = useState("");
  const [type, setType] = useState("factorySite");
  const [objectData, setObjectData] = useState({
    x_start: 0, y_start: 0, z_start: 0, x_end: 2, y_end: 2, z_end: 2
  });

  const handleCreate = () => {
    if (!name.trim()) {
      alert("이름을 입력하세요.");
      return;
    }

    // ✅ ID, NAME 동기화 및 중복 방지
    const count = objects.filter(obj => obj.type === type).length + 1;
    const objectId = `${type}_${count}`;

    const size = [
      objectData.x_end - objectData.x_start,
      objectData.y_end - objectData.y_start,
      objectData.z_end - objectData.z_start
    ];
    const position = [
      objectData.x_start + size[0] / 2,
      objectData.y_start + size[1] / 2,
      objectData.z_start + size[2] / 2
    ];

    if(type !== "factorySite" && !factory){
      alert("먼저 공장부지를 생성해야 합니다.");
      return;
    }

    const newObject = {
      id: objectId,
      name: name.trim(),
      type,
      position,
      size,
      parent: type === "factorySite" ? null : factory.id,
      ...objectData,
    };

    // 🔹 객체 유효성 검사 수행
    const validationError = ObjectValidator.validateAll(objects, newObject);
    if (validationError) {
      alert(validationError);
      return;
    }

    // 🔹 공장부지 생성 로직 
    if (type === "factorySite") {
      setFactory(newObject);
    } else {
      setObjects([...objects, newObject]);
    }
    setSelectedObject(newObject);

    // 🔹 입력값 초기화
    setName("");
    setObjectData({ x_start: 0, y_start: 0, z_start: 0, x_end: 2, y_end: 2, z_end: 2 });
    onClose();
  };

  return (
    <div className="p-3 border rounded bg-gray-100">
      <h3 className="text-lg font-bold">새 객체 생성</h3>

      {/* 🔹 이름 입력 */}
      <label className="block">이름 입력</label>
      <input 
        type="text"
        className="p-2 border rounded w-full"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* 🔹 객체 유형 선택 */}
      <label className="block mt-2">객체 유형</label>
      <select 
        className="p-2 border rounded w-full"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="factorySite">공장부지</option>
        <option value="factoryZone">공장구역</option>
        <option value="factorySection">공장사용구역</option>
      </select>

      {/* 🔹 크기 및 위치 설정 */}
      <ObjectSizeForm selectedObject={objectData} onChange={setObjectData} />

      {/* 🔹 생성 버튼 */}
      <button onClick={handleCreate} className="p-2 mt-2 bg-green-500 text-white rounded w-full">
        생성
      </button>
      <button onClick={onClose} className="p-2 bg-gray-400 text-white rounded w-full">
          취소
      </button>
    </div>
  );
}