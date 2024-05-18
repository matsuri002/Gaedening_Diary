// TodayPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Diary = () => (
    <div id="today">
      <h1>今日の記録</h1>            
      <div id="result"></div>
      <Link to="/"><button>＜</button></Link>
      <img src="https://lh3.googleusercontent.com/pw/AP1GczNEmhAg8HfnF7NAFUZ86xSiO7aWLpN88Fa6SnRdSTlxPTxSPqUQ-4F31PRsRYUt3QYVBNJJQthf14mlsPHWyUJ02uGvfvFaSxrHLDwtJ4_7T1wHXMUJCLQJBZFbiSb9VXTW9AgAzEofrOQhIuESdh7y=w835-h627-s-no" className="ms-1 list-group-horizontal" width="758" height="340" />
      <Link to="/"><button>＞</button></Link>
      <div id="memo-set">
        <div><label htmlFor="memo">メモ</label><br /></div>
        <div><textarea id="memo" name="memo" rows="4" cols="50"></textarea><br /><br /></div>
      </div>
      <Link to="/"><button>戻る</button></Link>
      {/* <div><button type="button" className="ms-1 btn btn-primary" onClick={goToFirstPage}>項目選択</button></div> */}
    </div>
  );

export default Diary;