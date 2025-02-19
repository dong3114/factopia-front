import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginModal from "../../modal/LoginModal";
import { MemberRepository } from "../../../service/repository"
import useAuthStore from "../../../service/store/AuthStore";

export default function LayoutHeader() {
  const [ showLoginModal, setShowLoginModal ] = useState(false);
  const { userInfo, logout } = useAuthStore();
  const memberNo = userInfo?.memberNo || null;
  const navigate = useNavigate();

  const toggleModal = () => {
    setShowLoginModal(!showLoginModal);
  };
  // 로그인
  const handleLogin = async (memberId, memberPw) => {
    return MemberRepository.login(memberId, memberPw)
    .then(() => setShowLoginModal(false))
    .catch((error) => {
      console.error("로그인 실패: ", error);
    });
  };
  // 로그아웃
  const handleLogout = () => {
    // `${memberName}님이 로그아웃 하셨습니다.` 로 추가할 예정
    alert("로그아웃 하셨습니다.");
    logout();
    navigate("/");
  };
  // 회원가입
  const handleSignup = () => {
    navigate("/member/register");
    setShowLoginModal(false);
  };

  return (
    <div className="bg-white border-b shadow-md w-full flex justify-center">
      <div className="w-full max-w-7xl px-4 md:px-16 lg:px-24 xl:px-32 flex items-center justify-between h-20">
        {/* Left Section: 로고와 메뉴 리다이렉트 */}
        <div className="flex items-center gap-6">
          <Link to="/" className="block w-24 h-12 bg-gray-300 flex items-center justify-center">
            <div className="text-base font-bold">로고이미지</div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6">
            <Link to="/announce" className="text-gray-700 hover:text-blue-600 text-base font-bold">
              공지사항
            </Link>
            <Link to="/factory/creator" className="text-gray-700 hover:text-blue-600 text-base font-bold">
              Work / 작업
            </Link>
          </div>
        </div>

        {/* Right Section: 로그인 상태에 따른 변경 */}
        <div className="flex items-center gap-4">
          { memberNo ? (
            // ✅ 로그인 상태: 프로필 & 로그아웃 버튼 표시
            <>
              <div className="px-4 py-2 bg-gray-100 text-gray-700 text-base font-bold rounded">
                {userInfo.enterpriseNo} {/* 기업 번호 표시 */}
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white text-base font-bold rounded hover:bg-red-600 cursor-pointer"
              >
                로그아웃
              </button>
            </>
          ) : (
            // ❌ 비로그인 상태: 로그인/회원가입 버튼 표시
            <button
              onClick={toggleModal}
              className="px-4 py-2 bg-blue-500 text-white text-base font-bold rounded hover:bg-blue-600 cursor-pointer"
            >
              로그인 / 회원가입
            </button>
          )}
        </div>
      </div>

      {/* Modal */}
      <LoginModal
        showLoginModal={showLoginModal}
        onClose={toggleModal}
        onMemberLogin={handleLogin}
        onSignup={handleSignup}
      />
    </div>
  );
}
