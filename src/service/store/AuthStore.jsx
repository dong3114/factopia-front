import { create } from "zustand"
import { persist } from "zustand/middleware"

const useAuthStore = create(
  persist(
    (set) => ({
      userInfo: {
        memberNo: null, // 회원코드
        enterpriseNo: null, // 기업코드
        token: null,  // JWT 토큰
        expires: null,  // 만료시간
        isAuthenticated: false, // 로그인 여부
      },

      // 성공 시 상태 업데이트
      login: (memberNo, enterpriseNo, token, expires) => {
        set({
          memberNo,
          enterpriseNo,
          token,
          expires,
          isAuthenticated: true,
        });
      },

      // 로그아웃 처리
      logout: () => {
        set({
          memberNo: null,
          enterpriseNo: null,
          token: null,
          expires: null,
          isAuthenticated: false,
        });
      },

      // 토큰 갱신
      refreshToken: (token, expires) => {
        set({ token, expires });
      },
    }),
    {
      name: "factopia-auth",
      getStorage: () => sessionStorage,
    }

  )
);

export default useAuthStore;