export default function CreateButtonGroup({ onCreateObject }) {
  return (
    <div className="p-3 border rounded bg-gray-100">
      <h3 className="text-lg font-bold">공장 관리</h3>

      <button
        onClick={() => onCreateObject("factorySite")}
        className="p-2 mt-2 bg-green-500 text-white rounded w-full"
      >
        공장부지 생성
      </button>

      <button
        onClick={() => onCreateObject("factoryZone")}
        className="p-2 mt-2 bg-blue-500 text-white rounded w-full"
      >
        공장구역 생성
      </button>

      <button
        onClick={() => onCreateObject("factorySection")}
        className="p-2 mt-2 bg-purple-500 text-white rounded w-full"
      >
        공장사용구역 생성
      </button>
    </div>
  );
}
