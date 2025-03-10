export default function FactoryThumbnail({ thumbnail }) {
  return (
    <div className="w-32 h-32 flex items-center justify-center bg-gray-300 rounded-lg shadow-md">
      {thumbnail ? (
        <img 
          src={`data:image/png;base64,${thumbnail}`} 
          alt="Factory Thumbnail"
          className="w-full h-full object-cover rounded-lg"
        />
      ) : (
        <span className="text-sm text-gray-500">이미지 없음</span>
      )}
    </div>
  );
}
