import React, { useState } from "react";
import "../css/Login.css"; // 로그인 페이지 스타일 파일 import
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import axios from 'axios'; // axios 추가
import SignupOkModal from '../components/modal/SignupOkModal'; 

function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordCheckMessage, setPasswordCheckMessage] = useState("");
  const [phoneNumberMessage, setPhoneNumberMessage] = useState("");
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordCheck, setIsPasswordCheck] = useState(false);
  const [isPhoneNumber, setIsPhoneNumber] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 추가

  const onChangeEmail = (e) => {
    const currentEmail = e.target.value;
    setEmail(currentEmail);
    const emailRegTest = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
    if (!emailRegTest.test(currentEmail)) {
      setEmailMessage("이메일의 형식이 올바르지 않습니다!");
      setIsEmail(false);
    } else {
      setEmailMessage("사용 가능한 이메일 입니다!");
      setIsEmail(true);
    }
  };

  const onChangePassword = (e) => {
    const currentPassword = e.target.value;
    setPassword(currentPassword);
    const passwordRegTest = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;
    if (!passwordRegTest.test(currentPassword)) {
      setPasswordMessage("영어 대소문자, 특수문자, 숫자를 조합해 8자리 이상 20자리 이하로 입력해주세요!");
      setIsPassword(false);
    } else {
      setPasswordMessage("사용 가능한 비밀번호 입니다!");
      setIsPassword(true);
    }
  };

  const onChangePasswordCheck = (e) => {
    const currentPasswordCheck = e.target.value;
    setPasswordCheck(currentPasswordCheck);
    if (password !== currentPasswordCheck) {
      setPasswordCheckMessage("비밀번호가 다릅니다! 다시 작성해주세요!");
      setIsPasswordCheck(false);
    } else {
      setPasswordCheckMessage("똑같은 비밀번호를 입력하였습니다.");
      setIsPasswordCheck(true);
    }
  };

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

  const handleSUSubmit = (e) => {
    e.preventDefault();

    const formData = {
      email,
      password,
      phoneNumber,
    };

    axios
      .post("엔드포인트 주소", formData)
      .then((response) => {
        if (response.data.success) {
          setIsModalOpen(true); // 회원가입 성공 시 모달 열기
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error("error : ", error);
      });
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();

    const formData = {
      email,
    };

    axios
      .post("http://localhost:8080/emailSend", formData)
      .then((response) => {
        alert(response.data);
        console.log("hihihi");
      })
      .catch((error) => {
        console.error("error : ", error);
      });
  };

  const handleCodeSubmit = (e) => {
    e.prevent.preventDefault();

    const formData = {
      email,
      code: verificationCode,
    };

    axios
      .post("http://localhost:8080/emailConfirm", formData)
      .then((response) => {
        alert(response.data);
      })
      .catch((error) => {
        console.error("error : ", error);
      });
  };

  const handleCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };

  return (
    <>
      <TopNav />
      <div className="relative min-h-screen flex">
        <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white">
          <div className="sm:w-1/2 xl:w-3/5 h-full md:flex flex-auto items-center justify-center p-10 overflow-hidden bg-purple-900 text-white bg-no-repeat bg-cover relative">
          </div>
          <div className="bg-white lg:w-4/12 md:6/12 w-10/12 m-auto my-10 mt-5">
            <div className="py-8 px-8 rounded-xl">
              <h1 className="font-medium text-2xl mt-3 text-center">회원가입</h1>
              <form onSubmit={handleSUSubmit} className="mt-6">
                <div className="my-5 text-sm">
                  <label htmlFor="email" className="block text-black text-left">Email</label>
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
                      className="ml-2 text-center text-white bg-gray-800 p-3 duration-300 rounded-sm hover:bg-black"
                      onClick={handleEmailSubmit}
                    >
                      인증번호 받기
                    </button>
                  </div>
                  <p className="errorMsg mt-1 text-red-600 text-xl">{emailMessage}</p>
                </div>
                <div className="my-5 text-sm">
                  <label htmlFor="emainCheck" className="flex justify-end block text-black text-center text-xl/2">인증 번호를 입력하세요</label>
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
                      className="ml-2 text-center text-white bg-gray-800 p-3 duration-300 rounded-sm hover:bg-black"
                      onClick={handleCodeSubmit}
                    >
                      인증번호 확인
                    </button>
                  </div>
                </div>
                <div className="my-5 text-sm">
                  <label htmlFor="password" className="block text-black text-left">Password</label>
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
                <div className="my-5 text-sm">
                  <label htmlFor="passwordCheck" className="block text-black text-left">Password Check</label>
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
                <div className="my-5 text-sm">
                  <label htmlFor="phoneNumber" className="block text-black text-left">Phone Number</label>
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
                <div className="my-5 text-sm">
                  <label htmlFor="gender" className="block text-black text-left">Gender</label>
                  <div className="flex items-center mt-4">
                    <label className="inline-flex items-center mr-4">
                      <input type="radio" name="gender" value="none" className="mr-2" defaultChecked onChange={() => {}} />
                      선택안함
                    </label>
                    <label className="inline-flex items-center mr-4">
                      <input type="radio" name="gender" value="male" className="mr-2" onChange={() => {}} />
                      남성
                    </label>
                    <label className="inline-flex items-center">
                      <input type="radio" name="gender" value="female" className="mr-2" onChange={() => {}} />
                      여성
                    </label>
                  </div>
                </div>
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
                <div className="my-5 text-sm">
                  <label htmlFor="profileImage" className="block text-black text-left">
                    Profile Image
                  </label>
                  <input
                    type="file"
                    name="profilePicture"
                    onChange={() => {}}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 mt-3 text-2xl"
                  />
                </div>
                <button
                  className={`block text-center text-white p-3 duration-300 rounded-sm w-full ${!isPassword || !isPasswordCheck || !isPhoneNumber ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-800 hover:bg-black'
                    }`}
                  type="submit"
                  disabled={!isEmail || !isPassword || !isPasswordCheck || !isPhoneNumber}
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
      <SignupOkModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Footer />
    </>
  );
}

export default Signup;
