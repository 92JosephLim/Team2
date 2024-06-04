//로그인 페이지  
import React, { useState } from "react";
import "../css/Login.css"; // 로그인 페이지 스타일 파일 import
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import teamlogo from "../assets/lizard.jpg";

function Login() {
  //id, password 유효성 검사
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const [idMsg, setIdMsg] = useState("");
  const [pwdMsg, setPwdMsg] = useState("");

  return (
    <>
      <TopNav />
      {/* 전체 레이아웃 */}
      <div className="flex min-h-screen bg-white">
        {/* login화면의 left side, 크기는 50% bg 나중에 애니메이션 보고 필요하면 넣기 */}
        <div className="flex lg:w-1/2">
          {/* team logo 애니메이션 넣은거 컴포넌트로 넣을 예정 */}
          <div className="m-auto">
            <img src={teamlogo} alt="This is my team logo" className="rounded-lg" />
          </div>
        </div>
        {/* login화면의 right side */}
        <div className="flex flex-col justify-center w-full lg:w-1/2 p-8">
          <div className="max-w-lg mx-auto bg-white rounded-lg p-6">
            <h2 className="text-2xl font-bold text-center mb-6">로그인</h2>
            <form className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="아이디"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="relative">
                <input
                  type="password"
                  placeholder="비밀번호"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="text-right mt-2">
                  <a href="/findpwd" className="text-sm text-blue-500 hover:underline">비밀번호 찾기</a>
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800"
              >
                로그인
              </button>
              <div className="text-center text-gray-500 mt-4">
                <span>000이 처음이신가요? </span>
                {/* 이거 nav로 할 지 그냥 a 태그로 할 지 고민 a 태그보다 react route dom이 좀 더 부드럽게??넘어가는걸로 아는데 일단 a 태그로 해봄 */}
                <a href="/signup" className="text-blue-500 hover:underline">회원가입하기</a>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;

{/* <div className="login-page">
      <TopNav />
      <h2 className="login-title">로그인</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">아이디:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">비밀번호:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">로그인</button>
      </form>
      <div className="social-login-options">
        <p>다른 계정으로 로그인하기:</p>
        <button className="social-login-button kakao">카카오</button>
        <button className="social-login-button naver">네이버</button>
        <button className="social-login-button google">구글</button>
      </div>
      <div className="register-link">
        <p>회원이 아니신가요? <a href="/register">회원가입</a></p>
      </div>
      <Footer />
    </div> */}
