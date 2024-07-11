import React from 'react';
import {useAuth} from "../../context/AuthContext";
import AuthLayout from "../AuthLayout/AuthLayout";
import UnAuthLayout from "../UnAuthLayout/UnAuthLayout";


const NavBar = () => {
    const {isAuthenticated} = useAuth();

    return (
        <nav>
            {isAuthenticated ? <AuthLayout/> : <UnAuthLayout/>}
        </nav>
    );


}

export default NavBar;
