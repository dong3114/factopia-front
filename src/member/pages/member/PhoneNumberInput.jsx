import { useState, useEffect } from "react";
import InputField from "../../components/inputData/InputField";

export default function PhoneNumberInput({ value, onChange, onValidChange }) {
  const [phoneNumber, setPhoneNumber] = useState("010 - ");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const numericValue = phoneNumber.replace(/\D/g, "").slice(3);
    const isValidFormat = numericValue.length === 8;
    setIsValid(isValidFormat);
    onValidChange(isValidFormat, isValidFormat ? phoneNumber : null);
  }, [phoneNumber]);

  const handleChange = (e) => {
    let rawValue = e.target.value.replace(/\D/g, "");

    if (rawValue.startsWith("010")) {
      rawValue = rawValue.slice(3);
    } else {
      rawValue = "";
    }

    rawValue = rawValue.slice(0, 8);

    let formattedNumber =
      "010 - " + (rawValue.length > 4 ? `${rawValue.slice(0, 4)} - ${rawValue.slice(4)}` : rawValue);

    setPhoneNumber(formattedNumber);
    onChange(formattedNumber);
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-[800px]">
      <InputField
        label="전화번호"
        type="text"
        name="phoneNumber"
        value={phoneNumber}
        onChange={handleChange}
        validationMessage={isValid ? "✅ 올바른 전화번호 형식입니다." : "❌ 전화번호를 정확히 입력하세요."}
      />
    </div>
  );
}
