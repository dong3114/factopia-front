import { useEffect, useState } from "react";
import DashboardUI from "../../../components/factory/dashboard/DashBoardUI";
import useAuthStore from "../../../../service/store/AuthStore";
import DashboardContent from "../../../components/factory/dashboard/DashBoardConten";
import { FactoryRepository } from "../../../../service/repository";

export default function DashboardLayout() {
  const [factories, setFactories] = useState([]);
  const [thumbnails, setThumnails] = useState([]);
  const { userInfo } = useAuthStore()
  const enterpriseNo = userInfo?.enterpriseNo; // 사용자의 기업번호 (실제 로그인된 정보에서 가져와야 함)

  // 📌 DB에서 공장 정보 조회
  useEffect(() => {
    if (!enterpriseNo) return;
    
    FactoryRepository.factoryAllData()
      .then((data) => {
        console.log("✅ 공장 데이터 불러오기 성공:", data);
        setFactories(data.factorySites);
        setThumnails(data.thumbnails);
      })
      .catch((error) => {
        console.error("❌ 공장부지 정보를 불러오는데 실패했습니다.", error);
      });
  }, [enterpriseNo]);

  // 📌 새로운 공장 추가
  const addFactory = (newFactory) => {
    setFactories((prev) => [...prev, newFactory]);
  };

  return (
    <div className="flex h-screen">
      <DashboardUI addFactory={addFactory}/>
      <DashboardContent factories={factories} thumbnails={thumbnails} />
    </div>
  );
}