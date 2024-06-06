//로그인 페이지  
import React, { useState } from "react";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import Kakao from "./social/Kakao";
import GoogleLogin from "./social/GoogleLogin";
import GoogleLoginButton from "./social/GoogleLoginButton";

function Login() {
  //useNavigator 훅으로 페이지 이동
  const navigate = useNavigate();

  //상태 저장
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailMessage, setEmailMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

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
      setPasswordMessage("사용 가능한 비밀번호 입니다!");
      setIsPassword(true);
    }
  };

  //form 제출 핸들러 - axios 사용
  const handleLISubmit = (e) => {

    e.preventDefault();

    const formData = {
      email,
      password
    };

    //endpoint 주소가 https://js2.jsflux.co.kr/ 이거에요 아님 15.164.250.39 이거에요????????
    axios.post("엔드포인트 주소", formData)
      .then(reponse => {
        if (reponse.data.success) {
          navigate('/');
        } else {
          //에러 메세지 있으면 표시하기
          alert(Response.data.message);
        }
      })
      .catch(error => {
        console.error("error : ", error);
      });

  };

  //소셜 로그인 : 배포하면 배포 주소 추가해주기 지금은 그냥 localhost:3000으로 설정
  /**
   * 리액트 ----> 카카오 : 인가 코드 요청
   * 카카오 ----> 리액트 : redirect url로 인가코드 리턴
   * 리액트 ----> 스프링부트 : 받아온 인가코드 서버로 전달
   * 스프링부트 ----> 카카오 : 인가코드 주고 토큰 받아오기 w.redirect url
   * 카카오 ----> 스프링부트 : 유효성검증을 통해서 토큰 서버로 전달
   * 스프링부트 : 카카오에서 받은 토큰으로 유저 정보를 활용해 서버 전용 토큰 발행
   * 스프링부트 ----> 리액트 : 우리 플젝 서버로 전용 토큰 넘겨준다.
   * 리액트 : 토큰확인, 로그인 완료, 로그인 완료 후 메인페이지로 넘겨주기
   */

  return (
    <>
      <TopNav />
      <div className="relative min-h-screen flex ">
        <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white">
          <div className="sm:w-1/2 xl:w-3/5 h-full md:flex flex-auto items-center justify-center p-10 overflow-hidden bg-purple-900 text-white bg-no-repeat bg-cover relative">
            {/* 애니메이션 */}
            {/* <img src={teamlogo} alt="this is our team logo" /> */}
          </div>
          <div className="bg-white lg:w-4/12 md:6/12 w-10/12 m-auto my-10 mt-40">
            <div className="py-8 px-8 rounded-xl">{/* 이거 위치 조금만 더 내리기 */}
              <h1 className="font-medium text-2xl mt-3 text-center">Login</h1>
              {/* form 태그 POST로 email, password 넘겨주기 */}
              <form onSubmit={handleLISubmit} className="mt-6">
                <div className="my-5">
                  {/* 이메일 유효성 검사 */}
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
                  {/* 비밀번호 유효성 검사 */}
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
                {/* main page로 넘어가야 한다. */}
                <button
                  className="block text-center text-white bg-gray-800 p-3 duration-300 rounded-sm hover:bg-black w-full"
                  type="submit"
                >
                  Login
                </button>
              </form>
              {/* social login 파트 */}
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
              {/* 소셜 로그인 kakao, google */}
              <div className="grid md:grid-cols-2 gap-2 mt-7">
                <div>
                  <Kakao />
                  {/* onClick으로 kakao 넘겨주기 */}
                  {/* <button className="text-center w-full text-black bg-yellow-300 p-3 duration-300 rounded-sm hover:bg-amber-900 hover:text-white">
                    Kakao
                  </button> */}
                </div>
                <div>
                  <GoogleLoginButton />
                  {/* <button className="text-center w-full text-white bg-gray-700 p-3 duration-300 rounded-sm hover:bg-blue-500">
                    Google
                  </button> */}
                </div>
              </div>
              {/* 계정이 없는 경우 */}
              <p className="mt-12 text-xl text-center font-light text-gray-400">
                {" "}
                계정이 없으신가요?{" "}
                <a href="/signup" className="text-blue-800 font-semibold">
                  {" "}
                  회원가입하기{" "}
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