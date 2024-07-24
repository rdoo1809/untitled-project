import React, {createContext, useState, useContext, ReactNode, useEffect} from 'react';
import axios from "axios";

interface UserContextType {
    userName: string;
    setUserName: (name: string) => void;
    emailAddress: string;
    setEmailAddress: (name: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [userName, setUserName] = useState(localStorage.getItem('userName') ?? "Account");
    const [emailAddress, setEmailAddress] = useState(localStorage.getItem('userEmail') ?? "") ;



    return (
        <UserContext.Provider value={{ userName, setUserName, emailAddress, setEmailAddress }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};


export const patchUser = (userName: string, emailAddress: string) => {
    axios.patch('http://localhost:8000/api/update-user', {name: userName, email: emailAddress}, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        }
    }).then(response => {
        alert(response.data.user.name + ", your account has been updated successfully!");
        console.log(response.data.user)
        localStorage.setItem('userEmail', response.data.user.email);
        localStorage.setItem('userName', response.data.user.name);

        // window.location.reload();
    }).catch(error => {
        console.error(error)
    })
}

export const deleteUser = () => {
    axios.delete('', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        }
    }).then((response)=>{

    }).catch((e)=>{
        alert(e);
    })
}
