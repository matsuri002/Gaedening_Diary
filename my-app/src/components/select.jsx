// select.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Select = () => {
  const [vegetables, setVegetables] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVegetables = async () => {
      try {
        const response = await axios.get('http://localhost:8000/vegetables');
        setVegetables(response.data);
      } catch (error) {
        setError('Failed to fetch vegetables.');
        console.error('Error fetching vegetables:', error);
      }
    };

    fetchVegetables();
  }, []);

  return (
    <div>
      <Link to="/NewEntry"><button className="new-botton">新規<br />追加</button></Link>
      <div className="selection">
        <h1>野菜を選択してください</h1>
        <div className="button-container">
          {error && <p>{error}</p>}
          {vegetables.map((vegetable) => (
            <Link key={vegetable.id} to={`/Diary/${vegetable.id}`}>
              <button className="botton">{vegetable.name}</button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Select;

