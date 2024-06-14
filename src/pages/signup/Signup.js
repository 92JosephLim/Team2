import React, { useState } from "react";
import TopNav from "../../components/topnav/TopNav";
import Footer from "../../components/footer/Footer";
import { useNavigate } from "react-router-dom";
import { registerUser, sendEmailVerification, confirmEmailVerification } from "../../api/apiService"; // API 서비스 함수들 가져오기
import grim from "../../assets/grim.jpg"

function Signup() {
  const navigate = useNavigate();

  // 회원가입 폼 데이터 초기 상태 설정
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordCheck: "",
    phoneNumber: "",
    gender: "none",
    language: "korean",
    profilePicture: null,
  });

  // 인증 코드 상태
  const [verificationCode, setVerificationCode] = useState("");

  // 각 입력 필드에 대한 메시지 상태
  const [messages, setMessages] = useState({
    emailMessage: "",
    passwordMessage: "",
    passwordCheckMessage: "",
    phoneNumberMessage: "",
  });

  // 각 입력 필드의 유효성 상태
  const [validity, setValidity] = useState({
    isEmail: false,
    isPassword: false,
    isPasswordCheck: false,
    isPhoneNumber: false,
  });

  // 입력 필드 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 파일 입력 필드 변경 핸들러
  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePicture: e.target.files[0] });
  };

  // 이메일 입력 필드 변경 핸들러
  const onChangeEmail = (e) => {
    const currentEmail = e.target.value;
    setFormData({ ...formData, email: currentEmail });

    const emailRegTest = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
    if (!emailRegTest.test(currentEmail)) {
      setMessages({ ...messages, emailMessage: "이메일의 형식이 올바르지 않습니다!" });
      setValidity({ ...validity, isEmail: false });
    } else {
      setMessages({ ...messages, emailMessage: "" }); // 메시지 초기화
      setValidity({ ...validity, isEmail: true });
    }
  };

  // 비밀번호 입력 필드 변경 핸들러
  const onChangePassword = (e) => {
    const currentPassword = e.target.value;
    setFormData({ ...formData, password: currentPassword });

    const passwordRegTest = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;
    if (!passwordRegTest.test(currentPassword)) {
      setMessages({ ...messages, passwordMessage: "영어 대소문자, 특수문자, 숫자를 조합해 8자리 이상 20자리 이하로 입력해주세요!" });
      setValidity({ ...validity, isPassword: false });
    } else {
      setMessages({ ...messages, passwordMessage: "사용 가능한 비밀번호 입니다!" });
      setValidity({ ...validity, isPassword: true });
    }
  };

  // 비밀번호 확인 입력 필드 변경 핸들러
  const onChangePasswordCheck = (e) => {
    const currentPasswordCheck = e.target.value;
    setFormData({ ...formData, passwordCheck: currentPasswordCheck });

    if (formData.password !== currentPasswordCheck) {
      setMessages({ ...messages, passwordCheckMessage: "비밀번호가 다릅니다! 다시 작성해주세요!" });
      setValidity({ ...validity, isPasswordCheck: false });
    } else {
      setMessages({ ...messages, passwordCheckMessage: "똑같은 비밀번호를 입력하였습니다." });
      setValidity({ ...validity, isPasswordCheck: true });
    }
  };

  // 전화번호 입력 필드 변경 핸들러
  const onChangePhone = (e) => {
    const currentPhoneNumber = e.target.value;
    setFormData({ ...formData, phoneNumber: currentPhoneNumber });

    const phoneRegTest = /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/;
    if (!phoneRegTest.test(currentPhoneNumber)) {
      setMessages({ ...messages, phoneNumberMessage: "올바른 형식이 아닙니다! -을 빼고 작성해주세요!" });
      setValidity({ ...validity, isPhoneNumber: false });
    } else {
      setMessages({ ...messages, phoneNumberMessage: "사용 가능한 전화번호입니다." });
      setValidity({ ...validity, isPhoneNumber: true });
    }
  };

  // 회원가입 폼 제출 핸들러
  const handleSUSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const response = await registerUser(data);
      if (response.success) { // 서버 응답의 success 필드 확인
        navigate("/login"); // 성공 시 로그인 페이지로 이동
      } else {
        alert(response.message); // 실패 시 메시지 알림
      }
    } catch (error) {
      console.error("error : ", error); // 오류 발생 시 콘솔에 출력
    }
  };

  // 이메일 인증번호 받기 핸들러
  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await sendEmailVerification(formData.email);
      if (response === "동일한 이메일이 존재합니다.") {
        setMessages({ ...messages, emailMessage: "이미 존재하는 이메일입니다!" });
        setValidity({ ...validity, isEmail: false });
      } else {
        setMessages({ ...messages, emailMessage: "인증 이메일이 전송되었습니다!" });
        setValidity({ ...validity, isEmail: true });
      }
    } catch (error) {
      console.error("error : ", error);
      setMessages({ ...messages, emailMessage: "서버 오류로 이메일을 확인할 수 없습니다." });
      setValidity({ ...validity, isEmail: false });
    }
  };

  // 인증번호 확인 핸들러
  const handleCodeSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await confirmEmailVerification(formData.email, verificationCode);
      alert(response);
    } catch (error) {
      console.error("error : ", error);
    }
  };

  // 인증번호 입력 필드 변경 핸들러
  const handleCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };

  return (
    <>
      <TopNav />
      <div className="relative min-h-screen flex">
        <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white">
          <div className="sm:w-1/2 xl:w-3/5 h-full md:flex flex-auto items-center justify-center p-10 overflow-hidden bg-purple-900 text-white bg-no-repeat bg-cover relative">
            <img src={grim} alt="sign up img" className="h-full w-full object-cover absolute" />
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
                      value={formData.email}
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
                  <p className="errorMsg mt-1 text-red-600 text-xl">{messages.emailMessage}</p>
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
                    value={formData.password}
                    onChange={onChangePassword}
                    className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 min-w-full"
                    placeholder="Password"
                  />
                  <p className="errorMsg mt-2 text-xl text-red-600">{messages.passwordMessage}</p>
                </div>
                <div className="my-5 text-sm">
                  <label htmlFor="passwordCheck" className="block text-black text-left">Password Check</label>
                  <input
                    type="password"
                    name="passwordCheck"
                    id="passwordCheck"
                    value={formData.passwordCheck}
                    onChange={onChangePasswordCheck}
                    className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 min-w-full"
                    placeholder="Password"
                  />
                  <p className="errorMsg mt-2 text-xl text-red-600">{messages.passwordCheckMessage}</p>
                </div>
                <div className="my-5 text-sm">
                  <label htmlFor="phoneNumber" className="block text-black text-left">Phone Number</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={onChangePhone}
                    className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 min-w-full text-2xl"
                    placeholder="Phone Number"
                  />
                  <p className="errorMsg mt-2 text-xl text-red-600">{messages.phoneNumberMessage}</p>
                </div>
                <div className="my-5 text-sm">
                  <label htmlFor="gender" className="block text-black text-left">Gender</label>
                  <div className="flex items-center mt-4">
                    <label className="inline-flex items-center mr-4">
                      <input type="radio" name="gender" value="none" className="mr-2" defaultChecked onChange={handleChange} />
                      선택안함
                    </label>
                    <label className="inline-flex items-center mr-4">
                      <input type="radio" name="gender" value="male" className="mr-2" onChange={handleChange} />
                      남성
                    </label>
                    <label className="inline-flex items-center">
                      <input type="radio" name="gender" value="female" className="mr-2" onChange={handleChange} />
                      여성
                    </label>
                  </div>
                </div>
                <div className="my-5 text-sm">
                  <label htmlFor="language" className="block text-black text-left">Language</label>
                  <select
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 mt-3 text-2xl"
                  >
                    <option value="korean">한국어</option>
                    <option value="english">English</option>
                    <option value="japanese">일본어</option>
                    <option value="chinese">중국어</option>
                    <option value="spanish">스페인어</option>
                    <option value="arabic">아랍어</option>
                  </select>
                </div>
                <div className="my-5 text-sm">
                  <label htmlFor="profilePicture" className="block text-black text-left">Profile Image</label>
                  <input
                    type="file"
                    name="profilePicture"
                    onChange={handleFileChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 mt-3 text-2xl"
                  />
                </div>
                <button
                  className="block text-center text-white bg-gray-800 p-3 duration-300 rounded-sm hover:bg-black w-full"
                  type="submit"
                  disabled={!validity.isEmail || !validity.isPassword || !validity.isPasswordCheck || !validity.isPhoneNumber}
                >
                  회원가입
                </button>
              </form>
              <p className="mt-12 text-xl text-center font-light text-gray-400">
                계정이 있으신가요?{" "}
                <span
                  onClick={() => navigate("/login")}
                  className="text-blue-800 font-semibold cursor-pointer"
                >
                  로그인하기
                </span>
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
