import axios from "axios";

// 기본 API URL 설정 (환경변수에서 가져오거나 기본값 사용)
const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:9091/api";

// Axios 인스턴스 생성
const FCapi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // JWT 인증 등 세션 쿠키 필요 시 추가
});

// 공통 에러 처리 인터셉터 설정
FCapi.interceptors.response.use(
  (response) => response, // 응답이 정상일 경우 그대로 반환
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      const message = data?.message || "알 수 없는 백엔드 오류";
      console.error(`[백엔드 오류] 상태코드: ${status}, 메시지: ${message}`);
    } else if (error.request) {
      console.error("[프론트엔드 오류] 요청이 백엔드에 도달하지 못했습니다.");
    } else {
      console.error("[프론트엔드 오류] 요청 처리 중 문제가 발생했습니다.");
    }
    return Promise.reject(error); // 오류를 그대로 반환하여 개별 요청에서 처리할 수 있도록 함
  }
);

export default FCapi;
