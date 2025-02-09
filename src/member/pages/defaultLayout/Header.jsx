import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginModal from "../../modal/LoginModal";

export default function LayoutHeader() {
  const [ showLoginModal, setShowLoginModal ] = useState(false);
  const [ memberId, setMemberId ] = useState("");
  const [ memberPassword, setMemberPassword ] = useState("");
  const navigate = useNavigate();

  const toggleModal = () => {
    setShowLoginModal(!showLoginModal);

  };
  const handleLogin = () => {
    console.log("로그인 정보: ", { memberId, memberPassword })
    setShowLoginModal(false);
  }
  const handleSignup = () => {
    console.log("회원가입 경로: " + "/");
    navigate("/");
  }

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

        {/* Right Section: 프로필과 로그인 및 회원가입 */}
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          <button
            onClick={toggleModal}
            className="px-4 py-2 bg-blue-500 text-white text-base font-bold rounded hover:bg-blue-600 cursor-pointer"
          >
            로그인 / 회원가입
          </button>
        </div>
      </div>

      {/* Modal */}
      <LoginModal
        showLoginModal={showLoginModal}
        onClose={toggleModal}
        onMemberLogin={handleLogin}
        onSignup={handleSignup}
        memberId={memberId}
        setMemberId={setMemberId}
        memberPassword={memberPassword}
        setMemberPassword={setMemberPassword}
      />
    </div>
  );
}
