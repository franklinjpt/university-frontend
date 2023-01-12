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
import ViewEntity from "./pages/ViewEntity.jsx";

function App() {

    const apiUrl = "https://university-api-franklinjpt-dev.apps.rhoam-ds-prod.xe9u.p1.openshiftapps.com/university/api/";

  return (
    <div className="App" >
        <BrowserRouter >
            <NavBar />
            <Routes>
                <Route exact path="/" element={<Home apiUrl={apiUrl}/>}/>
                <Route path="*" element={<h1>404</h1>}/>
                <Route exact path="/student" element={<Student apiUrl={apiUrl}/>}/>
                <Route exact path="/professor" element={<Professor apiUrl={apiUrl}/>}/>
                <Route exact path="/subject" element={<Subject apiUrl={apiUrl}/>}/>
                <Route exact path="/addentity" element={<AddEntity apiUrl={apiUrl}/>}/>
                <Route exact path="/editentity" element={<EditEntity apiUrl={apiUrl}/>}/>
                <Route exact path="/viewentity" element={<ViewEntity apiUrl={apiUrl}/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  )
}
export default App
