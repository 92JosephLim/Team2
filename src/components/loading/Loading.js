import React from "react";
import loading from "../assets/"

const Loading = () => {
  return (
    <div>
      <h3>잠시만 기다려주십시오.</h3>
      <img src={loading} alt="loading gif" />
    </div>
  )
}