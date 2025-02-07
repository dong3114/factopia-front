import { useState } from "react";
import IdInput from "./IdInput";
import PasswordInput from "./PasswordInput";
import FormWrapper from "../../components/wrapper/RegisterWrapper";
import EmailInput from "./EmailInput";
import PhoneNumberInput from "./PhoneNumberInput";
import RegisterButton from "./RegisterButton";
import NameInput from "./NameInput";
import { useNavigate } from "react-router-dom";

 export default function MemberRegister() {
  const [memberId, setMemberId] = useState(null);
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [memberName, setMemberName] = useState(null);

  const [isIdValid, setIsIdValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isMemberNameValid, setIsMemberNameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);

  const navigate = useNavigate("");

  const isValid = isIdValid && isPasswordValid && isMemberNameValid && isEmailValid && isPhoneValid;

  const memberData = {
    memberId: memberId || "",
    memberPw: password || "",
    memberName: memberName || "",
    memberPhone: phoneNumber || "",
    memberEmail: email || "",
  };

  const handleSubmit = () => {
    console.log("📌 최신 이메일:", email);
    alert("회원가입이 완료되었습니다!");
    navigate("/");
  };

  return (
    <FormWrapper>
      <h2 className="text-xl font-semibold mb-4">회원가입</h2>
      <IdInput value={memberId} onChange={setMemberId} onValidChange={setIsIdValid}/>
      <PasswordInput value={password} onChange={setPassword} onValidChange={setIsPasswordValid}/>
      <NameInput value={memberName} onChange={setMemberName} onValidChange={setIsMemberNameValid}/>
      <EmailInput value={email} onChange={setEmail} onValidChange={setIsEmailValid}/>
      <PhoneNumberInput value={phoneNumber} onChange={setPhoneNumber} onValidChange={setIsPhoneValid} />

      {/* 회원가입 버튼 */}
      <RegisterButton isValid={isValid} onSubmit={handleSubmit} memberData={memberData}/>
    </FormWrapper>
  );
 }