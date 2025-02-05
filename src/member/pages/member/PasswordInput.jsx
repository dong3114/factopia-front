import { useState } from "react";
import InputField from "../../components/inputData/InputField";

export default function PasswordInput({ value, onChange }) {
  const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인 필드
  const [passwordMessage, setPasswordMessage] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");

  // 비밀번호 유효성 검사 함수
  const validatePassword = (password) => {
    const passwordCheck =
      /^(?=.*[0-9])(?=.*[!@#$%^&*()_+{}:;<>,.?/~`|\-])(?=.*[A-Za-z])[A-Za-z0-9!@#$%^&*()_+{}:;<>,.?/~`|\-]/;

    if (!password) return "";
    if (!passwordCheck.test(password))
      return "❌ 숫자와 특수문자를 하나 이상 포함해주세요.";
    if (password.length < 8) return "❌ 최소 8자 이상이어야 합니다.";
    if (password.length > 16) return "❌ 최대 16자까지 입력 가능합니다.";
    return "✅ 사용 가능한 비밀번호 형식입니다.";
  };

  // 비밀번호 확인 검증
  const validateConfirmPassword = (confirmPw) => {
    if (!confirmPw) return "";
    if (confirmPw !== value) return "❌ 비밀번호가 일치하지 않습니다.";
    return "✅ 비밀번호가 일치합니다.";
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-[800px]">
      {/* 비밀번호 입력 */}
      <InputField
        label="비밀번호"
        type="password"
        name="memberPw"
        value={value}
        onChange={(e) => {
          onChange(e); // 부모의 상태 업데이트
          setPasswordMessage(validatePassword(e.target.value)); // 유효성 검사 실행
        }}
        validationMessage={passwordMessage}
        showButton={false}
        className="w-full"
      />

      {/* 비밀번호 확인 입력 */}
      <InputField
        label="비밀번호 확인"
        type="password"
        name="confirmPw"
        value={confirmPassword}
        onChange={(e) => {
          setConfirmPassword(e.target.value);
          setConfirmMessage(validateConfirmPassword(e.target.value));
        }}
        validationMessage={confirmMessage}
        showButton={false}
        className="w-full"
      />
    </div>
  );
}
