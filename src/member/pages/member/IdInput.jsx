import { useState } from "react";
import InputField from "../../components/inputData/InputField";
import { MemberRepository } from "../../../service/repository";

export default function IdInput({ value, onChange }) {
  const [validationMessage, setValidationMessage] = useState("");
  const [isChecking, setIsChecking] = useState(false);

  // 아이디 유효성 검사
  const validateId = (id) => {
    const englishOnlyRegex = /^[a-zA-Z0-9]*$/;
    if (!id) return "";
    if (!englishOnlyRegex.test(id)) return "❌ 아이디는 영문과 숫자만 입력 가능합니다.";
    if (id.length < 4) return "❌ 아이디는 최소 4자 이상이어야 합니다.";
    if (id.length > 12) return "❌ 아이디는 최대 12자까지 입력 가능합니다.";
    return "✅ 사용 가능한 아이디 형식입니다.";
  };

  // 아이디 중복 체크 (✔ 버튼 클릭 시 실행)
  const checkIdAvailability = () => {
    console.log("입력한 아이디:", value);
    if (!value) {
      setValidationMessage("❌ 아이디를 입력해주세요.");
      return;
    }

    // 유효성 검사 실행
    const validationResult = validateId(value);
    if (!validationResult.includes("✅")) {
      setValidationMessage(validationResult);
      return;
    }

    setIsChecking(true);

    // API 요청 후 처리
    MemberRepository.checkMemberId(value)
      .then((response) => {
        console.log("서버 응답: ", response);
        setValidationMessage(response.data.isValid ? "✅ 사용 가능한 아이디입니다." : "❌ 중복된 아이디입니다.");
      })
      .catch((error) => {
        console.log("서버오류: ", error);
        setValidationMessage(error.response?.data?.message || "❌ 서버 오류 발생. 다시 시도해주세요.");
      })
      .finally(() => {
        setIsChecking(false); // 로딩 상태 해제
      });
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-[800px]">
      <InputField 
        label="아이디" 
        type="text" 
        name="memberId" 
        value={value} 
        onChange={onChange} 
        onValidate={validateId} 
        validationMessage={validationMessage} 
        showButton={true}  // ✔ 버튼 표시
        onCheck={checkIdAvailability} // 중복 체크 함수 전달
        className="w-full"
      />
    </div>
  );
}
