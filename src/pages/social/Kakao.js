import React from "react";

function Kakao() {
  //rest api key : 이거 현재 내 rest api key
  const REST_API_KEY = "42134d426dda29defa30ce0badcf5b20";
  //redirect uri
  const REDIRECT_URI = "http://localhost:3000/auth";

  //oauth 요청 url
  const Kakao_Oauth_Url = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  //내 Client secret code
  const CLIENT_SECRET = "q1DqlwnC353miLNq0gV3Hs46OKpjCAnc";

  const handleKakaoLogin = () => {
    window.location.href = Kakao_Oauth_Url;
  };

  return (
    <>
      <button
        className="text-center w-full text-black bg-yellow-300 p-3 duration-300 rounded-sm hover:bg-amber-900 hover:text-white"
        onClick={handleKakaoLogin}
      >
        카카오 로그인
      </button>
    </>
  );
}

export default Kakao;
