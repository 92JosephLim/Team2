import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNav from '../../components/TopNav'; // Update with correct path
import SideNav from '../../components/SideNav'; // Update with correct path
import Footer from '../../components/Footer'; // Update with correct path
import '../../css/ProfileSettings.css'; // Update with correct path
import { updateUserInfo } from '../../api/apiService'; // Import your API service function

function ProfileSettings() {
  const [userInfo, setUserInfo] = useState({
    email: '',
    phoneNumber: '',
    password: '',
    newPassword: '',
    newPasswordCheck: '',
    profileImage: null
  });

  const [messages, setMessages] = useState({
    newPasswordMessage: '',
    newPasswordCheckMessage: '',
    phoneNumberMessage: ''
  });

  const [validity, setValidity] = useState({
    isNewPasswordValid: false,
    isNewPasswordCheckValid: false,
    isPhoneNumberValid: false
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const email = localStorage.getItem('email');
      const phoneNumber = localStorage.getItem('phoneNumber');

      setUserInfo({
        email: email || '',
        phoneNumber: phoneNumber || '',
        password: '',
        newPassword: '',
        newPasswordCheck: '',
        profileImage: null
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleFileChange = (e) => {
    setUserInfo({ ...userInfo, profileImage: e.target.files[0] });
  };

  const validateNewPassword = (e) => {
    const newPassword = e.target.value;
    setUserInfo({ ...userInfo, newPassword });

    const passwordRegTest = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;
    if (!passwordRegTest.test(newPassword)) {
      setMessages({
        ...messages,
        newPasswordMessage: '영어 대소문자, 특수문자, 숫자를 조합해 8자리 이상 20자리 이하로 입력해주세요!',
      });
      setValidity({ ...validity, isNewPasswordValid: false });
    } else {
      setMessages({ ...messages, newPasswordMessage: '사용 가능한 비밀번호 입니다!' });
      setValidity({ ...validity, isNewPasswordValid: true });
    }
  };

  const validateNewPasswordCheck = (e) => {
    const newPasswordCheck = e.target.value;
    setUserInfo({ ...userInfo, newPasswordCheck });

    if (userInfo.newPassword !== newPasswordCheck) {
      setMessages({
        ...messages,
        newPasswordCheckMessage: '비밀번호가 다릅니다! 다시 작성해주세요!',
      });
      setValidity({ ...validity, isNewPasswordCheckValid: false });
    } else {
      setMessages({
        ...messages,
        newPasswordCheckMessage: '똑같은 비밀번호를 입력하였습니다.',
      });
      setValidity({ ...validity, isNewPasswordCheckValid: true });
    }
  };

  const validatePhoneNumber = (e) => {
    const phoneNumber = e.target.value;
    setUserInfo({ ...userInfo, phoneNumber });

    const phoneRegTest = /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/;
    if (!phoneRegTest.test(phoneNumber)) {
      setMessages({
        ...messages,
        phoneNumberMessage: '올바른 형식이 아닙니다! -을 빼고 작성해주세요!',
      });
      setValidity({ ...validity, isPhoneNumberValid: false });
    } else {
      setMessages({ ...messages, phoneNumberMessage: '사용 가능한 전화번호입니다.' });
      setValidity({ ...validity, isPhoneNumberValid: true });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userInfo.newPassword !== userInfo.newPasswordCheck) {
      alert('새 비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!validity.isPhoneNumberValid) {
      alert('올바른 전화번호 형식이 아닙니다.');
      return;
    }

    if (!validity.isNewPasswordValid || !validity.isNewPasswordCheckValid) {
      alert('올바르지 않은 비밀번호 형식입니다.');
      return;
    }

    const formData = new FormData();
    formData.append('email', userInfo.email);
    formData.append('phoneNumber', userInfo.phoneNumber);
    formData.append('password', userInfo.password);
    formData.append('newPassword', userInfo.newPassword);
    if (userInfo.profileImage) {
      formData.append('profileImage', userInfo.profileImage);
    }

    try {
      const response = await updateUserInfo(formData);
      console.log(response); // Debug log to see the response
      if (response.success) {
        alert('정보가 성공적으로 업데이트되었습니다.');
        // Update localStorage with new profile image URL
        if (response.profileImage) {
          localStorage.setItem('profileImage', response.profileImage);
          console.log('Updated profileImage in localStorage:', response.profileImage); // Debug log
        }
        // Update localStorage with new phone number
        if (response.phoneNumber) {
          localStorage.setItem('phoneNumber', response.phoneNumber);
          console.log('Updated phoneNumber in localStorage:', response.phoneNumber); // Debug log
        }
        navigate('/mypage');
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error('error : ', error);
      alert('정보 업데이트에 실패했습니다.');
    }
  };

  const handleCancel = () => {
    navigate('/mypage');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <TopNav />
      <div className="flex flex-1">
        <SideNav />
        <main className="flex-1 p-6">
          <div className="profile-settings-content">
            <h1>상세 프로필 설정</h1>
            <form className="profile-settings-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>프로필 사진</label>
                <input type="file" name="profileImage" onChange={handleFileChange} />
              </div>
              <div className="form-group">
                <label>전화번호</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={userInfo.phoneNumber}
                  onChange={validatePhoneNumber}
                  placeholder="010-1234-5678"
                />
                <p className="errorMsg mt-2 text-xl text-red-600">{messages.phoneNumberMessage}</p>
              </div>
              <div className="form-group">
                <label>현재 비밀번호</label>
                <input type="password" name="password" value={userInfo.password} onChange={handleChange} placeholder="현재 비밀번호 입력" />
              </div>
              <div className="form-group">
                <label>새 비밀번호</label>
                <input type="password" name="newPassword" value={userInfo.newPassword} onChange={validateNewPassword} placeholder="새 비밀번호 입력" />
                <p className="errorMsg mt-2 text-xl text-red-600">{messages.newPasswordMessage}</p>
              </div>
              <div className="form-group">
                <label>새 비밀번호 확인</label>
                <input type="password" name="newPasswordCheck" value={userInfo.newPasswordCheck} onChange={validateNewPasswordCheck} placeholder="새 비밀번호 확인" />
                <p className="errorMsg mt-2 text-xl text-red-600">{messages.newPasswordCheckMessage}</p>
              </div>
              <div className="form-buttons">
                <button
                  type="submit"
                  className="save-button"
                >
                  변경 사항 저장
                </button>
                <button type="button" className="cancel-button" onClick={handleCancel}>변경 사항 취소</button>
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
