import FactoryThumbnail from "../thumnail/FactoryThumbnail";

export default function DashboardContent({ factories, thumbnails }) {
  console.log("[DashboardContent] factories: ", factories);
  console.log("[DashboardContent] thumbnails: ", thumbnails);

  return (
    <div className="grid grid-cols-4 gap-4 p-4 place-items-start">
      {factories.map((factory, index) => (
        <div key={factory.factoryNo} className="flex flex-col items-start">
          {/* 📌 썸네일만 표시 */}
          <FactoryThumbnail thumbnail={thumbnails[index]} />

          {/* 📌 공장 이름 표시 */}
          <h3 className="mt-2 text-lg font-semibold text-left w-full">
            {factory.factorySiteName || `공장 ${factory.factoryNo}`}
          </h3>

          {/* 📌 공장 크기 표시 */}
          <p className="text-sm text-gray-600 text-left w-full">
            Size: {factory.totalWidth} x {factory.totalDepth}
          </p>
        </div>
      ))}
    </div>
  );
}
