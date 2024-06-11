import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"; // Named import로 수정
import { useNavigate } from "react-router-dom";
const GoogleLoginButton = () => {
  const clientId = "528171389749-uito6rm8as4mtaflock5hb96lruna0vu.apps.googleusercontent.com";
  const navigate = useNavigate();
  const handleLoginSuccess = (response) => {
    console.log(response);
    fetch("http://localhost:8080/api/auth/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: response.credential,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Success:", data);
        // 로그인 성공 후 처리 (예: 토큰 저장, 리다이렉트 등)
        const decodedToken = jwtDecode(data.token); // 토큰 디코드
        console.log(decodedToken);
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", decodedToken.email);
        localStorage.setItem("profileImage", decodedToken.pictureUrl);
        localStorage.setItem("loginType", decodedToken.loginType);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleLoginFailure = (error) => {
    console.log(error);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin onSuccess={handleLoginSuccess} onFailure={handleLoginFailure} />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
