import React from "react";
import { useNavigate } from "react-router-dom";

export default function LoginModal({ 
  showLoginModal, onClose, onMemberLogin, onSignup, memberId, setMemberId,
   memberPassword, setMemberPassword }) {

  const navigate = useNavigate();
  if (!showLoginModal) return null;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white w-11/12 max-w-lg rounded shadow-lg p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">로그인 / 회원가입</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-black">
            ✕
          </button>
        </div>
        <div className="mt-4 flex flex-col gap-4">
          <input
            type="id"
            placeholder="아이디"
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={memberPassword}
            onChange={(e) => setMemberPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
          <button 
            onClick={() => {
              onMemberLogin();
              onClose();
            }}
            className="py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
            로그인
          </button>
          <button 
            onClick={() => {
              navigate("/register");
              onClose();
            }} 
            className="py-2 text-blue-500 border border-blue-500 rounded hover:bg-blue-100">
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}
