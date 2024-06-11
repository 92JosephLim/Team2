import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./Authcontext";

//클라이언트가 백엔드 서버로 인가 코드를 보내고 
//백엔드 서버로부터 토큰을 받아오는데 local storage에 저장하고 로그인 상태를 업데이트할거임

//context API 

function KakaoRedirect() {
  //페이지 이동 : 메인 페이지로 갈거임 => 아 회원가입 완료하면 로그인 페이지로 ㄱㄱ
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    //인가코드 뽑기
    let params = new URL(document.URL).searchParams;
    let code = params.get("code");

    console.log("인가코드", code);

    //뽑아낸 인가코드가 있으면 백엔드로 전송
    if (code) {
      //axios를 사용해서 서버로 GET 요청 보내는데 이때 요청 url에 인가 코드(여기서는 code인 것 같음)를 쿼리 파라미터로 포함시킴.
      axios
        .get(`http://localhost:8080/oauth/kakao?code=${code}`)
        .then((response) => {
          //응답 데이터 콘솔에 출력
          console.log(response);

          //여기는 서버로부터 응답이 성공적이면 실행하게 됨.
          //사용자가 카카오 로그인 하고 받은 인가 코드를 서버에 보내서 JWT 토큰을 가져와서 추출...?
          const getJwtToken = response.data.token;

          //getJwtToken을 로컬 스토리지에 저장해서 api 요청할 때 사용할 수 있게 함.
          localStorage.setItem("accessToken", getJwtToken);

          //메인 페이지로 리디렉션
          navigate("/");
        })
        .catch((error) => {
          //응답 처리 실패할 때!
          console.error("인가 코드 전송 중 에러 발생:", error);
        });
    }
  }, [navigate, login]); //배열안에 나중에 login 넣기

  return <div>로그인 중입니다</div>;
}

export default KakaoRedirect;