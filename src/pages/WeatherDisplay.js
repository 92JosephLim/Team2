import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WeatherDisplay = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    axios.get('http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst', {
      params: {
        serviceKey: 'Gp0K6TjqqzvLQmwsUON5mQqNrXkR1Hs%2FS2CUpwV6lR2ONJ0b1eUmQdlQ22MfB3NgNhiU8nj80Qkvn3haEWGBgA%3D%3D',
        pageNo: '1',
        numOfRows: '1000',
        dataType: 'JSON', // JSON 데이터를 요청합니다.
        base_date: '20240508',
        base_time: '0600',
        nx: '55',
        ny: '127'
      }
    })
    .then(response => {
      setWeatherData(response.data);
    })
    .catch(error => {
      console.error('There was a problem with your axios operation:', error);
    });
  }, []);

  return (
    <div>
      {weatherData && (
        <div>
          <h2>API 응답</h2>
          <p>결과 코드: {weatherData.response.header.resultCode}</p>
          <p>결과 메시지: {weatherData.response.header.resultMsg}</p>

          <p>결과 메시지: {weatherData.response.header.numOfRows}</p>
          <p>결과 메시지: {weatherData.response.header.pageNo}</p>
          <p>결과 메시지: {weatherData.response.header.totalCount}</p>
          <p>결과 메시지: {weatherData.response.header.dataType}</p>
          <p>결과 메시지: {weatherData.response.header.baseDate}</p>
          <p>결과 메시지: {weatherData.response.header.baseTime}</p>
          <p>결과 메시지: {weatherData.response.header.nx}</p>
          <p>결과 메시지: {weatherData.response.header.ny}</p>
          <p>결과 메시지: {weatherData.response.header.category}</p>
          <p>결과 메시지: {weatherData.response.header.obsrValue}</p>

        </div>
      )}
    </div>
  );
};

export default WeatherDisplay;