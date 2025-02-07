import { MemberRepository } from "../../../service/repository";
import ActionButton from "../../components/button/Button";

export default function RegisterButton({ isValid, onSubmit, memberData }) {
  const handleClick = () => {
    if (!isValid) {
      alert("입력 정보를 확인하세요.");
      return;
    }

    console.log("📌 최종 전송할 회원 데이터:", memberData);

    console.log("📌 memberId:", memberData?.memberId);
    console.log("📌 memberPw:", memberData?.memberPw);
    console.log("📌 memberName:", memberData?.memberName);
    console.log("📌 memberEmail:", memberData?.memberEmail);
    console.log("📌 memberPhone:", memberData?.memberPhone);


    MemberRepository.registerMember(memberData)
      .then(response => {
        console.log("회원가입 성공!", response);
        onSubmit();
      })
      .catch(error => {
        console.error("회원가입 실패", error);
      });
  };

  return <ActionButton text="회원가입" onClick={handleClick} disabled={!isValid} />;
}
