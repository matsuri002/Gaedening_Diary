// SetupPage.jsx
import React from 'react';

function SetupPage() {
  return (
    <div id="setup" style={{ display: 'none' }}>
      <h1>新規追加</h1>
      <form>
        <label htmlFor="name">名前：</label>
        <input type="text" id="name" name="name" /><br /><br />
        <label htmlFor="start_date">栽培開始日:</label>
        <input type="date" id="start_date" />
        <div id="result"></div>
        <label htmlFor="message">メッセージ：</label><br />
        <textarea id="message" name="message" rows="4" cols="50"></textarea><br /><br />
        <input type="submit" className="ms-1 btn btn-primary" value="完了" />
        <button type="button" className="ms-1 btn btn-primary" onClick={goToFirstPage}>戻る</button>
      </form>
    </div>
  );
}

export default SetupPage;
