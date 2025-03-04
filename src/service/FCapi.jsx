import axios from "axios";
import useAuthStore from "../service/store/AuthStore";

// 기본 API URL 설정
const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:9091/api";

// Axios 인스턴스 생성
const FCapi = axios.create({
  baseURL: BASE_URL,
  headers: {"Content-Type": "application/json" },
  withCredentials: false, // JWT 인증 등 세션 쿠키 필요 시 추가
});

// 요청 인터셉터: JWT 자동 추가
FCapi.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().userInfo?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터: 공통 에러 처리
FCapi.interceptors.response.use(
  (response) => response, // 정상 응답 그대로 반환
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      // ✅ 401: 인증 실패 → 자동 로그아웃 및 리다이렉트
      if (status === 401) {
        console.warn("🚨 인증 실패 - 자동 로그아웃 처리");
        useAuthStore.getState().logout();
        window.location.href = "/";
        return Promise.reject(new Error("인증이 만료되었습니다. 다시 로그인하세요"));
      }

      // ✅ 403: 접근 제한 (권한 부족)
      if (status === 403) {
        console.warn("🚨 접근 제한 - 권한 없음");
        alert("접근 권한이 없습니다.");
        return Promise.reject(new Error("권한이 없습니다."));
      }

      // ✅ 404: API 없음 → 단순 로그 출력 (로그아웃 X)
      if (status === 404) {
        console.warn("🚨 존재하지 않는 API 요청 (404 Not Found)");
        return Promise.reject(new Error("존재하지 않는 API 요청입니다."));
      }

      // ✅ 기타 백엔드 오류 처리
      const message = data?.message || "알 수 없는 백엔드 오류";
      console.error(`[백엔드 오류] 상태코드: ${status}, 메시지: ${message}`);
    } else if (error.request) {
      console.error("[프론트엔드 오류] 요청이 백엔드에 도달하지 못했습니다.");
    } else {
      console.error("[프론트엔드 오류] 요청 처리 중 문제가 발생했습니다.");
    }

    return Promise.reject(error);
  }
);

export default FCapi;
