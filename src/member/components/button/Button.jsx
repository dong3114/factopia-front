export default function ActionButton({ text, onClick, disabled = false, className = "" }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {text}
    </button>
  );
}
