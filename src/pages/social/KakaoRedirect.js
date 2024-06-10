import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { AuthContext } from "../Components/AuthContext";

function KakaoRedirect() {
  const navigate = useNavigate();
  // const { login } = useContext(AuthContext);

  useEffect(() => {
    let params = new URL(document.URL).searchParams;
    let code = params.get("code");
    console.log(code);
    if (code) {
      axios
        .get(`http://localhost:8080/oauth/kakao?code=${code}`)
        .then((response) => {
          // 백엔드로부터 응답을 받은 후 처리할 로직
          console.log(response);
          //const jwtToken = response.data.token; // 받은 jwt 토큰
          // localStorage.setItem("accessToken", jwtToken);
          // login(jwtToken); // AuthContext의 로그인 상태 업데이트
          //navigate("/");
        })
        .catch((error) => {
          console.error("인가 코드 전송 중 에러 발생:", error);
        });
    }
  }, [navigate]); //배열안에 나중에 login 넣기

  return <div>로그인 중입니다</div>;
}

export default KakaoRedirect;
