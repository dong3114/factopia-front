import ObjectSizeForm from "./ObjectSizeForm";

export default function EditObjectForm({ selectedObject, onUpdate }) {
  if (!selectedObject) {
    return <div className="p-3">선택된 객체가 없습니다.</div>;
  }

  return (
    <div className="p-3 border rounded bg-gray-100">
      <h3 className="text-lg font-bold">객체 수정</h3>

      {/* 🔹 위치 및 크기 수정 UI */}
      <ObjectSizeForm selectedObject={selectedObject} onChange={onUpdate} />
    </div>
  );
}