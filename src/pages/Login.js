//로그인 페이지  
import React, { useState } from "react";
// import "../css/Login.css";
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
      <div className="min-h-screen bg-no-repeat bg-cover bg-center"
        // 이거 애니메이션으로 넣어주기
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1486520299386-6d106b22014b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80)' }}>
        <div className="flex justify-end">
          <div className="bg-white min-h-screen w-1/2 flex justify-center items-center">
            <div>
              <form>
                <div>
                  <span className="text-sm text-gray-900">환영합니다!</span>
                  <h1 className="text-2xl font-bold">로그인</h1>
                </div>
                <div className="my-3">
                  <label className="block text-md mb-2" htmlFor="email">Email</label>
                  <input className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none" type="email" name="email" placeholder="email" />
                </div>
                <div className="mt-3">
                  <label className="block text-md mb-2" htmlFor="password">Password</label>
                  <input className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none" type="password" name="password" placeholder="password" />
                </div>
                {/* 비밀번호 찾기 오른쪽으로 밀기 */}
                <div className="flex justify-between">
                  <a href="/findpwd" className="text-sm text-blue-500 hover:underline"><span className="text-sm text-blue-700 hover:underline cursor-pointer">비밀번호 찾기</span></a>
                </div>
                <div>
                  <button className="mt-4 mb-3 w-full bg-green-500 hover:bg-green-400 text-white py-2 rounded-md transition duration-100">로그인</button>
                  {/* 구글, 카카오 로그인 버튼 같은 라인에 위치하게 하기 */}
                  <div className="flex space-x-2 justify-center items-center bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-md transition duration-100">
                    <img className="h-5 cursor-pointer" src="https://i.imgur.com/arC60SB.png" alt="Google" />
                    <button>google</button>
                  </div>
                  {/* 카카오 버튼 색상 노란색으로 변경하기 */}
                  <div className="mt-3 flex space-x-2 justify-center items-center bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-md transition duration-100">
                    <img className="h-5 cursor-pointer" src="https://i.imgur.com/arC60SB.png" alt="Google" />
                    <button>kakao</button>
                  </div>
                </div>
              </form>
              <p className="mt-8"> 계정이 없으신가요? <a href="/signup" className="text-blue-500 hover:underline"><span className="cursor-pointer text-sm text-blue-600"> 회원가입하기</span></a></p>
            </div>
          </div>
        </div>
      </div >
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
