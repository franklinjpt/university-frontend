import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import './App.css'

function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
