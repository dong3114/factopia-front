import { useNavigate } from "react-router-dom";

export default function PageMove({ selectedObject }) {
  const navigate = useNavigate();

  const handleNavigate = (type) => {
    if (!selectedObject) return alert("먼저 이동할 객체를 선택하세요.");

    switch (type) {
      case "factorySite":
        navigate(`/api/factory/creator/factory_site`);
        break;
      case "factoryZone":
        navigate(`/api/factory/creator/factory_zone`);
        break;
      case "factorySection":
        navigate(`/api/factory/creator/factory_section`);
        break;
      default:
        break;
    }
  };

  return handleNavigate;
}
