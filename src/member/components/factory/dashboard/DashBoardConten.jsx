import FactoryThumbnail from "../thumnail/FactoryThumbnail";

export default function DashboardContent({ factories, thumbnails }) {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {factories.map((factory) => (
        <FactoryThumbnail 
          key={factory.factoryNo} factory={factory} />
      ))}
    </div>
  );
}