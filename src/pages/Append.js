import React, { useState, useEffect } from 'react';
import axios from 'axios';


// OpenWeatherMap API 키
const API_KEY = '17b429a820b8a6496558ef04590c64f9';

// 서울의 위도와 경도
const SEOUL_COORDS = { lat: 37.5665, lon: 126.9780 };

const Append = () => {
  // 날씨 정보를 저장할 상태 변수
  const [weatherInfo, setWeatherInfo] = useState(null);

  useEffect(() => {
    // 서울의 날씨 정보를 가져오는 비동기 함수
    //async 키워드는 함수가 비동기적으로 작동함을 나타냅니다. 이는 함수가 비동기적으로 실행될 때 해당 함수가 다른 코드와 동시에 실행될 수 있음을 의미합니다.
    
    const fetchSeoulWeather = async () => {
      try {
        // OpenWeatherMap API를 사용하여 서울의 7일간의 날씨 정보 요청
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/forecast/daily?lat=${SEOUL_COORDS.lat}&lon=${SEOUL_COORDS.lon}&cnt=7&appid=${API_KEY}&units=metric`);
        
        // 요청한 날씨 정보를 상태 변수에 저장
        setWeatherInfo(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    // 컴포넌트가 마운트될 때 날씨 정보를 가져오는 함수 호출
    fetchSeoulWeather();
  }, []);

  // 날씨 정보가 없는 경우 로딩 메시지 표시
  if (!weatherInfo) {
    return <div className="text-center p-5">Loading...</div>;
  }

  // 날씨 정보가 있는 경우 화면에 표시
  return (
    // 날씨 정보를 가로로 나열하고 화면이 넘칠 경우 가로 스크롤이 생성되도록 설정
    <div className="flex flex-wrap justify-center p-5 overflow-x-auto">
      {weatherInfo.list.map((weather, index) => (
        // 각 날씨 정보를 백그라운드가 회색이고 테두리가 둥근 박스로 표시
        <div key={index} className="bg-gray-100 rounded-lg p-3 m-2 flex-none w-32 text-center flex-shrink-0">
          {/* 서울이라는 제목을 표시 */}
          <h2 className="text-xs font-bold mb-2">서울</h2>
          <div className="flex flex-col items-center">
            {/* 날씨 아이콘을 표시 */}
            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description} className="w-12 h-12" />
            <div className="mt-2">
              {/* 각종 날씨 정보를 표시 */}
              <h3 className="text-xs">날짜: {new Date(weather.dt * 1000).toLocaleDateString()}</h3>
              <h3 className="text-xs">현재기온: <span className="text-xs">{weather.temp.day.toFixed(2)} °C</span></h3>
              <h3 className="text-xs">최저기온: <span className="text-xs">{weather.temp.min.toFixed(2)} °C</span></h3>
              <h3 className="text-xs">최대기온: <span className="text-xs">{weather.temp.max.toFixed(2)} °C</span></h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Append;