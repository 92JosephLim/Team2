import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_PRODUCTION_URL, // 기본 URL 설정
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    // 요청 전에 공통적으로 처리할 작업들
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => {
    // 응답 후에 공통적으로 처리할 작업들
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
