import { jwtDecode } from "jwt-decode";
import { create } from "zustand"
import { persist } from "zustand/middleware"

const tokenName = "factopia-token";
const useAuthStore = create(
  persist(
    (set, get) => ({
      userInfo: {
        token: null,
        memberNo: null, 
        enterpriseNo: null,
      },

      // 로그인 시 상태 업데이트
      login: (token) => {
        sessionStorage.setItem(tokenName, token);
        const decoded = jwtDecode(token);
        
        set({ 
          userInfo: {
            token,
            memberNo: decoded.sub,
            enterpriseNo: decoded.e_no
          }
        });
      },

      // 로그아웃 처리
      logout: () => {
        sessionStorage.removeItem(tokenName);
        set({ 
          userInfo: {
            token: null, 
            memberNo: null, 
            enterpriseNo: null
          }
        });
      },

      // 새로고침을 해도 sessionStorage를 통해 상태 복구
      restoreSession: () => {
        const token = sessionStorage.getItem(tokenName);
        if(token) {
          const decode = jwtDecode(token);
        set({
          userInfo: {
            token,
            memberNo: decode.sub,
            enterpriseNo: decode.e_no
          }
        });
        }
      }
    }),
    {
      name: "factopia-auth",
      getStorage: () => sessionStorage,
    }

  )
);

// 앱이 실행될 때 로그인 상태 복구
useAuthStore.getState().restoreSession();

export default useAuthStore;