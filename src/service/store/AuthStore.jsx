import { create } from "zustand";
import { persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";

const tokenName = "jwtToken"; // ✅ 저장할 토큰 키

const useAuthStore = create(
  persist(
    (set, get) => ({
      userInfo: null, // ✅ 초기값을 `null`로 설정 (불필요한 `{}` 방지)

      // ✅ 로그인 시 상태 업데이트
      login: (token) => {
        if (!token) {
          console.warn("🚨 [로그인 실패] 받은 토큰이 null이므로 저장하지 않음.");
          return;
        }

        sessionStorage.setItem(tokenName, token);
        console.log("🗄 [sessionStorage 저장 완료] →", sessionStorage.getItem(tokenName));

        const decoded = jwtDecode(token);
        console.log("📜 [JWT Decode] 디코딩된 토큰 →", decoded);

        set({
          userInfo: {
            token,
            memberNo: decoded.sub,
            enterpriseNo: decoded.e_no,
          },
        });

        console.log("✅ [Zustand 상태 저장 완료] userInfo →", get().userInfo);
      },

      // ✅ 로그아웃: 상태 초기화 + sessionStorage & localStorage 강제 삭제
      logout: () => {
        console.log("🚪 [로그아웃] 상태 초기화");
        sessionStorage.removeItem(tokenName);
        useAuthStore.persist.clearStorage(); // persist 스토리지 삭제
        set({ userInfo: null }); // 전체 상태를 빈 객체로 대체하지 않고 userInfo만 null로 설정
        console.log("🗑 [삭제 완료] sessionStorage & localStorage");
      },

      // ✅ 세션 복구: sessionStorage에서 가져와서 자동 복구
      restoreSession: () => {
        console.log("🔄 [세션 복구] 실행됨");
        
        const token = sessionStorage.getItem(tokenName);

        if (!token) {
          console.warn("🚨 [세션 복구 실패] 저장된 토큰 없음.");
          useAuthStore.persist.clearStorage();
          return;
        }

        try {
          const decoded = jwtDecode(token);

          // ✅ 만료된 토큰인지 검사
          if (decoded.exp * 1000 < Date.now()) {
            console.warn("🚨 [세션 복구 실패] 토큰이 만료되었습니다.");
            useAuthStore.persist.clearStorage(); // ✅ 상태 초기화 및 factopia-auth 삭제
            set({ userInfo: null });
            return;
          }

          set({
            userInfo: {
              token,
              memberNo: decoded.sub,
              enterpriseNo: decoded.e_no,
            },
          });

          console.log("✅ [세션 복구 완료] 상태 →", get().userInfo);
        } catch (error) {
          console.error("🚨 [세션 복구 오류] JWT 파싱 실패:", error);
          sessionStorage.removeItem(tokenName);
          useAuthStore.persist.clearStorage(); // ✅ 상태 초기화 및 factopia-auth 삭제
        }
      },
    }),
    {
      name: "factopia-auth", // ✅ persist 저장 키
      getStorage: () => sessionStorage, // ✅ sessionStorage 사용
      partialize: (state) => ({ userInfo: state.userInfo }),
    }
  )
);

// ✅ 앱 실행 시 로그인 상태 복구
useAuthStore.getState().restoreSession();

export default useAuthStore;
