// App.js
import "./App.css";
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Select from './components/select.jsx';
import NewEntry from './components/new_entry.jsx';
import Diary from './components/diary.jsx';
import Header from './components/Header.jsx';

const App = () => (
  <Router>
    <Header />

    <Routes>
      <Route path="/" element={<Select />} />
      <Route path="/NewEntry" element={<NewEntry />} />
      <Route path="/Diary/:id" element={<Diary />} />
    </Routes>
  </Router>
);

export default App;

