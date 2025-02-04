import InputField from "../../components/inputData/InputField";

export default function PasswordInput({ value, onChange }){

  const validatePassword = (password) => {
    // 숫자, 특수문자 포함 
    const passwordCheck = /^(?=.*[0-9])(?=.*[!@#$%^&*()_+{}:;<>,.?/~`|\-])(?=.*[A-Za-z])[A-Za-z0-9!@#$%^&*()_+{}:;<>,.?/~`|\-]{8,16}$/;

    if (!password) return"";
    if(!passwordCheck.test(password)) return "❌ 숫자와 특수문자를 하나이상 포함해주세요.";
    if(password.length < 8) return "❌ 비밀번호는 최소8자 이상이어야 합니다.";
    if(password.length > 16) return "❌ 비밀번호는 최대16자까지 입력 가능 합니다.";
    return "✅ 사용 가능한 비밀번호 형식입니다.";
  };

  return(
    <div className="relative flex items-center">
    <InputField 
      label="비밀번호" 
      type="password" 
      name="memberPw" 
      value={value}
      onChange={onChange}
      validationMessage={validatePassword(value)} 
      showButton={false}  // ✔ 버튼 표시
    />
  </div>
  )



}