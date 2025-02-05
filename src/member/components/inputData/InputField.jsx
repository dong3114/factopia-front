import { useEffect, useState } from "react";

export default function InputField({ 
  label, 
  type, 
  name, 
  value, 
  onChange, 
  onValidate, 
  validationMessage,
  showButton = false, // 기본값: 버튼 없음
  onCheck
}) {
  const [localMessage, setLocalMessage] = useState("");

  // 입력값이 변경될 때마다 유효성 검사 실행
  useEffect(() => {
    if (onValidate) {
      setLocalMessage(onValidate(value));
    }
  }, [value, onValidate]);

  return (
    <div className="relative mb-4">
      <label className="block text-sm font-medium">{label}</label>
      <div className="relative">
        <input
          type={type}
          name={name}
          value={value || ""}  // undefined 방지
          onChange={onChange}  // 부모 상태 업데이트
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          style={{ maxWidth: "100%" }} 
        />
        {/* ✔ 버튼을 input의 우측 끝에 배치 */}
        {showButton && (
          <button
            type="button"
            onClick={onCheck}  // 부모에서 전달된 중복 체크 함수 실행
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black"
          >
            ✔
          </button>
        )}
      </div>
      
      {/* 유효성 메시지 표시 */}
      {(localMessage || validationMessage) && (
        <p className={`text-sm mt-1 ${validationMessage?.includes("✅") ? "text-green-500" : "text-red-500"}`}>
          {validationMessage || localMessage}
        </p>
      )}
    </div>
  );
}
