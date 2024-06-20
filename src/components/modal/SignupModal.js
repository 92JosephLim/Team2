import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { registerUser, sendEmailVerification, confirmEmailVerification } from "../../api/apiService"; // API 서비스 함수들 가져오기
import { useTranslation } from "react-i18next";

const customStyles = {
  content: {
    top: '50%', // 화면의 중앙에 모달을 위치시키기 위해 설정
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)', // 화면의 정중앙으로 이동
    zIndex: 1000, // 모달의 z-index 값을 충분히 높게 설정
    position: 'fixed', // 모달의 position을 fixed로 설정
    width: '70%', // 모달의 너비를 70%로 설정
    height: '70%', // 모달의 높이를 70%로 설정
    padding: '10px', // 모달의 패딩을 줄여서 간격 조절
    paddingTop: '50px',
  },
  overlay: {
    zIndex: 1000 // 오버레이의 z-index 값을 충분히 높게 설정
  }
};

Modal.setAppElement('#root'); // 애플리케이션 루트를 설정하여 접근성을 향상시킴

function SignupModal({ isOpen, onRequestClose }) {
  const navigate = useNavigate();
  const [isCodeInputVisible, setIsCodeInputVisible] = useState(false);
  const [isTimerExpired, setIsTimerExpired] = useState(false);
  const [min, setMin] = useState(5);
  const [sec, setSec] = useState(0);
  const time = useRef(300);
  const timerId = useRef(null);
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordCheck: "",
    phoneNumber: "",
    gender: "none",
    language: "korean",
    profilePicture: null,
    profilePictureUrl: '',
    nickName: "",
  });

  const [verificationCode, setVerificationCode] = useState("");
  const [messages, setMessages] = useState({
    emailMessage: "",
    passwordMessage: "",
    passwordCheckMessage: "",
    phoneNumberMessage: "",
  });

  const [validity, setValidity] = useState({
    isEmail: false,
    isPassword: false,
    isPasswordCheck: false,
    isPhoneNumber: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevState) => ({
          ...prevState,
          profilePictureUrl: reader.result,
          profilePicture: file
        }));
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload a valid image file (jpg or png).');
    }
  };

  const onChangeEmail = (e) => {
    const currentEmail = e.target.value;
    setFormData({ ...formData, email: currentEmail });

    const emailRegTest = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
    if (!emailRegTest.test(currentEmail)) {
      setMessages({ ...messages, emailMessage: "이메일의 형식이 올바르지 않습니다!" });
      setValidity({ ...validity, isEmail: false });
    } else {
      setMessages({ ...messages, emailMessage: "" }); // 메시지 초기화
      setValidity({ ...validity, isEmail: true });
    }
  };

  const onChangePassword = (e) => {
    const currentPassword = e.target.value;
    setFormData({ ...formData, password: currentPassword });

    const passwordRegTest = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;
    if (!passwordRegTest.test(currentPassword)) {
      setMessages({ ...messages, passwordMessage: "영어 대소문자, 특수문자, 숫자를 조합해 8자리 이상 20자리 이하로 입력해주세요!" });
      setValidity({ ...validity, isPassword: false });
    } else {
      setMessages({ ...messages, passwordMessage: "사용 가능한 비밀번호 입니다!" });
      setValidity({ ...validity, isPassword: true });
    }
  };

  const onChangePasswordCheck = (e) => {
    const currentPasswordCheck = e.target.value;
    setFormData({ ...formData, passwordCheck: currentPasswordCheck });

    if (formData.password !== currentPasswordCheck) {
      setMessages({ ...messages, passwordCheckMessage: "비밀번호가 다릅니다! 다시 작성해주세요!" });
      setValidity({ ...validity, isPasswordCheck: false });
    } else {
      setMessages({ ...messages, passwordCheckMessage: "똑같은 비밀번호를 입력하였습니다." });
      setValidity({ ...validity, isPasswordCheck: true });
    }
  };

  const onChangePhone = (e) => {
    const currentPhoneNumber = e.target.value;
    setFormData({ ...formData, phoneNumber: currentPhoneNumber });

    const phoneRegTest = /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/;
    if (!phoneRegTest.test(currentPhoneNumber)) {
      setMessages({ ...messages, phoneNumberMessage: "올바른 형식이 아닙니다! -을 빼고 작성해주세요!" });
      setValidity({ ...validity, isPhoneNumber: false });
    } else {
      setMessages({ ...messages, phoneNumberMessage: "사용 가능한 전화번호입니다." });
      setValidity({ ...validity, isPhoneNumber: true });
    }
  };

  const handleSUSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const response = await registerUser(data);
      if (response.success) { // 서버 응답의 success 필드 확인
        navigate("/"); // 성공 시 메인 페이지로 이동
      } else {
        alert(response.message); // 실패 시 메시지 알림
      }
    } catch (error) {
      console.error("error : ", error); // 오류 발생 시 콘솔에 출력
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await sendEmailVerification(formData.email);
      if (response === "동일한 이메일이 존재합니다.") {
        setMessages({ ...messages, emailMessage: "이미 존재하는 이메일입니다!" });
        setValidity({ ...validity, isEmail: false });
      } else {
        setMessages({ ...messages, emailMessage: "인증 이메일이 전송되었습니다!" });
        setValidity({ ...validity, isEmail: true });
        setIsCodeInputVisible(true);
      }
    } catch (error) {
      console.error("error : ", error);
      setMessages({ ...messages, emailMessage: "서버 오류로 이메일을 확인할 수 없습니다." });
      setValidity({ ...validity, isEmail: false });
    }
  };

  const handleCodeSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await confirmEmailVerification(formData.email, verificationCode);
      alert(response);
    } catch (error) {
      console.error("error : ", error);
    }
  };

  useEffect(() => {
    if (isCodeInputVisible) {
      time.current = 300; // 타이머 초기화
      setMin(5);
      setSec(0);
      setIsTimerExpired(false);

      timerId.current = setInterval(() => {
        setMin(parseInt(time.current / 60));
        setSec(time.current % 60);
        time.current -= 1;
      }, 1000);

      return () => clearInterval(timerId.current);
    }
  }, [isCodeInputVisible]);

  useEffect(() => {
    if (time.current <= 0 && timerId.current) {
      console.log("타이머 시간 끝!!!!!");
      clearInterval(timerId.current);
      setIsTimerExpired(true);
    }
  }, [sec]);

  const handleCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleLanguageChange = (event) => {
    setFormData({ ...formData, language: event.target.value });
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles} contentLabel="Signup Modal">
      <div className="flex justify-center items-center">
        <div className="bg-white w-full p-4 rounded-xl shadow-md">
          <h1 className="font-medium text-2xl text-center mb-4">{t("signup")}</h1>
          <form onSubmit={handleSUSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div className="space-y-3">
              <div className="text-sm">
                <label htmlFor="email" className="block text-black text-left">{t("email")}</label>
                <div className="relative flex mt-1">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={onChangeEmail}
                    className="rounded-sm px-2 py-2 focus:outline-none bg-gray-100 w-full text-lg"
                    placeholder="Email"
                  />
                  <button
                    className="ml-2 text-center text-white bg-gray-800 px-1 py-1 duration-300 rounded-sm hover:bg-black"
                    onClick={handleEmailSubmit}
                  >
                    {t("getVerify")}
                  </button>
                </div>
                <p className="errorMsg mt-1 text-red-600 text-lg">{messages.emailMessage}</p>
              </div>
              {isCodeInputVisible && (
                <div className="text-sm">
                  <label htmlFor="emainCheck" className="flex justify-end block text-black text-lg">인증 번호를 입력하세요</label>
                  <div className="flex mt-1">
                    <input
                      type="text"
                      name="emainCheck"
                      id="emainCheck"
                      value={verificationCode}
                      onChange={handleCodeChange}
                      className="rounded-sm px-2 py-2 focus:outline-none bg-gray-100 w-4/5 text-lg"
                      placeholder="인증번호"
                    />
                    <button
                      className="ml-2 text-center text-white bg-gray-800 px-2 py-2 duration-300 rounded-sm hover:bg-black"
                      onClick={handleCodeSubmit}
                      disabled={isTimerExpired}
                    >
                      {t("checkVerify")}
                    </button>
                    <p className="timer mt-1 text-red-600 text-lg grid place-items-center ml-2">{min}:{sec}</p>
                  </div>
                </div>
              )}
              <div className="text-sm">
                <label htmlFor="nickName" className="block text-black text-left">{t("nickname")}</label>
                <input
                  type="text"
                  name="nickName"
                  id="nickName"
                  value={formData.nickName}
                  onChange={handleChange}
                  className="rounded-sm px-2 py-2 mt-1 focus:outline-none bg-gray-100 w-full"
                  placeholder="Nickname"
                />
              </div>
              <div className="text-sm">
                <label htmlFor="password" className="block text-black text-left">{t("password")}</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={onChangePassword}
                  className="rounded-sm px-2 py-2 mt-1 focus:outline-none bg-gray-100 w-full"
                  placeholder="Password"
                />
                <p className="errorMsg mt-1 text-lg text-red-600">{messages.passwordMessage}</p>
              </div>
              <div className="text-sm">
                <label htmlFor="passwordCheck" className="block text-black text-left">{t("checkPassword")}</label>
                <input
                  type="password"
                  name="passwordCheck"
                  id="passwordCheck"
                  value={formData.passwordCheck}
                  onChange={onChangePasswordCheck}
                  className="rounded-sm px-2 py-2 mt-1 focus:outline-none bg-gray-100 w-full"
                  placeholder="Password"
                />
                <p className="errorMsg mt-1 text-lg text-red-600">{messages.passwordCheckMessage}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="text-sm">
                <label htmlFor="phoneNumber" className="block text-black text-left">{t("phoneCall")}</label>
                <input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={onChangePhone}
                  className="rounded-sm px-2 py-2 mt-1 focus:outline-none bg-gray-100 w-full text-lg"
                  placeholder="Phone Number"
                />
                <p className="errorMsg mt-1 text-lg text-red-600">{messages.phoneNumberMessage}</p>
              </div>
              {/* 성별 */}
              <div className="text-sm">
                <label htmlFor="gender" className="block text-black text-left">{t("gender")}</label>
                <div className="flex items-center mt-2">
                  <label className="inline-flex items-center mr-2">
                    <input
                      type="radio"
                      name="gender"
                      value="none"
                      className="mr-1"
                      defaultChecked
                      onChange={handleChange}
                    />
                    <span className="radio-label animate">{t("noCheck")}</span>
                  </label>
                  <label className="inline-flex items-center mr-2">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      className="mr-1"
                      onChange={handleChange}
                    />
                    <span className="radio-label animate">{t("man")}</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      className="mr-1"
                      onChange={handleChange}
                    />
                    <span className="radio-label animate">{t("woman")}</span>
                  </label>
                </div>
              </div>
              <div className="text-sm">
                <FormControl fullWidth>
                  <InputLabel id="language-select-label">{t("language")}</InputLabel>
                  <Select
                    labelId="language-select-label"
                    id="language-select"
                    value={formData.language}
                    label="Language"
                    onChange={handleLanguageChange}
                  >
                    <MenuItem value="korean">{t("korean")}</MenuItem>
                    <MenuItem value="english">{t("english")}</MenuItem>
                    <MenuItem value="japanese">{t("japanese")}</MenuItem>
                    <MenuItem value="chinese">{t("chinese")}</MenuItem>
                    <MenuItem value="spanish">{t("spanish")}</MenuItem>
                    <MenuItem value="arabic">{t("arabic")}</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="text-sm text-center">
                <label htmlFor="profilePicture" className="block text-black text-left">Profile Image</label>
                <div
                  className="flex items-center justify-center w-32 h-32 mx-auto border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-500"
                  onClick={() => document.getElementById('file-upload').click()}
                >
                  <div className="flex flex-col items-center justify-center w-full h-full">
                    {formData.profilePictureUrl ? (
                      <img src={formData.profilePictureUrl} alt="Profile Preview" className="object-cover w-full h-full rounded-lg" />
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
                  name="profilePicture"
                  accept="image/jpeg, image/png"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </div>
            <div className="col-span-1 lg:col-span-2">
              <button
                className="block text-center text-white bg-gray-800 p-2 duration-300 rounded-sm hover:bg-black w-full"
                type="submit"
                disabled={!validity.isEmail || !validity.isPassword || !validity.isPasswordCheck || !validity.isPhoneNumber}
              >
                회원가입
              </button>

            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}

SignupModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};

export default SignupModal;
