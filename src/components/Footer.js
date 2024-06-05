import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="#about">About OurHour</a> |<a href="#blog">Blog</a> |<a href="#usage">OurHour 사용법</a> |
        <a href="#guidelines">커뮤니티 가이드라인</a> |<a href="#terms">서비스이용약관</a> |
        <a href="#privacy">개인정보처리방침</a> |<a href="#youth">청소년 보호 정책</a> |
        <a href="#location">위치기반 서비스 약관</a> |<a href="#ip">지식 재산권</a> |<a href="#support">고객센터</a> |
        <a href="#cookie-policy">Cookie Policy</a> |<a href="#cookie-settings">Cookie Settings</a>
      </div>
      <div className="footer-info">
        대표 업무 집행자: 김린다수아 | 이메일: help@azarlive.com | 주소: 서울시 강남구 영동대로 517 | 사업자 등록번호:
        220-88-75836 | Mail-order-sales approval number: 2019-SeoulGangnam-2501
      </div>
      <div className="footer-bottom">
        <p>© 2024 Hyperconnect LLC. All rights reserved.</p>
        <div className="store-buttons">
          <button className="store-button">App Store</button>
          <button className="store-button">Google Play</button>
        </div>
      </div>
    </footer>
  )
}

export default Footer;