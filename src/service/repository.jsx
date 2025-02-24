import FCapi from "./FCapi";
import useAuthStore from "./store/AuthStore";

// 회원 관리
export const MemberRepository = {
  login: async (memberId, memberPw) => {
    console.log("🟢 [로그인 시작] 입력값 →", { memberId, memberPw });

    return FCapi.post("member/login", { memberId, memberPw })
      .then((response) => {
        console.log("🔑 [로그인 성공] 서버 응답 →", response.data);

        const { token } = response.data;

        if (!token) {
          console.error("🚨 [오류] 서버 응답에서 토큰이 없음!");
          return Promise.reject(new Error("토큰을 받을 수 없습니다."));
        }

        // ✅ Zustand 상태 업데이트 (sessionStorage 저장 포함)
        useAuthStore.getState().login(token);
        console.log("✅ [Zustand 상태 업데이트 완료] 저장된 토큰:", useAuthStore.getState().userInfo.token);

        // ✅ sessionStorage 확인 (로그인 후 100ms 대기 후 확인)
        setTimeout(() => {
          console.log("🗄 [sessionStorage 저장 확인] jwtToken:", sessionStorage.getItem("jwtToken"));
        }, 100);

        return response;
      })
      .catch((error) => {
        console.error("❌ [로그인 실패] 에러 →", error);
        return Promise.reject(error);
      });
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
  factoryAllData: async () => {
    const { userInfo } = useAuthStore.getState();

    if(!userInfo || !userInfo.token) {
      console.warn("[API 호출 실패] 사용자 정보 없음 (로그인 필요)");
      return Promise.reject(new Error("로그인이 필요합니다."));
    }

    return FCapi.get('/factory/')
    .then((response) => {
      console.log("공장부지 정보: ", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("❌ 공장부지 정보 조회 실패:", error.message || error);
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

