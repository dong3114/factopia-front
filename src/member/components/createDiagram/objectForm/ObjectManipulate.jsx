import { useState } from "react";

export default function ObjectManipulate({ setCameraMode, setMoveMode }) {
  return (
    <>
      <button onClick={() => setCameraMode((prev) => !prev)} className="p-2 mt-2 bg-yellow-500 text-white rounded w-full">
        카메라 보기 모드
      </button>

      <button onClick={() => setMoveMode((prev) => !prev)} className="p-2 mt-2 bg-orange-500 text-white rounded w-full">
        도형 이동 모드
      </button>

      <p className="text-sm mt-2 text-gray-500">📌 Shift + 마우스 드래그로 도형 직접 이동 가능</p>
    </>
  );
}
