export const CaptureThumbnail = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("data:image/png;base64,..."); // 더미 데이터 (Three.js 캡처 구현 필요)
    }, 500);
  });
};
