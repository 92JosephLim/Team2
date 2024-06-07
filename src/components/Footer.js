import React from "react";

function Footer() {
  return (
    <footer className="footer">
      
      <div className="footer-bottom grid grid-cols-3">
        <div className="col-start-1 col-span-1">중앙정보기술원</div>
        <div className="col-start-2 col-span-1"></div>
        <div className="store-buttons col-start-3 col-span-1">
          <button className="store-button">Git</button>
          <button className="store-button">YouTube</button>
        </div>
      </div>
      <div className="footer-links">
        <div className="">4차 프로젝트</div>|<div className="">팀원 누구누구ㅜ</div>|<div className="">뭐뭐</div>
      </div>
    </footer>
  )
}

export default Footer;