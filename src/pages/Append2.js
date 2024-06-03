import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Append.css'; // Append.css 파일을 import



const cityNames = ['Seoul'];

const cityKoreanNames = ['서울'];

const Append = () => {
    const [weatherInfos, setWeatherInfos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const promises = cityNames.map(city =>
                    axios.get(`https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${city}&appid=17b429a820b8a6496558ef04590c64f9&units=metric`)
                   
                );

                const responses = await Promise.all(promises);
                const weatherData = responses.map(response => response.data);
                setWeatherInfos(weatherData);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="weather-container"> {/* 스타일 적용을 위한 컨테이너 */}
            {weatherInfos.map((weatherInfo, index) => (
                <div key={index} className="city-weather"> {/* 도시 날씨를 감싸는 div */}
                    <h2 className="city-name">{cityKoreanNames[index]}</h2> {/* 도시 이름 */}
                    <div className="weather-info">
                        <img src={`http://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}.png`} alt={weatherInfo.weather[0].description} /> {/* 날씨 아이콘 */}
                        <div className="temperature-info">
                            <h3>현재기온: {weatherInfo.list[0].main.temp}</h3> {/* 현재 기온 */}
                            <h3>최저기온: {weatherInfo.list[0].main.temp_min}</h3> {/* 최저 기온 */}
                            <h3>최대기온: {weatherInfo.list[0].main.temp_max}</h3> {/* 최대 기온 */}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Append;