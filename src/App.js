import React from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import router from "./pages/router/router";

const clientId = "233505782576-acmbig2ssomblm8c8spashbrj6004jdl.apps.googleusercontent.com";

//원중님 소셜 로그인 구글 이거 맞는지 한번 봐주세요ㅜㅜ
function App() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;