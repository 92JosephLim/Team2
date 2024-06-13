//서버에서 받은 토큰을 클라이언트에서 받아가지고 처리해주는 js 파일
//로컬 스토리지로 토큰을 저장하고 필요할 때 해당 토큰을 사용할거임
//login : 백엔드에서 받은 토큰을 로컬 스토리지에 저장하고, 이 토큰을 디코딩해서 사용자 정보를 상태로 저장?한다.
//logout : 해당 사용자가 로그아웃을 할 때 토큰을 로컬 스토리지에서 제거하고 사용자 정보를 초기화해준다.
//그니까 이거 만드는 목적이 현재 사용자가 로그인 했는지 확인하고 ui 업데이트 해주는 역할을 함!
//그래서 인증 상태를 전역적으로 관리하는 파일을 만들건데 그게 이 파일임
import { jwtDecode } from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

//AuthContext : 인증 관련 상태를 관리하기 위한 Context를 생성한다.
export const AuthContext = createContext();

//AuthProvider 컴포넌트 정의하기
//앱 전체에서 인증 상태를 관리하고 제공하기 위한 provider 정의
export const AuthProvider = ({ children }) => {
  //사용자가 인증되었는지 여부랑 상태 업데이트
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  //사용자 정보를 저장할 상태임
  const [user, setUser] = useState(null);

  useEffect(() => {
    //localStorage에서 토큰을 확인해서
    //localStorage.getItem("accessToken") : 토큰이 있으면 사용자는 인증된거임
    const token = localStorage.getItem("accessToken");
    //  사용자가 인증되었는지 확인하기
    if (token) {
      setIsAuthenticated(true);
      //토큰을 디코딩해서 사용자 정보를 추출한다.
      const decodeUser = jwtDecode(token);
      //디코딩한 전체 객체인 사용자 정보를 상태로 설정한다.
      setUser(decodeUser);
    }
  }, []);

  //사용자가 로그인할 때 호출되는 함수
  const login = (token) => {
    //accessToken을 localStorage에 저장
    localStorage.setItem("accessToken", token);
    setIsAuthenticated(true);
    const decodeUser = jwtDecode(token);
    setUser(decodeUser);
  };

  //사용자가 로그아웃할 때 호출되는 함수
  const logout = () => {
    //accessToken 삭제
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
    setUser(null);
  };

  //Authcontext.Provider: 인증 상태, 로그인, 로그아웃 함수를 자식 컴포넌트들한테 제공해줌
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// PropTypes를 사용하여 children prop의 타입을 정의
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;