import React from 'react';
import {useAuth} from "../../context/AuthContext";
import AuthLayout from "../AuthLayout/AuthLayout";
import UnAuthLayout from "../UnAuthLayout/UnAuthLayout";
import logo from "../../logo.svg";


const NavBar = () => {
    const {isAuthenticated} = useAuth();

    //<UnAuthLayout/>
    return (
        <nav
            className="bg-white dark:bg-gray-900 fixed w-full flex top-0 start-0 border-b border-gray-200 dark:border-gray-600">
            <a href="/" className={"flex items-center space-x-3 rtl:space-x-reverse"}>
                <img src={logo} className="App-logo" alt="logo"/>
                <span
                    className={"self-center text-2xl font-semibold whitespace-nowrap dark:text-white"}>Re-App</span>
            </a>
            {isAuthenticated ? <AuthLayout/> : <UnAuthLayout/>
            }
        </nav>
    );
}

export default NavBar;



// <>
//     <div className="text-gray-500 border-b border-gray-200 ">
//         <ul className="flex -mb-px">
//             <li className="mr-2">
//                 <a href="#"
//                    className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 ">
//                     Public Page
//                 </a>
//             </li>
//             <li className="mr-2">
//                 <a href="#"
//                    className="inline-block p-4 text-purple-600 border-b-2 border-purple-600 rounded-t-lg active "
//                    aria-current="page">
//                     Private Page
//                 </a>
//             </li>
//             <li className="mr-2">
//                 <a href="#"
//                    className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 ">
//                     Other
//                 </a>
//             </li>
//         </ul>
//     </div>
//     <div className="flex">
//         <ul className="p-4">
//             <li>
//                 <a href="/login"
//                    className={"block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"}
//                    aria-current="page">Login</a>
//             </li>
//         </ul>
//         <a href="/register"
//            className={"text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-4 py-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"}>
//             Register</a>
//     </div>
// </>
