import FCapi from "./FCapi";

export const MemberRepository = {
  registerMember: async (memberData) => {
    return FCapi.post("/register/request", memberData)
      .then((response) => {
        console.log("회원가입 성공: ", response);
        return response;
      })
      .catch((error) => {
        console.error("회원가입 실패: ", error);
        return Promise.reject(error);
      })
  },

  checkMemberId: async (memberId) => {
    return FCapi.put("/register/validate/id", null, { params: { memberId } })
      .then((response) => {
        console.log("✅ 아이디 유효성 체크:", response);
        return response;
      })
      .catch((error) => {
        console.error("❌ 아이디 유효성 체크 실패:", error);
        return Promise.reject(error);
      });
  },


}