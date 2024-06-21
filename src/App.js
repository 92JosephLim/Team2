import React from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import router from "./router/router";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;


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