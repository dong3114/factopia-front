
export default function FactorySection({ data, onSelect }) {
  return (
    <group onClick={() => onSelect(data)}> {/* 클릭 시 선택 */}
      <mesh position={data.position}>
        <boxGeometry args={data.size} />
        <meshStandardMaterial color="green" />
      </mesh>
    </group>
  );
}
