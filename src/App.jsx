import React from "react";
import AppBar from "./components/AppBar.jsx";
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";

function App() {


  return (
    <div className="App" >
        <BrowserRouter >
            <AppBar/>
            <Routes>
                <Route exact path="/" element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  )
}
// <AppBar />
// <TableMenu />
export default App
