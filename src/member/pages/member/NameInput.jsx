import { useEffect, useState } from "react";
import InputField from "../../components/inputs/InputField";

export default function NameInput({ value, onChange, onValidChange }) {
  const [nameMessage, setNameMessage] = useState("");
  const [isValid, setIsValid] = useState(false);

  // 유효성 검사 함수
  const validateName = (name) => {
    if (!name) {
      setNameMessage("❌ 필수 입력란입니다.");
      return false;
    }
    if (name.length < 2) { // 이름 최소 길이 검증 (8자가 너무 길다면 현실적인 2자로 수정)
      setNameMessage("❌ 이름은 최소 2자 이상이어야 합니다.");
      return false;
    }
    setNameMessage("✅ 올바른 형식입니다.");
    return true;
  };

  // value 변경 시 유효성 검사 실행 & 부모로 전달
  useEffect(() => {
    const isValidName = validateName(value);
    setIsValid(isValidName);
    onValidChange(isValidName);
  }, [value]);

  return (
    <div className="flex flex-col gap-4 w-full max-w-[800px]">
      <InputField
        label="이름"
        type="text"
        name="memberName"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        validationMessage={nameMessage}
        showButton={false}
        className="w-full"
      />
    </div>
  );
}
