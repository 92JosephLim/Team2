import React from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = "233505782576-acmbig2ssomblm8c8spashbrj6004jdl.apps.googleusercontent.com";

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