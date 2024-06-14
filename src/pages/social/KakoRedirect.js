import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from 'jwt-decode'; // Named import로 수정

function KakaoRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    let params = new URL(document.URL).searchParams;
    let code = params.get("code");
    console.log(code);
    if (code) {
      axios
        .get(`http://localhost:8080/oauth/kakao?code=${code}`)
        .then((response) => {
          // 백엔드로부터 응답을 받은 후 처리할 로직
          console.log(response.data);
          const decodedToken = jwtDecode(response.data.token);
          console.log(decodedToken);
          localStorage.setItem("token", response.data.token); // JWT토큰 localStorage 저장
          localStorage.setItem("email", decodedToken.email);
          localStorage.setItem("profileImage", decodedToken.profileImage);
          localStorage.setItem("loginType", decodedToken.loginType);
          localStorage.setItem("phoneNumber", decodedToken.phoneNumber);
          localStorage.setItem("gender", decodedToken.gender);
          localStorage.setItem("nickName", decodedToken.nickName);
          navigate("/");
        })
        .catch((error) => {
          console.error("인가 코드 전송 중 에러 발생:", error);
        });
    }
  }, [navigate]); //배열안에 나중에 login 넣기

  return <div>로그인 중입니다</div>;
}

export default KakaoRedirect;
