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
  factorySiteInfo: async (enterpriseNo) => {
    return FCapi.get(`/factory/${enterpriseNo}`, { params: { e_no: enterpriseNo } })
    .then((response) => {
      console.log("공장부지 정보: ", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("❌ 공장부지 정보 조회 실패:", error);
      return Promise.reject(error);
    });
  },

  createFactory: async (factoryData) => {
    return FCapi.post("factory/create", factoryData)
    .then((response) => {
      console.log("공장부지 생성: ", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("❌ 공장 생성 실패:", error);
      return Promise.reject(error);
    });
  },

  deleteFactory: async (factoryNo) => {
    return FCapi.delete(`/factory/delete/${factoryNo}`)
    .then((response) => {
      console.log("공장부지 삭제성공");
      return response.data || { success: true };
    })
    .catch((error) => {
      console.error("❌ 공장 삭제 실패:", error);
      return Promise.reject(error);
    });
  }
    
}

