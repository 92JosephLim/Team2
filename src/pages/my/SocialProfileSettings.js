import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileSettings.css'; // Update with correct path
import { SocialupdateUserInfo } from '../../api/apiService';
// 다국어 지원 모드 추가
import { useTranslation } from "react-i18next";

const SocialProfileSettings = () => {

  const { t } = useTranslation();

  const [userInfo, setUserInfo] = useState({
    email: '',
    phoneNumber: '',
    gender: 'none',
    profileImage: null
  });

  const [messages, setMessages] = useState({
    phoneNumberMessage: ''
  });

  const [validity, setValidity] = useState({
    isPhoneNumberValid: false
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const email = localStorage.getItem('email');
      const phoneNumber = localStorage.getItem('phoneNumber');
      const gender = localStorage.getItem('gender') || 'none'; // 기본값 설정

      setUserInfo({
        email: email || '',
        phoneNumber: phoneNumber || '',
        gender: gender,
        profileImage: null
      });

      // 초기 전화번호 유효성 검사
      validatePhoneNumber(phoneNumber);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleFileChange = (e) => {
    setUserInfo({ ...userInfo, profileImage: e.target.files[0] });
  };

  const validatePhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return;

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

  const handlePhoneNumberChange = (e) => {
    const phoneNumber = e.target.value;
    setUserInfo({ ...userInfo, phoneNumber });
    validatePhoneNumber(phoneNumber);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validity.isPhoneNumberValid) {
      alert('올바른 전화번호 형식이 아닙니다.');
      return;
    }

    const formData = new FormData();
    formData.append('email', userInfo.email);
    formData.append('phoneNumber', userInfo.phoneNumber);
    formData.append('gender', userInfo.gender);
    if (userInfo.profileImage) {
      formData.append('profileImage', userInfo.profileImage);
    }

    try {
      const response = await SocialupdateUserInfo(formData);
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
        // Update localStorage with new gender
        if (response.gender) {
          localStorage.setItem('gender', response.gender);
          console.log('Updated gender in localStorage:', response.gender); // Debug log
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
      <div className="flex flex-1">
        <main className="flex-1 p-6">
          <div className="profile-settings-content">
            <h1>{t("profile")}</h1>
            <form className="profile-settings-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>{t("picture")}</label>
                <input type="file" name="profileImage" onChange={handleFileChange} />
              </div>
              <div className="form-group">
                <label>{t("phoneCall")}</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={userInfo.phoneNumber}
                  onChange={handlePhoneNumberChange}
                  placeholder="010-1234-5678"
                />
                <p className="errorMsg mt-2 text-xl text-red-600">{messages.phoneNumberMessage}</p>
              </div>

              {/* 성별 */}
              <div className="my-5 text-sm">
                <label htmlFor="gender" className="block text-black text-left">Gender</label>
                <div className="flex items-center mt-4">
                  <label className="inline-flex items-center mr-4">
                    <input type="radio" name="gender" value="none" className="mr-2" checked={userInfo.gender === 'none'} onChange={handleChange} />
                    {t("noCheck")}
                  </label>
                  <label className="inline-flex items-center mr-4">
                    <input type="radio" name="gender" value="male" className="mr-2" checked={userInfo.gender === 'male'} onChange={handleChange} />
                    {t("man")}
                  </label>
                  <label className="inline-flex items-center">
                    <input type="radio" name="gender" value="female" className="mr-2" checked={userInfo.gender === 'female'} onChange={handleChange} />
                    {t("woman")}
                  </label>
                </div>
              </div>
              {/* 성별 끝 */}

              <div className="form-buttons">
                <button
                  type="submit"
                  className="save-button"
                >
                  {t("changeSave")}
                </button>
                <button type="button" className="cancel-button" onClick={handleCancel}>{t("cancleChange")}</button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default SocialProfileSettings;
