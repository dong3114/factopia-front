import { useState } from "react";
import IdInput from "./IdInput";
import PasswordInput from "./PasswordInput";

 export default function MemberRegister() {
  const [memberId, setMemberId] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col items-center box-border p-4">
      <h2>회원가입</h2>
      <IdInput value={memberId} onChange={(e) => setMemberId(e.target.value)} />
      <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
    </div>
  );
 }