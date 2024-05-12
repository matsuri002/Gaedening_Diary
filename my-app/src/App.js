// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React from 'react';
import FirstPage from './components/select.jsx';
import SetupPage from './components/new_entry.jsx';
import TodayPage from './components/diary.jsx';
// import VegetableForm from './components/new_entry.jsx';

function App() {
  return (
    <div>
      <FirstPage />
      <SetupPage />
      <TodayPage />
      {/* <VegetableForm /> */}
    </div>
  );
}

export default App;
