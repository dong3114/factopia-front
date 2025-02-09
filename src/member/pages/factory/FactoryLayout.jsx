import { Outlet } from "react-router-dom";

export default function FactoryLayout() {
  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <Outlet /> {/* 자식 라우트가 여기에 동적으로 렌더링됨 */}
    </div>
  );
}
