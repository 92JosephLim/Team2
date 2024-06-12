import React, { useState } from "react";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import Kakao from "./social/Kakao";
import GoogleLoginButton from "./social/GoogleLoginButton";
import axios from "axios";
import color from "../assets/color.jpg";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [emailMessage, setEmailMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

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

  const handleLISubmit = (e) => {
    e.preventDefault();

    const formData = {
      email,
      password
    };

    axios.post("http://localhost:8080/api/login", formData)
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('token', response.data.token); // JWT 토큰을 로컬 스토리지에 저장
          localStorage.setItem('email', email); // 이메일을 로컬 스토리지에 저장
          navigate('/');
        }
      })
      .catch(error => {
        if (error.response) {
          setErrorMessage(error.response.data.message);
        } else {
          console.error("error : ", error);
          setErrorMessage("로그인 중 오류가 발생했습니다. 다시 시도해 주세요.");
        }
      });
  };

  return (
    <>
      <TopNav />
      <div className="relative min-h-screen flex ">
        <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white">
          <div className="sm:w-1/2 xl:w-3/5 h-full md:flex flex-auto items-center justify-center overflow-hidden text-white bg-no-repeat bg-cover relative">
            <img src={color} alt="Login img" className="h-full w-full object-cover absolute" />
          </div>
          <div className="bg-white lg:w-4/12 md:6/12 w-10/12 m-auto my-10 mt-40">
            <div className="py-8 px-8 rounded-xl">
              <h1 className="font-medium text-2xl mt-3 text-center">Login</h1>
              <form onSubmit={handleLISubmit} className="mt-6">
                <div className="my-5">
                  <label htmlFor="email" className="block text-black text-left">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={onChangeEmail}
                    className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 min-w-full"
                    placeholder="Email"
                  />
                  <p className="errorMsg text-red-600 mt-2 text-xl">{emailMessage}</p>
                </div>
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
                  <p className="errorMsg text-red-600 mt-2 text-xl">{passwordMessage}</p>
                  <div className="flex justify-end mt-5 text-lg text-blue-800 font-semibold">
                    <a href="/findpwd">비밀번호가 생각나지 않는다면?</a>
                  </div>
                </div>
                {errorMessage && <p className="text-red-600 mt-4 text-xl">{errorMessage}</p>}
                <button
                  className="block text-center text-white bg-gray-800 p-3 duration-300 rounded-sm hover:bg-black w-full"
                  type="submit"
                >
                  Login
                </button>
              </form>
              <div className="flex md:justify-between justify-center items-center mt-10">
                <div
                  style={{ height: 1 }}
                  className="bg-gray-300 md:block hidden w-4/12"
                />
                <p className="md:mx-2 text-large font-light text-gray-400">
                  {" "}
                  Login With Social{" "}
                </p>
                <div
                  style={{ height: 1 }}
                  className="bg-gray-300 md:block hidden w-4/12"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-2 mt-7">
                <div>
                  <Kakao />
                </div>
                <div>
                  <GoogleLoginButton />
                </div>
              </div>
              <p className="mt-12 text-xl text-center font-light text-gray-400">
                {" "}
                계정이 없으신가요?{" "}
                <a href="/signup" className="text-blue-800 font-semibold">
                  {" "}
                  회원가입하기!{" "}
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

export default Login;