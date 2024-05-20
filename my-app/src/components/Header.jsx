// Header.jsx
// import React from 'react'


// const Header = () => {
//   return (
//     <header>
//         <div className="logo">
//             <h3>明日の天気</h3>
//         </div>
//     </header>
//   );
// };

// export default Header

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Header = () => {
  const [weather, setWeather] = useState('');

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get('http://localhost:8000/weather');
        setWeather(`明日の天気: ${response.data.tomorrow_weather}, 気温: ${response.data.temperature}℃`);
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
