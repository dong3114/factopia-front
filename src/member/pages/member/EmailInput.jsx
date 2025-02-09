import { useState, useEffect } from "react";
import InputField from "../../components/inputs/InputField";

export default function EmailInput({ value, onChange, onValidChange }) {
  const [emailId, setEmailId] = useState("");
  const [emailDomain, setEmailDomain] = useState("naver.com");
  const [emailMessage, setEmailMessage] = useState("");

  const selectEmail = ["naver.com", "daum.com", "google.com"];

  // 이메일 형식 검증 함수
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "";
    if (!emailRegex.test(email)) return "❌ 올바른 이메일 형식이 아닙니다.";
    return "✅ 유효한 이메일입니다.";
  };

  // 최종 이메일 값
  const memberEmail = `${emailId}@${emailDomain}`;

  // ✅ 부모에서 받은 value 값을 `emailId`와 `emailDomain`으로 분리하여 적용
  useEffect(() => {
    if (value) {
      const [id, domain] = value.split("@");
      setEmailId(id || "");
      setEmailDomain(domain || "naver.com");
    }
  }, [value]);

  // ✅ 유효성 검사 및 부모 컴포넌트로 값 전달
  useEffect(() => {
    const validationResult = validateEmail(memberEmail);
    setEmailMessage(validationResult);
    const isValid = validationResult.includes("✅");

    console.log("📌 [EmailInput] 부모로 전달되는 이메일:", isValid ? memberEmail : null);
    
    onValidChange(isValid, isValid ? memberEmail : null);
    onChange(memberEmail);  // 부모 상태 업데이트
  }, [emailId, emailDomain]);

  return (
    <div className="flex flex-col w-full max-w-[800px]">
      {/* 이메일 입력 필드 전체 컨테이너 */}
      <div className="flex items-center gap-2 w-full">
        {/* 이메일 아이디 입력 필드 */}
        <div className="w-2/5">
          <InputField
            label="이메일"
            type="text"
            name="emailId"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            showButton={false}
            className="w-full"
          />
        </div>

        {/* @ 기호 */}
        <span className="text-lg text-center w-1/5"> @ </span>

        {/* 이메일 도메인 선택 (Select Box) */}
        <div className="w-2/5">
          <select
            name="emailDomain"
            value={emailDomain}
            onChange={(e) => setEmailDomain(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            {selectEmail.map((domain) => (
              <option key={domain} value={domain}>
                {domain}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 유효성 검증 메시지 (아이디 + @ + 도메인 아래) */}
      <div className="text-sm mb-4">
        {emailMessage && (
          <p className={emailMessage.includes("✅") ? "text-green-500" : "text-red-500"}>
            {emailMessage}
          </p>
        )}
      </div>
    </div>
  );
}
