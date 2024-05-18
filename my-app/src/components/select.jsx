// select.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Select = () =>(
  <body>
    <Link to="/NewEntry"><button className="new-botton">新規<br />追加</button></Link>
    <div className="selection">
        <h1>野菜を選択してください</h1>
        <div className="button-container">
          <Link to="/Diary"><button className="botton">小松菜</button></Link>
          <Link to="/Diary"><button className="botton">トマト</button></Link>
        </div>
    </div>
  </body>
  );


export default Select;
