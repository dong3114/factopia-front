export default function DeleteButton({ onDelete }) {
  return (
    <button onClick={onDelete} className="p-2 mt-2 bg-red-500 text-white rounded w-full">
      삭제
    </button>
  );
}
