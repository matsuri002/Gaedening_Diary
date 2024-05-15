

// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Select from './components/select.jsx';
import NewEntry from './components/new_entry.jsx';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Select />} />
      <Route path="/NewEntry" element={<NewEntry />} />
    </Routes>
  </Router>
);

export default App;

