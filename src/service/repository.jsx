import FCapi from "./FCapi";
import useAuthStore from "./store/AuthStore";

// 회원 관리
export const MemberRepository = {
  login: async (memberId, memberPw) => {
    return FCapi.post("member/login", { memberId, memberPw })
      .then((response) => {
        const { token } = response.data;
        // Zustand 상태 업데이트
        useAuthStore.getState().login(token);
        console.log("로그인 성공", response);
        return response;
      })
      .catch((error) => {
        console.error("로그인 실패", error);
        return Promise.reject(error);
      })
  },
  
  registerMember: async (memberData) => {
    return FCapi.post("/member/register/request", memberData)
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
    return FCapi.put("/member/register/validate/id", null, { params: { memberId } })
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
// 공장 관리
export const FactoryRepository = {
    
}

