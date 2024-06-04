//회원가입 페이지
import React from "react";
import "../css/Login.css"; // 로그인 페이지 스타일 파일 import
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import teamlogo from "../assets/lizard.jpg";

function Signup() {
  //id, password, email 유효성 검사

  return (
    <>
      <TopNav />
      {/* 전체 레이아웃 */}
      <div className="flex min-h-screen bg-white">
        {/* sign up화면의 left side, 크기는 50% bg 나중에 애니메이션 보고 필요하면 넣기 */}
        <div className="flex lg:w-1/2">
          {/* team logo 애니메이션 넣은거 컴포넌트로 넣을 예정 */}
          <div className="m-auto">
            <img src={teamlogo} alt="This is my team logo" className="rounded-lg" />
          </div>
        </div>
        {/* sign up화면의 right side */}
        <div className="flex flex-col justify-center w-full lg:w-1/2 p-8">
          <div className="max-w-lg mx-auto bg-white rounded-lg p-6">
            <h2 className="text-2xl font-bold text-center mb-6">회원가입</h2>
            {/* 나중에 form 태그에 handleSubmit으로 처리해주기 */}
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">이름</label>
                <input type="text" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">이메일</label>
                <input type="email" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600" />
                <button type="button" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">인증번호 전송</button>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">휴대전화</label>
                <input type="tel" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">비밀번호</label>
                <input type="password" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">성별</label>
                <div className="flex items-center">
                  <input type="radio" name="gender" value="none" className="mr-2" defaultChecked />
                  <label>선택안함</label>
                  <input type="radio" name="gender" value="male" className="mr-2" />
                  <label className="mr-4">남성</label>
                  <input type="radio" name="gender" value="female" className="mr-2" />
                  <label>여성</label>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">언어 선택</label>
                <select className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600">
                  <option value="korean">한국어</option>
                  <option value="english">English</option>
                  <option value="japanese">일본어</option>
                  <option value="japanese">중국어</option>
                  <option value="japanese">스페인어</option>
                  <option value="japanese">아랍어</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">프로필 사진 업로드</label>
                <input type="file" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">서비스 정책</label>
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <label>전체 동의</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <label>만 14세 이상입니다. (필수)</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <label>서비스 이용약관 동의 (필수)</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <label>개인정보 수집 및 이용 동의 (필수)</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <label>마케팅 수신 동의 (선택)</label>
                </div>
              </div>
              <button type="submit" className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md">회원가입</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Signup;
