// FirstPage.jsx
import React from 'react';

function FirstPage() {
  return (
    <div id="first">
      {/* <button onClick={goToSetupPage} id="new" className="mt-1 mb-1 btn btn-info">新規追加</button> */}
      <div id="first-1">
        <h1>野菜を選択してください</h1>
        {/* <div><button type="button" className="mt-1 mb-1 w-50 btn btn-primary">小松菜</button></div>
        <div><button onClick={goToTodayPage} className="mt-1 mb-1 w-50 btn btn-primary">やさい</button></div> */}
        <div id="result"></div>
      </div>
    </div>
  );
}



export default FirstPage;
