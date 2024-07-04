import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import NavBar from "./components/NavBar/NavBar";


function App() {


    return (
        <BrowserRouter>
            <NavBar/>
            <div className={"mt-20"}>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/get" element={<RegisterPage/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
