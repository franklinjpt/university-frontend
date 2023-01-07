import React from "react";
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Student from "./pages/Student.jsx";
import Professor from "./pages/Professor.jsx";
import Subject from "./pages/Subject.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import AddEntity from "./pages/AddEntity.jsx";
import NavBar from "./components/NavBar.jsx";
import EditEntity from "./pages/EditEntity.jsx";

function App() {


  return (
    <div className="App" >
        <BrowserRouter >
            <NavBar />
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route path="*" element={<h1>404</h1>}/>
                <Route exact path="/student" element={<Student/>}/>
                <Route exact path="/professor" element={<Professor/>}/>
                <Route exact path="/subject" element={<Subject/>}/>
                <Route exact path="/addentity" element={<AddEntity/>}/>
                <Route exact path="/editentity/" element={<EditEntity/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  )
}
export default App
