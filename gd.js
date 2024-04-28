
function goToPage1() {
  document.getElementById('page1').style.display = 'block';
  document.getElementById('page2').style.display = 'none';
  document.getElementById('page3').style.display = 'none';
}

function goToPage2() {
  document.getElementById('page1').style.display = 'none';
  document.getElementById('page2').style.display = 'block';
  document.getElementById('page3').style.display = 'none';
}

function goToPage3() {
  document.getElementById('page1').style.display = 'none';
  document.getElementById('page2').style.display = 'none';
  document.getElementById('page3').style.display = 'block';
}