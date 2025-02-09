import { useEffect, useState } from "react";

export default function EditObjectForm({ selectedObject, onUpdate }) {
  const [xStart, setXStart] = useState(0);
  const [yStart, setYStart] = useState(0);
  const [zStart, setZStart] = useState(0);
  const [xEnd, setXEnd] = useState(2);
  const [yEnd, setYEnd] = useState(2);
  const [zEnd, setZEnd] = useState(2);

  useEffect(() => {
    if (selectedObject) {
      setXStart(selectedObject.x_start);
      setYStart(selectedObject.y_start);
      setZStart(selectedObject.z_start);
      setXEnd(selectedObject.x_end);
      setYEnd(selectedObject.y_end);
      setZEnd(selectedObject.z_end);
    }
  }, [selectedObject]);

  if (!selectedObject) {
    return <div className="p-3">선택된 객체가 없습니다.</div>;
  }

  return (
    <div className="p-3 border rounded bg-gray-100">
      <h3 className="text-lg font-bold">객체 수정</h3>

      {/* 🔹 위치 변경 */}
      <label className="block">위치 변경 (X_start, Y_start, Z_start)</label>
      <div className="flex gap-2">
        <input type="number" className="p-2 border rounded w-1/3" value={xStart} onChange={(e) => setXStart(Number(e.target.value))} />
        <input type="number" className="p-2 border rounded w-1/3" value={yStart} onChange={(e) => setYStart(Number(e.target.value))} />
        <input type="number" className="p-2 border rounded w-1/3" value={zStart} onChange={(e) => setZStart(Number(e.target.value))} />
      </div>

      {/* 🔹 크기 변경 */}
      <label className="block mt-2">크기 변경 (X_end, Y_end, Z_end)</label>
      <div className="flex gap-2">
        <input type="number" className="p-2 border rounded w-1/3" value={xEnd} onChange={(e) => setXEnd(Number(e.target.value))} />
        <input type="number" className="p-2 border rounded w-1/3" value={yEnd} onChange={(e) => setYEnd(Number(e.target.value))} />
        <input type="number" className="p-2 border rounded w-1/3" value={zEnd} onChange={(e) => setZEnd(Number(e.target.value))} />
      </div>

      <button
        onClick={() =>
          onUpdate({
            ...selectedObject,
            x_start: xStart,
            y_start: yStart,
            z_start: zStart,
            x_end: xEnd,
            y_end: yEnd,
            z_end: zEnd,
            size: [xEnd - xStart, yEnd - yStart, zEnd - zStart],
            position: [xStart + (xEnd - xStart) / 2, yStart + (yEnd - yStart) / 2, zStart + (zEnd - zStart) / 2], // 📌 중앙 위치 유지
          })
        }
        className="p-2 mt-2 bg-blue-500 text-white rounded w-full"
      >
        크기 및 위치 수정
      </button>
    </div>
  );
}
