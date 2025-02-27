import { useState } from "react";
import useAuthStore from "../../../../service/store/AuthStore";
import { useNavigate } from "react-router-dom";
import { FactoryRepository } from "../../../../service/repository";

export default function DashboardUI({ addFactory }) {
  const navigate = useNavigate();
  const { userInfo } = useAuthStore();
  const enterpriseNo = userInfo?.enterpriseNo;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [width, setWidth] = useState("");  // X축
  const [height, setHeight] = useState(""); // Y축 (복구)
  const [depth, setDepth] = useState("");  // Z축

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // 📌 ID 생성 함수 (DB 저장 전 임시 ID)
  const generateName = (type) => {
    const count = factories.filter(item => item.type === type).length + 1;
    return `${type}_${count}`;
  };

  const handleCreateFactory = async () => {
    if (!enterpriseNo) {
      console.error("❌ 기업 번호가 없습니다.");
      return;
    }

    const factoryName = generateName("factory");

    const newFactory = {
      enterpriseNo: enterpriseNo,
      factorySiteName: factoryName, // 초기 네이밍
      totalWidth: width,  // X축
      totalHeight: height, // Y축 (추가)
      totalDepth: depth,  // Z축      
    }

    // 📌 DB에 실제 공장 데이터 저장 요청
    FactoryRepository.createFactory({
      e_no: enterpriseNo,
      name: factoryName, // 초기 네이밍
      total_width: width,  // X축
      total_height: height, // Y축 (추가)
      total_depth: depth,  // Z축
    })
    .then((savedFactory) => {
      if (!savedFactory) return;

      const newFactory = {
        f_no: savedFactory.f_no,
        e_no: enterpriseNo,
        name: factoryName,
        total_width: width,
        total_height: height,
        total_depth: depth,
        thumbnail: "",
        type: "factory",
      };

      addFactory(newFactory);
      navigate(`/factory/${savedFactory.f_no}`);
    })
    .catch(() => console.error("❌ 공장 생성 실패"));
};

return (
  <div className="p-4">
    <h2 className="text-lg font-bold mb-4">🔧 공장 관리</h2>

    <button className="bg-blue-500 text-white px-4 py-2 w-full rounded-md" onClick={openModal}>
      + 새 공장 만들기
    </button>

    {isModalOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-md w-96">
          <h2 className="text-xl font-bold mb-4">새 공장 생성</h2>

          <label className="block text-sm mb-1">너비 (m) - X축</label>
          <input type="number" value={width} onChange={(e) => setWidth(e.target.value)} className="border p-2 w-full mb-2" />

          <label className="block text-sm mb-1">높이 (m) - Y축</label>
          <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="border p-2 w-full mb-2" />

          <label className="block text-sm mb-1">깊이 (m) - Z축</label>
          <input type="number" value={depth} onChange={(e) => setDepth(e.target.value)} className="border p-2 w-full mb-2" />

          <div className="flex justify-between mt-4">
            <button className="bg-gray-400 text-white px-4 py-2 rounded-md" onClick={closeModal}>
              취소
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded-md" onClick={handleCreateFactory}>
              ✅ 생성하기
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);
}