import React from 'react';
import TopNav from '../../components/TopNav'; // 올바른 경로로 수정
import SideNav from '../../components/SideNav'; // 올바른 경로로 수정
import Footer from '../../components/Footer'; // 올바른 경로로 수정
import '../../css/ProfileSettings.css'; // CSS 파일의 경로를 확인해주세요

function ProfileSettings() {
  return (
    <div className="profile-settings-page">
      <TopNav />
      <div className="content">
        <SideNav />
        <main className="profile-settings-main-content">
          <div className="profile-settings-content">
            <h1>상세 프로필 설정</h1>
            <form className="profile-settings-form">
              <div className="form-group">
                <label>프로필 사진</label>
                <input type="file" />
              </div>
              <div className="form-group">
                <label>추가 할 이메일</label>
                <input type="email" placeholder="example@email.com" />
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
              <div className="form-group">
                <label>언어</label>
                <select>
                  <option value="">언어 선택</option>
                  <option value="ko">한국어</option>
                  <option value="en">영어</option>
                  <option value="zh">중국어</option>
                  <option value="ja">일본어</option>
                  <option value="vi">베트남어</option>
                  <option value="id">인도네시아어</option>
                  <option value="ru">러시아어</option>
                  <option value="fr">프랑스어</option>
                </select>
              </div>
              <div className="form-buttons">
                <button type="submit" className="save-button">변경 사항 저장</button>
                <button type="reset" className="cancel-button">변경 사항 취소</button>
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