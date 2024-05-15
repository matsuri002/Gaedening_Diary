// select.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Select = () =>(


// function Select() {
  // return (
    <div id="first">
      {/* <button onClick={goToSetupPage} id="new" className="mt-1 mb-1 btn btn-info">新規追加</button> */}
      <div id="first-1">
        <h1>野菜を選択してください</h1>
        <button>新規</button>
        {/* <div><button type="button" className="mt-1 mb-1 w-50 btn btn-primary">小松菜</button></div>
        <div><button onClick={goToTodayPage} className="mt-1 mb-1 w-50 btn btn-primary">やさい</button></div> */}
        <Link to="/screen2"><button>移動</button></Link>
        {/* <div id="result"></div> */}
      </div>
    </div>
  );
// }

export default Select;
