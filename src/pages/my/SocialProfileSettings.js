import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SocialupdateUserInfo } from '../../api/apiService';
import './SocialAndProfileSetting.css';
import { useTranslation } from 'react-i18next';

const SocialProfileSettings = () => {
  const { t } = useTranslation();
  const [userInfo, setUserInfo] = useState({
    email: '',
    phoneNumber: '',
    gender: 'none',
    profileImage: null,
    profileImageUrl: ''
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
      const gender = localStorage.getItem('gender') || 'none';

      setUserInfo({
        email: email || '',
        phoneNumber: phoneNumber || '',
        gender: gender,
        profileImage: null,
        profileImageUrl: ''
      });

      validatePhoneNumber(phoneNumber);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserInfo((prevState) => ({
          ...prevState,
          profileImageUrl: reader.result,
          profileImage: file
        }));
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload a valid image file (jpg or png).');
    }
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
      console.log(response);
      if (response.success) {
        alert('정보가 성공적으로 업데이트되었습니다.');
        if (response.profileImage) {
          localStorage.setItem('profileImage', response.profileImage);
        }
        if (response.phoneNumber) {
          localStorage.setItem('phoneNumber', response.phoneNumber);
        }
        if (response.gender) {
          localStorage.setItem('gender', response.gender);
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
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-1 justify-center items-center">
        <main className="flex-1 p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
          <div className="profile-settings-content">
            <h1 className="text-3xl font-bold mb-6 text-center">상세 프로필 설정</h1>
            <form className="profile-settings-form" onSubmit={handleSubmit}>
              <div className="form-group mb-6 text-center">
                <label className="block text-lg font-medium text-gray-700 mb-2">프로필 사진</label>
                <div
                  className="flex items-center justify-center w-32 h-32 mx-auto border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-500"
                  onClick={() => document.getElementById('file-upload').click()}
                >
                  <div className="flex flex-col items-center justify-center w-full h-full">
                    {userInfo.profileImageUrl ? (
                      <img src={userInfo.profileImageUrl} alt="Profile Preview" className="object-cover w-full h-full rounded-lg" />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-gray-400">
                        <span className="text-4xl">+</span>
                        <p className="text-sm">이미지를 업로드해주세요</p>
                      </div>
                    )}
                  </div>
                </div>
                <input
                  id="file-upload"
                  type="file"
                  name="profileImage"
                  accept="image/jpeg, image/png"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
              <div className="form-group mb-6">
                <label className="block text-lg font-medium text-gray-700">전화번호</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={userInfo.phoneNumber}
                  onChange={handlePhoneNumberChange}
                  placeholder="010-1234-5678"
                  className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <p className="errorMsg mt-2 text-sm text-red-600">{messages.phoneNumberMessage}</p>
              </div>

              {/* 성별 */}
              <div className="form-group mb-6 text-center">
                <label htmlFor="gender" className="block text-lg font-medium text-gray-700">Gender</label>
                <div className="flex items-center justify-center mt-2 space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="none"
                      className="mr-2"
                      checked={userInfo.gender === 'none'}
                      onChange={handleChange}
                    />
                    <span className="radio-label animate">선택안함</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      className="mr-2"
                      checked={userInfo.gender === 'male'}
                      onChange={handleChange}
                    />
                    <span className="radio-label animate">남성</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      className="mr-2"
                      checked={userInfo.gender === 'female'}
                      onChange={handleChange}
                    />
                    <span className="radio-label animate">여성</span>
                  </label>
                </div>
              </div>
              {/* 성별 끝 */}

              <div className="form-buttons flex justify-center space-x-4 mt-6">
                <button
                  type="submit"
                  className="save-button px-6 py-3 bg-indigo-600 text-white text-base font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  변경 사항 저장
                </button>
                <button
                  type="button"
                  className="cancel-button px-6 py-3 bg-gray-300 text-black text-base font-medium rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  onClick={handleCancel}
                >
                  변경 사항 취소
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
      {/* //////////////////// */}

    </div>
  );
}

export default SocialProfileSettings;
