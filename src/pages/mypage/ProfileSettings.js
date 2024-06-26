import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopNav from '../../components/TopNav'; // 올바른 경로로 수정
import SideNav from '../../components/SideNav'; // 올바른 경로로 수정
import Footer from '../../components/Footer'; // 올바른 경로로 수정
import '../../css/ProfileSettings.css'; // CSS 파일의 경로를 확인해주세요

function ProfileSettings() {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/mypage');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <TopNav />
      <div className="flex flex-1">
        <SideNav className="sidenav" />
        <main className="main-content">
          <div className="profile-settings-content">
            <h1 className="text-3xl font-bold">상세 프로필 설정</h1>
            <form className="profile-settings-form">
              <div className="form-group">
                <label>프로필 사진</label>
                <input type="file" />
              </div>
              <div className="form-group">
                <label>전화번호</label>
                <input type="text" placeholder="010-1234-5678" />
              </div>
              <div className="form-group">
                <label>비밀번호</label>
                <input type="password" placeholder="새 비밀번호 입력" />
              </div>
              <div className="form-group">
                <label>비밀번호 확인</label>
                <input type="password" placeholder="새 비밀번호 확인" />
              </div>
              <div className="form-buttons">
                <button type="submit" className="save-button">변경 사항 저장</button>
                <button type="button" className="cancel-button" onClick={handleCancel}>
                  변경 사항 취소
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default ProfileSettings;
