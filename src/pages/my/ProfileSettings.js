import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUserInfo } from '../../api/apiService'; // API 서비스 함수 임포트
import { useTranslation } from "react-i18next";
import './SocialProfileSettings';

function ProfileSettings() {
  const { t } = useTranslation();
  const [userInfo, setUserInfo] = useState({
    email: '',
    phoneNumber: '',
    password: '',
    newPassword: '',
    newPasswordCheck: '',
    gender: "none",
    profileImage: null,
    profileImageUrl: ''
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
      const gender = localStorage.getItem('gender');

      setUserInfo({
        email: email || '',
        phoneNumber: phoneNumber || '',
        password: '',
        newPassword: '',
        newPasswordCheck: '',
        gender: gender || '',
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

  const validateNewPassword = (e) => {
    const newPassword = e.target.value;
    setUserInfo({ ...userInfo, newPassword });

    const passwordRegTest = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;
    if (!passwordRegTest.test(newPassword)) {
      setMessages({
        ...messages,
        newPasswordMessage: t('passwordFormatError'),
        // newPasswordMessage: '영어 대소문자, 특수문자, 숫자를 조합해 8자리 이상 20자리 이하로 입력해주세요!',
      });
      setValidity({ ...validity, isNewPasswordValid: false });
    } else {
      setMessages({ ...messages, newPasswordMessage: t('passwordValid') });
      // setMessages({ ...messages, newPasswordMessage: '사용 가능한 비밀번호 입니다!' });
      setValidity({ ...validity, isNewPasswordValid: true });
    }
  };

  const validateNewPasswordCheck = (e) => {
    const newPasswordCheck = e.target.value;
    setUserInfo({ ...userInfo, newPasswordCheck });

    if (userInfo.newPassword !== newPasswordCheck) {
      setMessages({
        ...messages,
        newPasswordCheckMessage: t('passwordMismatch'),
        // newPasswordCheckMessage: '비밀번호가 다릅니다! 다시 작성해주세요!',
      });
      setValidity({ ...validity, isNewPasswordCheckValid: false });
    } else {
      setMessages({
        ...messages,
        newPasswordCheckMessage: t('passwordMatch'),
        // newPasswordCheckMessage: '똑같은 비밀번호를 입력하였습니다.',
      });
      setValidity({ ...validity, isNewPasswordCheckValid: true });
    }
  };

  const validatePhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return;

    const phoneRegTest = /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/;
    if (!phoneRegTest.test(phoneNumber)) {
      setMessages({
        ...messages,
        phoneNumberMessage: t('phoneNumberFormatError'),
      });
      setValidity({ ...validity, isPhoneNumberValid: false });
    } else {
      setMessages({ ...messages, phoneNumberMessage: t('phoneNumberValid') });
      // setMessages({ ...messages, phoneNumberMessage: '사용 가능한 전화번호입니다.' });
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

    if (userInfo.newPassword !== userInfo.newPasswordCheck) {
      alert(t('passwordMismatchAlert'));
      // alert('새 비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!validity.isPhoneNumberValid) {
      alert(t('invalidPhoneNumberAlert'));
      // alert('올바른 전화번호 형식이 아닙니다.');
      return;
    }

    if (!validity.isNewPasswordValid || !validity.isNewPasswordCheckValid) {
      alert(t('invalidPasswordAlert'));
      // alert('올바르지 않은 비밀번호 형식입니다.');
      return;
    }

    const formData = new FormData();
    formData.append('email', userInfo.email);
    formData.append('phoneNumber', userInfo.phoneNumber);
    formData.append('password', userInfo.password);
    formData.append('newPassword', userInfo.newPassword);
    formData.append('gender', userInfo.gender);
    if (userInfo.profileImage) {
      formData.append('profileImage', userInfo.profileImage);
    }

    try {
      const response = await updateUserInfo(formData);
      console.log(response);
      if (response.success) {
        alert(t('updateSuccess'));
        // alert('정보가 성공적으로 업데이트되었습니다.');
        if (response.profileImage) {
          localStorage.setItem('profileImage', response.profileImage);
          console.log('Updated profileImage in localStorage:', response.profileImage);
        }
        if (response.phoneNumber) {
          localStorage.setItem('phoneNumber', response.phoneNumber);
          console.log('Updated phoneNumber in localStorage:', response.phoneNumber);
        }
        if (response.gender) {
          localStorage.setItem('gender', response.gender);
          console.log('Updated gender in localStorage:', response.gender);
        }
        navigate('/mypage');
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error('error : ', error);
      alert(t('updateFailure'));
      // alert('정보 업데이트에 실패했습니다.');
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
            <h1 className="text-3xl font-bold mb-6 text-center">{t("profile")}</h1>
            <form className="profile-settings-form" onSubmit={handleSubmit}>
              <div className="form-group mb-6 text-center">
                <label className="block text-lg font-medium text-gray-700 mb-2">{t("picture")}</label>
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
                        <p className="text-sm">{t("uploadImg")}</p>
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
                <label className="block text-lg font-medium text-gray-700">{t("phoneCall")}</label>
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
              <div className="form-group mb-6">
                <label className="block text-lg font-medium text-gray-700">{t("password")}</label>
                <input
                  type="password"
                  name="password"
                  value={userInfo.password}
                  onChange={handleChange}
                  placeholder={t("password")}
                  className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="form-group mb-6">
                <label className="block text-lg font-medium text-gray-700">{t("passwordNew")}</label>
                <input
                  type="password"
                  name="newPassword"
                  value={userInfo.newPassword}
                  onChange={validateNewPassword}
                  placeholder={t("passwordNew")}
                  className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <p className="errorMsg mt-2 text-sm text-red-600">{messages.newPasswordMessage}</p>
              </div>
              <div className="form-group mb-6">
                <label className="block text-lg font-medium text-gray-700">{t("passwordNewCheck")}</label>
                <input
                  type="password"
                  name="newPasswordCheck"
                  value={userInfo.newPasswordCheck}
                  onChange={validateNewPasswordCheck}
                  placeholder={t("passwordNewCheck")}
                  className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <p className="errorMsg mt-2 text-sm text-red-600">{messages.newPasswordCheckMessage}</p>
              </div>
              {/* 성별 */}
              <div className="form-group mb-6 text-center">
                <label htmlFor="gender" className="block text-lg font-medium text-gray-700">{t("gender")}</label>
                <div className="flex items-center justify-center mt-2 space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="none"
                      className="mr-2"
                      defaultChecked
                      onChange={handleChange}
                    />
                    <span className="radio-label animate">{t("noCheck")}</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      className="mr-2"
                      onChange={handleChange}
                    />
                    <span className="radio-label animate">{t("man")}</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      className="mr-2"
                      onChange={handleChange}
                    />
                    <span className="radio-label animate">{t("woman")}</span>
                  </label>
                </div>
              </div>
              {/* 성별 끝 */}
              <div className="form-buttons flex justify-center space-x-4 mt-6">
                <button
                  type="submit"
                  className="save-button px-6 py-3 bg-indigo-600 text-white text-base font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {t("changeSave")}
                </button>
                <button
                  type="button"
                  className="cancel-button px-6 py-3 bg-gray-300 text-black text-base font-medium rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  onClick={handleCancel}
                >
                  {t("cancleChange")}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ProfileSettings;
