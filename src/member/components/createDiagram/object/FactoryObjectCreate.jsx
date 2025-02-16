import { useState } from "react";
import ObjectSizeForm from "../object/ObjectSizeForm";
import checkDuplicateId from "../object/validate/checkDuplicateId";

export default function FactoryObjectCreate({ objects, onCreate }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("factorySite");
  const [objectData, setObjectData] = useState(null);

  const handleCreate = () => {
    if (!name.trim()) {
      alert("이름을 입력하세요.");
      return;
    }

    const newId = name.trim();
    if (checkDuplicateId(objects, newId)) {
      alert("중복된 ID가 존재합니다.");
      return;
    }

    onCreate({ id: newId, name, type, ...objectData });
  };

  return (
    <div className="p-3 border rounded bg-gray-100">
      <h3 className="text-lg font-bold">새 객체 생성</h3>

      <label className="block">이름 입력</label>
      <input
        type="text"
        className="p-2 border rounded w-full"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label className="block mt-2">객체 유형</label>
      <select className="p-2 border rounded w-full" value={type} onChange={(e) => setType(e.target.value)}>
        <option value="factorySite">공장부지</option>
        <option value="factoryZone">공장구역</option>
        <option value="factorySection">공장사용구역</option>
      </select>

      <ObjectSizeForm selectedObject={objectData} onChange={setObjectData} />

      <button onClick={handleCreate} className="p-2 mt-2 bg-green-500 text-white rounded w-full">
        생성
      </button>
    </div>
  );
}
