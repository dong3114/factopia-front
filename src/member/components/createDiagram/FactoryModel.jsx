import React from "react";

// 카테고리에 따른 도형 지정
const SHAPE_MAP = {
  사람: "sphere",
  공장: "box",
  설비: "box",
};

// 카테고리에 따른 색상 지정
const COLOR_MAP = {
  사람: "red",
  공장: "blue",
  설비: "green",
};

// 공통 3D 모델 컴포넌트
export default function FactoryModel({ typeData, position, size }) {
  const { category, type } = typeData;
  const shape = SHAPE_MAP[category] || "box";
  const color = COLOR_MAP[category] || "gray";

  return (
    <mesh position={position}>
      {shape === "box" && <boxGeometry args={size} />}
      {shape === "sphere" && <sphereGeometry args={[0.5, 16, 16]} />}
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
