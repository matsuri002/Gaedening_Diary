// Header.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Header = () => {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/weather');
        setWeather(response.data);
      } catch (error) {
        console.error("Error fetching the weather data", error);
      }
    };

    fetchWeather();
  }, []);

  return (
    <header>
      <div className="logo">
        <h3>明日の天気</h3>
        <p>
          朝：{weather.morning?.weather}　降水確率：{weather.morning?.pop * 100}%　　
          昼：{weather.afternoon?.weather}　降水確率：{weather.afternoon?.pop * 100}%　　
          夜：{weather.night?.weather}　降水確率：{weather.night?.pop * 100}%
        </p>
      </div>
    </header>
  );
};

export default Header;
