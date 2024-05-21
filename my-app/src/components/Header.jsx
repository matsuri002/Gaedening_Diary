// Header.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';



const Header = () => {
  const [weather, setWeather] = useState('');

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/weather');
        setWeather(`現在の天気: ${response.data.weather}, 気温: ${response.data.temperature}℃`);
      } catch (error) {
        console.error("Error fetching the weather data", error);
      }
    };

    fetchWeather();
  }, []);

  return (
    <header>
      <div className="logo">
        <h3>{weather}</h3>
      </div>
    </header>
  );
};

export default Header;
