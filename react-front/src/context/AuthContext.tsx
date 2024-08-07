import React, {createContext, ReactNode, useContext, useState} from 'react';
import axios from "axios";
import {NavigateFunction} from "react-router-dom";

interface AuthContextType {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
    loginUser: (emailData: string, passwordData: string, navigate: NavigateFunction) => void;
    postAUser: (fullNameData: string, emailData: string, passwordData: string, navigate: NavigateFunction) => void;
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
    const loginUser = (emailData: string, passwordData: string, navigate: NavigateFunction) => {
        axios.post('http://localhost:8000/api/login',
            {email: emailData, password: passwordData})
            .then((response) => {
                localStorage.setItem('authToken', response.data.token);
                localStorage.setItem('userEmail', response.data.email);
                localStorage.setItem('userName', response.data.name);

                console.log(response.data)
                alert(`${response.data.name}, You have been logged in!`);

                login();
                navigate('/private');
            }).catch((e) => {
            alert("Error Logging in - Please ensure credentials are valid");
        })
    }
    const postAUser = (fullNameData: string, emailData: string, passwordData: string, navigate: NavigateFunction) => {
        axios.post('http://localhost:8000/api/register',
            {name: fullNameData, email: emailData, password: passwordData})
            .then((response) => {
                const userToken = response.data.token;
                localStorage.setItem('authToken', userToken);
                localStorage.setItem('userEmail', response.data.email);
                localStorage.setItem('userName', response.data.name);

                console.log(response.data);
                alert("User Successfully Registered!\n" + response.data.name);

                login();
                navigate('/user-settings');
            }).catch((e) => {
            alert("Error in Registering Account - " + e);
        })
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout, loginUser, postAUser}}>
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

export const resetPassword = (password: string, token: string, email: string) => {
    console.log(password, ' ', token);
    axios.post('http://localhost:8000/api/reset-password', {
        password: password,
        token: token,
        email: 'rd@email.ca'
    }).then((response) => {
    }).catch((e) => {

    })

}

export const forgotPassword = (email: string) => {
    axios.post('http://localhost:8000/api/forgot-password', {email: email})
        .then((response) => {
            console.log(response.data)
        }).catch((e) => {
        console.log(e)
        alert(e.message);
    })
}