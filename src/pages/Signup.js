//회원가입 페이지
import React from "react";
import "../css/Login.css"; // 로그인 페이지 스타일 파일 import
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import teamlogo from "../assets/lizard.jpg";

function Signup() {
  //email, password 유효성 검사 + 핸드폰 번호

  //나중에 navigator 맞게 수정하기
  //시간 되면 컴포넌트로 수정해서 따로 빼기 
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
                  <h1 className="text-2xl font-bold">회원가입</h1>
                </div>
                <div className="mt-5">
                  {/* 이메일 */}
                  <div className="my-3">
                    <label className="block text-md mb-2" htmlFor="email">이메일</label>
                    <input className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none" type="email" name="email" placeholder="email" />
                    {/* 인증번호 전송 누르면 모달창 띄우기 */}
                    <button type="button" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">인증번호 전송</button>
                  </div>
                  {/* 이메일로 받은 인증번호 체크 */}
                  <div className="my-3">
                    <label className="block text-md mb-2" htmlFor="text">인증번호</label>
                    <input className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none" type="text" name="emailCheck" placeholder="인증번호" />
                    {/* 인증번호 체크 누르면 모달창 띄우기 */}
                    <button type="button" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">인증번호 체크</button>
                  </div>
                  {/* 비밀번호 : 유효성 검사 */}
                  <label className="block text-md mb-2" htmlFor="password">비밀번호</label>
                  <input className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none" type="password" name="password" placeholder="password" />
                </div>
                <div className="mt-5">
                  {/* 비밀번호 확인 유효성 검사 : 작성한 비밀번호랑 같지 않으면 에러 표기 띄우기 */}
                  {/* password로 할지 txt로 할지???아주 고민입니당 */}
                  <label className="block text-md mb-2" htmlFor="password">비밀번호 확인</label>
                  <input className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none" type="password" name="password" placeholder="password" />
                </div>
                {/* 핸드폰 번호 */}
                <div className="mb-4">
                  <label className="block text-gray-700">휴대전화</label>
                  <input type="tel" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600" />
                </div>
                {/* 성별 */}
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
                {/* 언어 선택 */}
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
                {/* 프로필 사진 업로드 */}
                <div className="mb-4">
                  <label className="block text-gray-700">프로필 사진 업로드</label>
                  <input type="file" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600" />
                </div>
                {/* 서비스 약관 : 모달 창으로 보여주기 */}
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
                {/* 버튼을 클릭하면(js로) 모달창 or alert창으로 회원가입에 성공하셨습니다! 뜨게 하기 */}
                <button className="mt-4 mb-3 w-full bg-green-500 hover:bg-green-400 text-white py-2 rounded-md transition duration-100"><a href="/login">회원가입</a></button>
              </form>
              <p className="mt-8"> 계정이 있으신가요? <a href="/login" className="text-blue-500 hover:underline"><span className="cursor-pointer text-sm text-blue-600">로그인하기</span></a></p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Signup;
