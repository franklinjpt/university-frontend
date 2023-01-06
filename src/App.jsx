import React from "react";
import AppBar from "./components/AppBar.jsx";
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Student from "./pages/Student.jsx";
import Professor from "./pages/Professor.jsx";
import Subject from "./pages/Subject.jsx";

function App() {


  return (
    <div className="App" >
        <BrowserRouter >
            <AppBar/>
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route path="*" element={<h1>404</h1>}/>
                <Route exact path="/student" element={<Student/>}/>
                <Route exact path="/professor" element={<Professor/>}/>
                <Route exact path="/subject" element={<Subject/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  )
}
// <AppBar />
// <TableMenu />
export default App
