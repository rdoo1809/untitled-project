import React, {FC, useState} from 'react';
import InputHinter from "../InputHinter/InputHinter";
import axios from "axios";
import {useNavigate} from "react-router-dom";


const LoginForm = ({title = "Login to access your account!"}) => {
    const navigate = useNavigate();
    const [emailData, setEmail] = useState("");
    const [passwordData, setPassword] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    function loginUser() {
        axios.post('http://localhost:8000/api/login',
            {email: emailData, password: passwordData})
            .then((response) => {
                //const userToken = response.data.token;
                //localStorage.setItem('authToken', userToken);

                console.log(response.data);
                alert(`${response.data.name}, You have been logged in!`);

                navigate('/');
            }).catch((e) => {
            alert("Error in Registering Account - " + e);
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
                        disabled={isButtonDisabled}>
                    Submit
                </button>
            </div>
        </div>
    )


}

export default LoginForm;
