import CreateButtonGroup from "./button/CreateButtonGroup";
import EditObjectForm from "./objectForm/EditObjectForm";
import DeleteButton from "./button/DeleteButton";

export default function CreateUI({ selectedObject, objects, setObjects, setSelectedObject, onNavigate, factory, setFactory }) {
  return (
    <div className="p-3 border rounded bg-gray-100">
      {/* 🔹 생성 버튼 그룹 */}
      <CreateButtonGroup
        objects={objects}
        setObjects={setObjects}
        setSelectedObject={setSelectedObject}
        factory={factory}
        setFactory={setFactory}
      />

      {/* 🔹 수정 UI (선택된 객체가 있을 때만 표시) */}
      {selectedObject && (
        <EditObjectForm
          selectedObject={selectedObject}
          onUpdate={(updateObject) => {
            setObjects(objects.map(obj => (obj.id === selectedObject.id ? updateObject : obj)));
            setSelectedObject(updateObject);
          }}
        />
      )}

      {/* 🔹 삭제 버튼 (선택된 객체가 있을 때만 표시) */}
      {selectedObject && (
        <DeleteButton 
          onDelete={() => {
            setObjects(objects.filter(obj => obj.id !== selectedObject.id));
            setSelectedObject(null);
          }} 
        />
      )}
    </div>
  );
}
