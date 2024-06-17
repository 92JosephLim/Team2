import React from "react";
import './Footer.css'; // css 폴더 안의 Footer.css 파일을 import
import { IoLogoGithub } from "react-icons/io5";
import { AiOutlineYoutube } from "react-icons/ai";
import newLogo from "../../assets/new_logo.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <div>중앙 정보 기술 인재 개발원</div>
        <div>화상 전화를 통한 글로벌 네트워킹</div>
        <div>팀장 | 임요셉ewjwej77@gmail.com </div>
        <div>팀원 | 김민곤min-gon@naver.com, 김원중gimpo5975@naver.com, 도현우alexdo323@naver.com</div>
        <div>박지연qkrwluds7998@gmail.com, 변의성qusdml123@gmail.com, 한수정wow012380@gmail.com</div>
      </div>
      <div className="footer-right">
        <div><img src={newLogo} alt="New Logo" /></div>
        <br />
        <div>GitHub | https://github.com/92JosephLim/Team2</div>
        <div>PPT | https://www.canva.com/design/DAGHI_MQRzs/-g4uMsGntAcBVR1l3sO6Zg/edit</div>
        <div>YouTube | </div>
      </div>
    </footer>
  )
}

export default Footer;
