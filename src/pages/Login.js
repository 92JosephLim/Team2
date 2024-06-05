//로그인 페이지  
import React, { useState } from "react";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";

function Login2() {
  //id, password 유효성 검사
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const [idMsg, setIdMsg] = useState("");
  const [pwdMsg, setPwdMsg] = useState("");

  return (
    <>
      <TopNav />
      <div className="relative min-h-screen flex ">
        <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white">
          <div className="sm:w-1/2 xl:w-3/5 h-full md:flex flex-auto items-center justify-center p-10 overflow-hidden bg-purple-900 text-white bg-no-repeat bg-cover relative">
            {/* <img src={teamlogo} alt="this is our team logo" /> */}
            {/* 애니메이션 */}
          </div>
          <div className="bg-white lg:w-4/12 md:6/12 w-10/12 m-auto my-10">
            <div className="py-8 px-8 rounded-xl">
              <h1 className="font-medium text-2xl mt-3 text-center">Login</h1>
              <form action="" className="mt-6">
                <div className="my-5 text-sm">
                  <label htmlFor="username" className="block text-black">
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
                  <label htmlFor="password" className="block text-black">
                    Password
                  </label>
                  <input
                    type=""
                    id="password"
                    className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
                    placeholder="Password"
                  />
                  <div className="flex justify-end mt-2 text-xs text-gray-600">
                    <a href="#">Forget Password?</a>
                  </div>
                </div>
                <button className="block text-center text-white bg-gray-800 p-3 duration-300 rounded-sm hover:bg-black w-full">
                  Login
                </button>
              </form>
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
              <div className="grid md:grid-cols-2 gap-2 mt-7">
                <div>
                  <button className="text-center w-full text-white bg-blue-900 p-3 duration-300 rounded-sm hover:bg-blue-700">
                    Facebook
                  </button>
                </div>
                <div>
                  <button className="text-center w-full text-white bg-blue-400 p-3 duration-300 rounded-sm hover:bg-blue-500">
                    Twitter
                  </button>
                </div>
              </div>
              <p className="mt-12 text-xs text-center font-light text-gray-400">
                {" "}
                Dont have an account?{" "}
                <a href="#" className="text-black font-medium">
                  {" "}
                  Create One{" "}
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


export default Login2;