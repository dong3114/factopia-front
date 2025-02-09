import { useEffect, useState } from "react";
import CreateButtonGroup from "./button/CreateButtonGroup";
import EditObjectForm from "./objectForm/EditObjectForm";
import DeleteButton from "./button/DeleteButton";

export default function CreateUI({ selectedObject, onCreateObject, onUpdate, onDelete }) {
  return (
    <div className="p-3 border rounded bg-gray-100">
      {/* 🔹 생성 버튼 그룹 */}
      <CreateButtonGroup onCreateObject={onCreateObject} />

      {/* 🔹 수정 UI (선택된 객체가 있을 때만 표시) */}
      {selectedObject && <EditObjectForm selectedObject={selectedObject} onUpdate={onUpdate} />}

      {/* 🔹 삭제 버튼 (선택된 객체가 있을 때만 표시) */}
      {selectedObject && <DeleteButton onDelete={onDelete} />}
    </div>
  );
}