import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";

const GoogleLoginButton = () => {
  const clientId = "528171389749-uito6rm8as4mtaflock5hb96lruna0vu.apps.googleusercontent.com";

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