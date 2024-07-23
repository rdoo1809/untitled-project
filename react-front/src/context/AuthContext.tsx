import React, {createContext, useContext, useState, ReactNode} from 'react';

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
