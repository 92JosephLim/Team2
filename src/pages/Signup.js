//회원가입 페이지
import React, { useEffect, useState } from "react";
import "../css/Login.css"; // 로그인 페이지 스타일 파일 import
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//나중에 navigator 맞게 수정하기
//컴포넌트 따로 빼기
function Signup() {
  //useNavigate 훅으로 페이지 이동하기
  const navigate = useNavigate();

  //1. 초기값 세팅 - 이메일, 비밀번호, 비밀번호 확인, 전화번호, 성별, 언어선택, 프로필 사진
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  //2. 오류 메세지 상태 저장
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordCheckMessage, setPasswordCheckMessage] = useState("");
  const [phoneNumberMessage, setPhoneNumberMessage] = useState("");

  //3. 유효성 검사 - 이메일, 비밀번호, 핸드폰 번호
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordCheck, setIsPasswordCheck] = useState(false);
  const [isPhoneNumber, setIsPhoneNumber] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

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
      setPasswordCheckMessage("비밀번호가 다릅니다! 다시 작성해주세요!");
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
  };

  //5.form 제출 핸들러 - axios 사용
  const handleSUSubmit = (e) => {
    //폼 제출시 페이지 새로고침 되는 것을 방지해줌.
    e.preventDefault();

    //서버로 전송할 데이터
    const formData = {
      email,
      password,
      phoneNumber,
    };

    //post방식으로 전송
    //endpoint 주소가 https://js2.jsflux.co.kr/ 이거에요 아님 15.164.250.39 이거에요????????
    axios
      .post("엔드포인트 주소", formData)
      .then((response) => {
        //서버에서 응답이 오면 .then 실행
        //응답처리
        if (response.data.success) {
          navigate("/login"); //login 페이지로 이동
        } else {
          //에러 메세지 있으면 서버에서 받아서 표시하기
          alert(response.data.message);
        }
      })
      .catch((error) => {
        //에러 발생시 콘솔에 에러출력
        console.error("error : ", error);
      });
  };

  //6. 이메일 인증 : 생각해본 거 - 이메일 중복 확인 하는지 + 위의 사항이 전부 ok면 가입 버튼 활성화
  //6-1. 이메일 주소 확인 후 인증번호 발송
  const handleEmailSubmit = (e) => {
    //폼 제출시 페이지 새로고침 되는 것을 방지해줌.
    e.preventDefault();

    //서버로 전송할 데이터
    const formData = {
      email,
    };

    //post방식으로 전송
    //이메일 보내서 인증번호 받기
    axios
      .post("http://localhost:8080/emailSend", formData)
      .then((response) => {
        //서버에서 응답이 오면 .then 실행
        //응답처리
        alert(response.data);
        console.log("hihihi");
      })
      .catch((error) => {
        //에러 발생시 콘솔에 에러출력
        console.error("error : ", error);
      });
  };
  //6-2. 이메일 인증번호 일치여부 확인
  const handleCodeSubmit = (e) => {
    //폼 제출시 페이지 새로고침 되는 것을 방지해줌.
    e.preventDefault();

    //서버로 전송할 데이터
    const formData = {
      email,
      code: verificationCode,
    };

    axios
      .post("http://localhost:8080/emailConfirm", formData)
      .then((response) => {
        //서버에서 응답이 오면 .then 실행
        //응답처리
        alert(response.data);
      })
      .catch((error) => {
        //에러 발생시 콘솔에 에러출력
        console.error("error : ", error);
      });
  };

  //6-3. 이메일 인증번호 보내면 바로 카운트다운 5분 시작하기
  const [showVerification, setShowVerification] = useState(false);
  const [timer, setTimer] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    if (showVerification && timer > 0) {
      const countdown = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [showVerification, timer]);

  const handleVerificationClick = () => {
    setShowVerification(true);
    setTimer(300); // Reset the timer to 5 minutes
    setIsEmailVerified(false); // 인증번호 받기를 클릭할 때마다 이메일 인증 상태 초기화
  };

  const handleVerifyCodeClick = () => {
    // 여기에 실제 인증 코드 검증 로직을 추가해야 합니다.
    // 검증이 성공하면 아래와 같이 이메일 인증 상태를 업데이트합니다.
    setIsEmailVerified(true);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  //인증번호 입력반응
  const handleCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };

  return (
    <>
      <TopNav />
      <div className="relative min-h-screen flex">
        <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white">
          <div className="sm:w-1/2 xl:w-3/5 h-full md:flex flex-auto items-center justify-center p-10 overflow-hidden bg-purple-900 text-white bg-no-repeat bg-cover relative">
            {/* 애니메이션 */}
            {/* <img src={teamlogo} alt="this is our team logo" /> */}
          </div>
          <div className="bg-white lg:w-4/12 md:6/12 w-10/12 m-auto my-10 mt-5">
            <div className="py-8 px-8 rounded-xl">
              <h1 className="font-medium text-2xl mt-3 text-center">회원가입</h1>
              {/* form 태그 POST */}
              <form onSubmit={handleSUSubmit} className="mt-6">
                {/* 이메일 */}
                <div className="my-5 text-sm">
                  <label htmlFor="email" className="block text-black text-left">
                    Email
                  </label>
                  <div className="relative flex mt-3">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={email}
                      onChange={onChangeEmail}
                      className="rounded-sm px-4 py-3 focus:outline-none bg-gray-100 w-full text-2xl"
                      placeholder="Email"
                    />
                    <button
                      type="button"
                      className="ml-2 text-center text-white bg-gray-800 p-3 duration-300 rounded-sm hover:bg-black"
                      onClick={handleVerificationClick}
                    >
                      인증번호 받기
                    </button>
                  </div>
                  <p className="errorMsg mt-1 text-red-600 text-xl">{emailMessage}</p>
                </div>
                {/* 인증 */}
                {showVerification && (
                  <div className="my-5 text-sm">
                    <label htmlFor="emainCheck" className="flex justify-end block text-black text-center text-xl/2">
                      인증 번호를 입력하세요
                    </label>
                    <div className="flex justify-end flex mt-3">
                      <input
                        type="text"
                        name="emainCheck"
                        id="emainCheck"
                        value={verificationCode}
                        onChange={handleCodeChange}
                        className="rounded-sm px-4 py-3 focus:outline-none bg-gray-100 w-5/6 text-2xl"
                        placeholder="인증번호"
                      />
                      <button
                        type="button"
                        className="ml-2 text-center text-white bg-gray-800 p-3 duration-300 rounded-sm hover:bg-black"
                        onClick={handleVerifyCodeClick}
                      >
                        인증번호 확인
                      </button>
                    </div>
                    <div className="text-right text-red-600 text-xl mt-2">
                      남은 시간: {formatTime(timer)}
                    </div>
                  </div>
                )}
                {/* 비밀번호 */}
                <div className="my-5 text-sm">
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
                  <p className="errorMsg mt-2 text-xl text-red-600">{passwordMessage}</p>
                </div>
                {/* 비밀번호 체크 */}
                <div className="my-5 text-sm">
                  <label htmlFor="passwordCheck" className="block text-black text-left">
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
                  <p className="errorMsg mt-2 text-xl text-red-600">{passwordCheckMessage}</p>
                </div>
                {/* 핸드폰 번호 */}
                <div className="my-5 text-sm">
                  <label htmlFor="phoneNumber" className="block text-black text-left">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={onChangePhone}
                    className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 min-w-full text-2xl"
                    placeholder="Phone Number"
                  />
                  <p className="errorMsg mt-2 text-xl text-red-600">{phoneNumberMessage}</p>
                </div>
                {/* 성별 */}
                <div className="my-5 text-sm">
                  <label htmlFor="gender" className="block text-black text-left">
                    Gender
                  </label>
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
                  disabled={!isEmail || !isPassword || !isPasswordCheck || !isPhoneNumber || !isEmailVerified}
                >
                  회원가입
                </button>
              </form>
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
