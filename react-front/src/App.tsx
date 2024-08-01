import React, {useState} from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import NavBar from "./components/NavBar/NavBar";
import PrivatePage from "./components/PrivatePage/PrivatePage";
import PublicPage from "./components/PublicPage/PublicPage";
import LoginPage from "./components/LoginPage/LoginPage";
import {AuthProvider} from "./context/AuthContext";
import {UserProvider} from "./context/UserContext";
import UserPage from "./components/UserPage/UserPage";
import ResetPassword from "./components/ResetPassword/ResetPassword";


function App() {

    const [userName, setUserName] =
        useState(localStorage.getItem('userName') ? localStorage.getItem('userName') : "");

    return (
        <UserProvider>
            <AuthProvider>
                <BrowserRouter>
                    <NavBar/>
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/public" element={<PublicPage/>}/>
                        <Route path="/private" element={<PrivatePage/>}/>
                        <Route path="/register" element={<RegisterPage/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/user-settings" element={<UserPage/>}/>
                        <Route path="/reset-password" element={<ResetPassword/>}/>
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </UserProvider>
    );
}

export default App;
