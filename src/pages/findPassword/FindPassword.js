//비밀번호 찾기 페이지
import React, { useState } from "react";
import Footer from "../../components/footer/Footer";
import TopNav from "../../components/topnav/TopNav";
import axios from "axios";
import { Link } from "react-router-dom";

function FindPassword() {
  //이메일 유효성 검사
  // 이메일 유효성 검사 관련 코드 작성하기
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  // 이메일 유효성 검사 함수
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!validateEmail(email)) {
      setError("유효한 이메일 주소를 입력해주세요.");
      return;
    }

    try {
      // .env 에서 process.env 이거로 변경하기
      const response = await axios.post("http://localhost:8080/api/findpassword", { email });
      if (response) {
        setMessage("비밀번호 재설정 이메일을 보냈습니다.");
        console.log(response);
      } else {
        setError("이메일 전송에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (err) {
      setError("서버 에러가 발생했습니다. 나중에 다시 시도해주세요.");
    }
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
          <div className="bg-white lg:w-4/12 md:6/12 w-10/12 m-auto my-10 mt-40">
            <div className="py-8 px-8 rounded-xl">
              <h1 className="font-medium text-2xl mt-3 text-center">비밀번호 찾기</h1>
              <h5 className="mt-3">
                가입하신 이메일 주소를 입력해주세요.
                <br />
                이메일 주소로 비밀번호를 재설정할 수 있는 이메일을 보내드립니다.
                <br />
              </h5>
              <form onSubmit={handleSubmit} className="mt-6">
                <div className="my-5 text-sm">
                  <label htmlFor="email" className="block text-black text-left">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full text-2xl"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {error && <p className="text-red-500 mt-2">{error}</p>}
                </div>
                <button
                  type="submit"
                  className="block text-center text-white bg-gray-800 p-3 duration-300 rounded-sm hover:bg-black w-full"
                >
                  인증번호 전송
                </button>
                {message && <p className="text-green-500 mt-2">{message}</p>}
              </form>
              <p className="mt-12 text-xl text-center font-light text-gray-400">
                계정이 있으신가요?{" "}
                <Link to="/login" className="text-blue-800 font-semibold">
                  로그인하기
                </Link>
              </p>
              <p className="mt-2 text-xl text-center font-light text-gray-400">
                계정이 없으신가요?{" "}
                <Link to="/signup" className="text-blue-800 font-semibold">
                  회원가입하기
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default FindPassword;