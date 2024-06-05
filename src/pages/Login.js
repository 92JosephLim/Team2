//로그인 페이지  
import React, { useState } from "react";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";

function Login() {

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
              <form action="" className="mt-6">
                <div className="my-5 text-sm">
                  {/* 이메일 유효성 검사 */}
                  <label htmlFor="username" className="block text-black text-left">
                    Email
                  </label>
                  <input
                    type=""
                    name="Eamil"
                    id="Eamil"
                    className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
                    placeholder="Eamil"
                  />
                </div>
                <div className="my-5 text-sm">
                  {/* 비밀번호 유효성 검사 */}
                  <label htmlFor="password" className="block text-black text-left">
                    Password
                  </label>
                  <input
                    type=""
                    id="password"
                    className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
                    placeholder="Password"
                  />
                  <div className="flex justify-end mt-2 text-xs text-gray-600">
                    <a href="/findpwd">비밀번호가 생각나지 않는다면?</a>
                  </div>
                </div>
                {/* main page로 넘어가야 한다. */}
                <button className="block text-center text-white bg-gray-800 p-3 duration-300 rounded-sm hover:bg-black w-full">
                  Login
                </button>
              </form>
              {/* social login 파트 */}
              <div className="flex md:justify-between justify-center items-center mt-10">
                <div
                  style={{ height: 1 }}
                  className="bg-gray-300 md:block hidden w-4/12"
                />
                <p className="md:mx-2 text-sm font-light text-gray-400">
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
                  <button className="text-center w-full text-black bg-yellow-300 p-3 duration-300 rounded-sm hover:bg-blue-700">
                    Kakao
                  </button>
                </div>
                <div>
                  <button className="text-center w-full text-white bg-gray-700 p-3 duration-300 rounded-sm hover:bg-blue-500">
                    Google
                  </button>
                </div>
              </div>
              {/* 계정이 없는 경우 */}
              <p className="mt-12 text-xs text-center font-light text-gray-400">
                {" "}
                계정이 없으신가요?{" "}
                <a href="/signup" className="text-black font-medium">
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