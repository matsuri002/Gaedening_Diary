function goToFirstPage() {
    document.getElementById('first').style.display = 'block';
    document.getElementById('setup').style.display = 'none';
    document.getElementById('today').style.display = 'none';
    document.getElementById('before').style.display = 'none';
  }

  function goToSetupPage() {
    document.getElementById('first').style.display = 'none';
    document.getElementById('setup').style.display = 'block';
    document.getElementById('today').style.display = 'none';
    document.getElementById('before').style.display = 'none';
  }

  function goToTodayPage() {
    document.getElementById('first').style.display = 'none';
    document.getElementById('setup').style.display = 'none';
    document.getElementById('today').style.display = 'block';
    document.getElementById('before').style.display = 'none';
  }

  function goToBeforePage() {
    document.getElementById('first').style.display = 'none';
    document.getElementById('setup').style.display = 'none';
    document.getElementById('today').style.display = 'none';
    document.getElementById('before').style.display = 'block';
  }
  
  // function calculateDays() {
  //   // 登録日の取得
  //   var registrationDateInput = document.getElementById("start_date");
  //   var registrationDate = new Date(registrationDateInput.value);
  
  //   // 現在の日付の取得
  //   var currentDate = new Date();
  
  //   // 日数の差を計算
  //   var differenceInDays = Math.ceil((currentDate - registrationDate) / (1000 * 60 * 60 * 24));
  
  //   // 結果を表示
  //   var resultElement = document.getElementById("result");
  //   resultElement.textContent = "栽培から" + differenceInDays + "日目";
  // }
  
  // new_entry.js



  document.getElementById("vegetableForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const vegetableName = document.getElementById('vegetableName').value;

    // POSTリクエストを送信して、野菜の名前をサーバーに送信する
    fetch('/submitVegetable', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            vegetableName: vegetableName
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        alert("Vegetable name submitted successfully!");
    })
    .catch(error => {
        console.error('Error:', error);
        alert("An error occurred. Please try again.");
    });
});
