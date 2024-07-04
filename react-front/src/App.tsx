import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import NavBar from "./components/NavBar/NavBar";
import PrivatePage from "./components/PrivatePage/PrivatePage";
import PublicPage from "./components/PublicPage/PublicPage";


function App() {


    return (
        <BrowserRouter>
            <NavBar/>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/public" element={<PublicPage/>}/>
                    <Route path="/private" element={<PrivatePage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                </Routes>
        </BrowserRouter>
    );
}

export default App;
