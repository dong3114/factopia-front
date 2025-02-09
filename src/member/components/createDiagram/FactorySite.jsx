export default function FactorySite({ data, onSelect }) {
  return (
    <group onClick={() => onSelect(data)}>
      <mesh position={data.position}>
        <boxGeometry args={data.size} />
        <meshStandardMaterial color="gray" wireframe />
      </mesh>
    </group>
  )
}