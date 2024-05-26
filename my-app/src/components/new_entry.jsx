// new_entry.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

  const NewEntry = () => {
    const [name, setName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [memo, setMemo] = useState('');
    const [fiscalYear, setFiscalYear] = useState('');
    const [message, setMessage] = useState('');
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      const newVegetable = {
        name: name,
        cultivation_start_date: startDate,
        memo: memo,
        fiscal_year: fiscalYear,
      };
  
      try {
        const response = await axios.post('http://localhost:8000/vegetables', newVegetable);
        setMessage('Vegetable added successfully!');
        // リセットフォーム
        setName('');
        setStartDate('');
        setMemo('');
        setFiscalYear('');
      } catch (error) {
        setMessage('Error adding vegetable.');
        console.error('There was an error!', error);
      }
    };
  
    return (
      <div className="form-container">
        <div id="setup">
          <h1>新規追加</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">名前：</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            /><br /><br />
            <label htmlFor="start_date">栽培開始日:</label>
            <input
              type="date"
              id="start_date"
              name="start_date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            /><br /><br />
            <label htmlFor="memo">メモ：</label><br />
            <textarea
              id="memo"
              name="memo"
              rows="4"
              cols="50"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
            ></textarea><br /><br />
            <label htmlFor="fiscal_year">年度：</label>
            <input
              type="text"
              id="fiscal_year"
              name="fiscal_year"
              value={fiscalYear}
              onChange={(e) => setFiscalYear(e.target.value)}
            /><br /><br />
            <div id="result">{message}</div>
            <div className="form-button-container">
              <Link to="/"><button type="button" className="form-button">戻る</button></Link>
              <input type="submit" className="form-button" value="完了" />
            </div>
          </form>
        </div>
      </div>
    );
  };  

export default NewEntry;
