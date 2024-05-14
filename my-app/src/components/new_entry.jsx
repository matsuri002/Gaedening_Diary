// new_entry.jsx
import React from 'react';
// import { Link } from 'react-router-dom';

// const NewEntry = () => (
function NewEntry() {
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
        {/* <Link to="/"><button>戻る</button></Link> */}
        {/* <input type="submit" className="ms-1 btn btn-primary" value="完了" />
        <button type="button" className="ms-1 btn btn-primary" onClick={goToFirstPage}>戻る</button> */}
      </form>
    </div>
  );
}
// )

// document.getElementById("vegetableForm").addEventListener("submit", function(event) {
//   event.preventDefault();

//   const vegetableName = document.getElementById('vegetableName').value;

//   // POSTリクエストを送信して、野菜の名前をサーバーに送信する
//   fetch('/submitVegetable', {
//       method: 'POST',
//       headers: {
//           'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//           vegetableName: vegetableName
//       })
//   })
//   .then(response => {
//       if (!response.ok) {
//           throw new Error('Network response was not ok');
//       }
//       return response.json();
//   })
//   .then(data => {
//       console.log('Success:', data);
//       alert("Vegetable name submitted successfully!");
//   })
//   .catch(error => {
//       console.error('Error:', error);
//       alert("An error occurred. Please try again.");
//   });
// });
export default NewEntry;
