import React, {createContext, useContext, useState, ReactNode} from 'react';
import axios from "axios";
import {log} from "node:util";

interface AuthContextType {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] =
        useState<boolean>(() => {
            const theToken = localStorage.getItem('authToken');
            return theToken ? true : false;
        });

    const login = () => {
        setIsAuthenticated(true)
    };
    const logout = () => {
        setIsAuthenticated(false);
        localStorage.clear();
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const loginUser = (emailData: string, passwordData: string) => {
    axios.post('http://localhost:8000/api/login',
        {email: emailData, password: passwordData})
        .then((response) => {
            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('userEmail', response.data.email);
            localStorage.setItem('userName', response.data.name);

            console.log(response.data)
            alert(`${response.data.name}, You have been logged in!`);
        }).catch((e) => {
        alert("Error Logging in - Please ensure credentials are valid");
    })
}

export const forgotPassword = (email: string) => {
    axios.post('http://localhost:8000/api/forgot-password', {email: email})
    .then((response) => {console.log(response.data)}).catch((e)=> console.log(e))
}

export const postAUser = (fullNameData: string, emailData: string, passwordData: string) => {
    axios.post('http://localhost:8000/api/register',
        {name: fullNameData, email: emailData, password: passwordData})
        .then((response) => {
            const userToken = response.data.token;
            localStorage.setItem('authToken', userToken);
            localStorage.setItem('userEmail', response.data.email);
            localStorage.setItem('userName', response.data.name);

            console.log(response.data);
            alert("User Successfully Registered!\n" + response.data.name);
        }).catch((e) => {
        alert("Error in Registering Account - " + e);
    })
}