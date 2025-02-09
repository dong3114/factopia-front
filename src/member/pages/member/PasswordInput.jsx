import { useState, useEffect } from "react";
import InputField from "../../components/inputs/InputField";

export default function PasswordInput({ value, onChange, onValidChange }) {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isConfirmValid, setIsConfirmValid] = useState(false);

  // 비밀번호 유효성 검사 함수
  const validatePassword = (password) => {
    const passwordCheck =
      /^(?=.*[0-9])(?=.*[!@#$%^&*()_+{}:;<>,.?/~`|\-])(?=.*[A-Za-z])[A-Za-z0-9!@#$%^&*()_+{}:;<>,.?/~`|\-]/;

    if (!password) return "❌ 필수 입력란입니다.";
    if (!passwordCheck.test(password))
      return "❌ 숫자와 특수문자를 하나 이상 포함해주세요.";
    if (password.length < 8) return "❌ 최소 8자 이상이어야 합니다.";
    if (password.length > 16) return "❌ 최대 16자까지 입력 가능합니다.";
    return "✅ 사용 가능한 비밀번호 형식입니다.";
  };

  // 비밀번호 확인 검증 함수
  const validateConfirmPassword = (confirmPw) => {
    if (!confirmPw) return "";
    if (confirmPw !== value) return "❌ 비밀번호가 일치하지 않습니다.";
    return "✅ 비밀번호가 일치합니다.";
  };

  useEffect(() => {
    // 비밀번호 유효성 검사 실행
    const passwordValidationResult = validatePassword(value);
    setPasswordMessage(passwordValidationResult);
    const isValidPassword = passwordValidationResult.includes("✅");
    setIsPasswordValid(isValidPassword);

    // 비밀번호 확인 검사 실행
    const confirmValidationResult = validateConfirmPassword(confirmPassword);
    setConfirmMessage(confirmValidationResult);
    const isValidConfirm = confirmValidationResult.includes("✅");
    setIsConfirmValid(isValidConfirm);

    // **비밀번호가 유효하고 && 비밀번호 확인이 동일해야 `true + value` 전달**
    onValidChange(isValidPassword && isValidConfirm, (isValidPassword && isValidConfirm) ? value : null);
  }, [value, confirmPassword]);

  return (
    <div className="flex flex-col gap-4 w-full max-w-[800px]">
      {/* 비밀번호 입력 */}
      <InputField
        label="비밀번호"
        type="password"
        name="memberPw"
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
        onChange={(e) => setConfirmPassword(e.target.value)}
        validationMessage={confirmMessage}
        showButton={false}
        className="w-full"
      />
    </div>
  );
}
