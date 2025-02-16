import { useEffect, useState } from "react";
import DashboardUI from "../../../components/factory/dashboard/DashBoardUI";
import { CaptureThumbnail } from "../../../components/factory/thumnail/CaptureThumnail";
import useAuthStore from "../../../../service/store/AuthStore";
import DashboardContent from "../../../components/factory/dashboard/DashBoardConten";

export default function DashboardLayout() {
  const [factories, setFactories] = useState([]);
  const { userInfo } = useAuthStore()
  const enterpriseNo = userInfo?.enterpriseNo; // 사용자의 기업번호 (실제 로그인된 정보에서 가져와야 함)

  // 📌 DB에서 공장 정보 조회
  useEffect(() => {
    const loadFactories = async () => {
      const factoryData = await fetchFactoriesByEnterprise(enterpriseNo);
      setFactories(factoryData);
    };
    loadFactories();
  }, []);

  // 📌 공장 썸네일 업데이트 (해당 `e_no`의 모든 공장)
  const updateFactoryThumbnail = async () => {
    const updatedThumbnail = await CaptureThumbnail();
    setFactories((prev) =>
      prev.map((factory) => ({
        ...factory,
        thumbnail: updatedThumbnail
      }))
    );
  };

  // 📌 새로운 공장 추가
  const addFactory = (newFactory) => {
    setFactories((prev) => [...prev, newFactory]);
  };

  return (
    <div className="flex h-screen">
      <DashboardUI addFactory={addFactory} updateFactoryThumbnail={updateFactoryThumbnail} factories={factories} />
      <DashboardContent factories={factories} />
    </div>
  );
}