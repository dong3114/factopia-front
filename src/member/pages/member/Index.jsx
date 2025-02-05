import { useState } from "react";
import IdInput from "./IdInput";
import PasswordInput from "./PasswordInput";
import FormWrapper from "./RegisterWrapper";

 export default function MemberRegister() {
  const [memberId, setMemberId] = useState("");
  const [password, setPassword] = useState("");

  return (
    <FormWrapper>
      <h2 className="text-xl font-semibold mb-4">회원가입</h2>
      <IdInput value={memberId} onChange={(e) => setMemberId(e.target.value)} />
      <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
    </FormWrapper>
  );
 }