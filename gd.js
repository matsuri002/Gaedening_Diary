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
  