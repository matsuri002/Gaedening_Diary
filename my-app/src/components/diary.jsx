// TodayPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Diary = () => (
  <body>
    <div id="today">
      <div className='todays'>
      <h1>今日の記録</h1> </div>           
      <div id="result"></div>
      <Link to="/"><button className="before-botton">＜</button></Link>
      <img src="https://lh3.googleusercontent.com/pw/AP1GczNEmhAg8HfnF7NAFUZ86xSiO7aWLpN88Fa6SnRdSTlxPTxSPqUQ-4F31PRsRYUt3QYVBNJJQthf14mlsPHWyUJ02uGvfvFaSxrHLDwtJ4_7T1wHXMUJCLQJBZFbiSb9VXTW9AgAzEofrOQhIuESdh7y=w835-h627-s-no" className="ms-1 list-group-horizontal" width="758" height="340" alt="" />
      <Link to="/"><button className="after-botton">＞</button></Link>
      <div id="memo-set">
        <div className="dairy-container">
          <Link to="/"><button className="diary-back-botton">戻る</button></Link>
          <div><label htmlFor="memo">メモ</label><br /></div>
          <div><textarea id="memo" name="memo" rows="4" cols="50"></textarea><br /><br /></div>
          
          
          <Link to="/"><button className="diary-botton">完了</button></Link>
        </div>
        </div>
    </div>
  </body>  
  );

export default Diary;
