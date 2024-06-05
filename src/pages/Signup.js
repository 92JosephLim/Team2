//회원가입 페이지
import React, { useState } from "react";
import "../css/Login.css"; // 로그인 페이지 스타일 파일 import
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//나중에 navigator 맞게 수정하기
//시간 되면 컴포넌트로 수정해서 따로 빼기 

function Signup() {

  //useNavigate 훅으로 페이지 이동하기
  const navigate = useNavigate();

  //1. 초기값 세팅 - 이메일, 비밀번호, 비밀번호 확인, 전화번호, 성별, 언어선택, 프로필 사진
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  //2. 오류 메세지 상태 저장
  const [emailMessage, setEmailMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordCheckMessage, setPasswordCheckMessage] = useState('');
  const [phoneNumberMessage, setPhoneNumberMessage] = useState('');

  //3. 유효성 검사 - 이메일, 비밀번호, 핸드폰 번호
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordCheck, setIsPasswordCheck] = useState(false);
  const [isPhoneNumber, setIsPhoneNumber] = useState(false);

  //4. 입력한 필드 값들이 유효한지 검사해서 상태 업데이트 하기 - 이메일, 비밀번호, 핸드폰 번호
  //4-1. 이메일
  const onChangeEmail = (e) => {
    const currentEmail = e.target.value;
    setEmail(currentEmail);
    //이메일 정규식
    const emailRegTest = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
    //이메일 형식이 맞지 않으면 메세지 띄우기
    if (!emailRegTest.test(currentEmail)) {
      setEmailMessage("이메일의 형식이 올바르지 않습니다!");
      setIsEmail(false);
    } else {
      setEmailMessage("사용 가능한 이메일 입니다!");
      setIsEmail(true);
    }
  };

  //4-2. 비밀번호
  const onChangePassword = (e) => {
    const currentPassword = e.target.value;
    setPassword(currentPassword);
    //비밀번호 정규식
    const passwordRegTest = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;
    //메세지 띄우기
    if (!passwordRegTest.test(currentPassword)) {
      setPasswordMessage("영어 대소문자, 특수문자, 숫자를 조합해 8자리 이상 20자리 이하로 입력해주세요!");
      setIsPassword(false);
    } else {
      setPasswordMessage("사용 가능한 비밀번혼 입니다!");
      setIsPassword(true);
    }
  };

  //4-3. 비밀번호 확인
  const onChangePasswordCheck = (e) => {
    const currentPasswordCheck = e.target.value;
    setPasswordCheck(currentPasswordCheck);
    // 앞서 작성한 비밀번호랑 다르면 error msg 내보내기
    if (password !== currentPasswordCheck) {
      setPasswordCheckMessage("비밀번호가 다릅니다! 다시 작성해주세요!")
      setIsPasswordCheck(false);
    } else {
      setPasswordCheckMessage("똑같은 비밀번호를 입력하였습니다.");
      setIsPasswordCheck(true);
    }
  };
  //4-4. 전화번호
  const onChangePhone = (e) => {
    const currentPhoneNumber = e.target.value;
    setPhoneNumber(currentPhoneNumber);
    const phoneRegTest = /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/;
    if (!phoneRegTest.test(currentPhoneNumber)) {
      setPhoneNumberMessage("올바른 형식이 아닙니다! -을 빼고 작성해주세요!");
      setIsPhoneNumber(false);
    } else {
      setPhoneNumberMessage("사용 가능한 전화번호입니다.");
      setIsPhoneNumber(true);
    }
  }
  //생각해본 거 - 이메일 중복 확인 하는지 + 위의 사항이 전부 ok면 가입 버튼 활성화

  //form 제출 핸들러 - axios 사용
  const handleSUSubmit = (e) => {

    e.preventDefault();

    const formData = {
      email,
      password,
      phoneNumber
    };

    //endpoint 주소가 https://js2.jsflux.co.kr/ 이거에요 아님 15.164.250.39 이거에요????????
    axios.post("엔드포인트 주소", formData)
      .then(reponse => {
        if (reponse.data.success) {
          navigate('/login');
        } else {
          //에러 메세지 있으면 표시하기
          alert(Response.data.message);
        }
      })
      .catch(error => {
        console.error("error : ", error);
      });
  };

  return (
    <>
      <TopNav />
      <div className="relative min-h-screen flex ">
        <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white">
          <div className="sm:w-1/2 xl:w-3/5 h-full md:flex flex-auto items-center justify-center p-10 overflow-hidden bg-purple-900 text-white bg-no-repeat bg-cover relative">
            {/* 애니메이션 */}
            {/* <img src={teamlogo} alt="this is our team logo" /> */}
          </div>
          <div className="bg-white lg:w-4/12 md:6/12 w-10/12 m-auto my-10 mt-5">
            <div className="py-8 px-8 rounded-xl">{/* 이거 위치 조금만 더 내리기 */}
              <h1 className="font-medium text-2xl mt-3 text-center">회원가입</h1>
              {/* form 태그 POST */}
              <form onSubmit={handleSUSubmit} className="mt-6">
                {/* 이메일 */}
                <div className="my-5 text-sm">
                  {/* 이메일 유효성 검사 */}
                  <label htmlFor="email" className="block text-black text-left">
                    Email
                  </label>
                  <div className="flex mt-3">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={email}
                      onChange={onChangeEmail}
                      className="rounded-sm px-4 py-3 focus:outline-none bg-gray-100 w-full text-2xl"
                      placeholder="Email"
                    />
                    <button className="ml-2 text-center text-white bg-gray-800 p-3 duration-300 rounded-sm hover:bg-black">
                      인증번호 전송
                    </button>
                    <p className="errorMsg">{emailMessage}</p>
                  </div>
                </div>
                {/* 인증번호 */}
                <div className="my-5 text-sm">
                  {/* 인증번호 체크 */}
                  <label htmlFor="emailCheck" className="block text-black text-left">
                    인증
                  </label>
                  <div className="flex mt-3">
                    <input
                      type=""
                      name="emailCheck"
                      id="emailCheck"
                      className="rounded-sm px-4 py-3 focus:outline-none bg-gray-100 w-full text-2xl"
                      placeholder="인증번호"
                    />
                    <button className="ml-2 text-center text-white bg-gray-800 p-3 duration-300 rounded-sm hover:bg-black">
                      인증번호 체크
                    </button>
                  </div>
                </div>
                {/* 비밀번호 */}
                <div className="my-5 text-sm">
                  {/* 비밀번호 유효성 검증 */}
                  <label htmlFor="password" className="block text-black text-left">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={onChangePassword}
                    className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 min-w-full"
                    placeholder="Password"
                  />
                  <p className="errorMsg mt-2 text-xl">{passwordMessage}</p>
                </div>
                {/* 비밀번호 체크 */}
                <div className="my-5 text-sm">
                  {/* 비밀번호 유효성 검증 */}
                  <label htmlFor="password" className="block text-black text-left">
                    Password Check
                  </label>
                  <input
                    type="password"
                    name="passwordCheck"
                    id="passwordCheck"
                    value={passwordCheck}
                    onChange={onChangePasswordCheck}
                    className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 min-w-full"
                    placeholder="Password"
                  />
                  <p className="errorMsg mt-2 text-xl">{passwordCheckMessage}</p>
                </div>
                {/* 핸드폰 번호 */}
                <div className="my-5 text-sm">
                  {/* 핸드폰 번호 유효성 검사 */}
                  <label htmlFor="phoneNumber" className="block text-black text-left">
                    Phone Number
                  </label>
                  <input
                    type=""
                    name="phoneNumber"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={onChangePhone}
                    className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 min-w-full text-2xl"
                    placeholder="Phone Number"
                  />
                  <p className="errorMsg mt-2 text-xl">{phoneNumberMessage}</p>
                </div>
                {/* 성별 */}
                <div className="my-5 text-sm">
                  <label htmlFor="gender" className="block text-black text-left">
                    Gender
                  </label>
                  {/* 라디오버튼 가운데 맞춰주기 */}
                  <div className="flex items-center mt-4">
                    <label className="inline-flex items-center mr-4">
                      <input type="radio" name="gender" value="none" className="mr-2" defaultChecked />
                      선택안함
                    </label>
                    <label className="inline-flex items-center mr-4">
                      <input type="radio" name="gender" value="male" className="mr-2" />
                      남성
                    </label>
                    <label className="inline-flex items-center">
                      <input type="radio" name="gender" value="female" className="mr-2" />
                      여성
                    </label>
                  </div>
                </div>
                {/* 언어 */}
                <div className="my-5 text-sm">
                  <label htmlFor="language" className="block text-black text-left">
                    Language
                  </label>
                  <select className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 mt-3 text-2xl">
                    <option value="korean">한국어</option>
                    <option value="english">English</option>
                    <option value="japanese">일본어</option>
                    <option value="chinese">중국어</option>
                    <option value="spanish">스페인어</option>
                    <option value="arabic">아랍어</option>
                  </select>
                </div>
                {/* 프로필 사진 */}
                <div className="my-5 text-sm">
                  <label htmlFor="profileImage" className="block text-black text-left">
                    Profile Image
                  </label>
                  <input
                    type="file"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 mt-3 text-2xl"
                  />
                </div>
                {/* 회원가입 */}
                <button
                  className="block text-center text-white bg-gray-800 p-3 duration-300 rounded-sm hover:bg-black w-full"
                  type="submit"
                  disabled={!isEmail || !isPassword || !isPasswordCheck || !isPhoneNumber}
                >
                  회원가입
                </button>
              </form>
              {/* 계정이 없는 경우 : 이때 로그인하기 클릭하면 alert 창 또는 모달 창으로 작서하신 정보가 전부 지워집니다. 그래도 로그인하러 가시겠습니까? 띄워주기 */}
              <p className="mt-12 text-xl text-center font-light text-gray-400">
                {" "}
                계정이 있으신가요?{" "}
                <a href="/login" className="text-blue-800 font-semibold">
                  {" "}
                  로그인하기{" "}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Signup;
