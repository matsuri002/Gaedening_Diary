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

// App.js
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Select from './components/select.jsx';
// import NewEntry from './components/new_entry.jsx';

// const App = () => (
//   <Router>
//     <Routes>
//       <Route path="/" element={<Select />} />
//       <Route path="/NewEntry" element={<NewEntry />} />
//     </Routes>
//   </Router>
// );

// export default App;

import React from 'react';
import Select from './components/select.jsx';
import NewEntry from './components/new_entry.jsx';
// import Diary from './components/diary.jsx';
// import VegetableForm from './components/new_entry.jsx';

function App() {
  return (
    <div>
      <Select />
      <NewEntry />
      {/* <TodayPage /> */}
      {/* <VegetableForm /> */}
    </div>
  );
}

export default App;
