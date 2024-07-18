import React, {useState} from 'react';
import InputHinter from "../InputHinter/InputHinter";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useAuth} from '../../context/AuthContext';


const LoginForm = ({title = "Login to access your account!"}) => {
    const {login} = useAuth();
    const navigate = useNavigate();
    const [emailData, setEmail] = useState("");
    const [passwordData, setPassword] = useState("");

    function loginUser() {
        axios.post('http://localhost:8000/api/login',
            {email: emailData, password: passwordData})
            .then((response) => {
                localStorage.setItem('authToken', response.data.token);
                localStorage.setItem('userEmail', response.data.email);
                localStorage.setItem('userName', response.data.name);

                login();

                console.log(response.data)
                alert(`${response.data.name}, You have been logged in!`);
                navigate('/private');
            }).catch((e) => {
            alert("Error Logging in - Please ensure credentials are valid");
        })
    }


    return (
        <div className="w-1/2 bg-amber-100 flex flex-wrap justify-center ">
            <h1 className="text-center text-2xl font-bold">{title}</h1>
            <br/>
            <div className="w-2/3">
                <InputHinter
                    name="Email Address"
                    type="text"
                    className="mt-1 block w-full"
                    value={emailData}
                    onChange={setEmail}
                />

                <InputHinter
                    name="Password"
                    type="text"
                    className="mt-1 block w-full"
                    value={passwordData}
                    onChange={setPassword}
                />
            </div>

            <div className="w-full text-center py-4">
                <button onClick={loginUser}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                >
                    Submit
                </button>
            </div>
        </div>
    )


}

export default LoginForm;
