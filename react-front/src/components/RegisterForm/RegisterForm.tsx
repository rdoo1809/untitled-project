import React, {useEffect, useState} from 'react';
import InputHinter from "../InputHinter/InputHinter";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import {useAuth, postAUser} from '../../context/AuthContext';

const RegisterForm = ({title = "Register Now"}) => {
    const {login} = useAuth();
    const navigate = useNavigate();
    const [fullNameData, setFullName] = useState("");
    const [emailData, setEmail] = useState("");
    const [passwordData, setPassword] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [areThereErrors, setAreThereErrors] = useState({
        //keys: undefined
    });

    const postNewUser = () => {
        postAUser(fullNameData, emailData, passwordData);
        login();
        navigate('/');
    }

    /* useEffect(() => {
         //disable button when length included an error
         setIsButtonDisabled(
              Object.keys(areThereErrors) === undefined || Object.keys(areThereErrors).length > 0
         );
         console.log(areThereErrors);
         console.log(Object.keys(areThereErrors).length)
     }, [fullNameData, emailData, passwordData]); */


    return (
        <div className="w-1/2 bg-amber-100 flex flex-wrap justify-center ">
            <h1 className="text-center text-2xl font-bold">{title}</h1>
            <br/>
            <div className="w-2/3">
                <InputHinter
                    name="Full Name"
                    type="text"
                    className="mt-1 block w-full"
                    value={fullNameData}
                    onChange={setFullName}
                />

                <InputHinter
                    name="Email Address"
                    type="text"
                    className="mt-1 block w-full"
                    value={emailData}
                    onChange={setEmail}
                />

                <InputHinter //id="test_hinter"
                    name="Password"
                    type="text"
                    className="mt-1 block w-full"
                    value={passwordData}
                    onChange={setPassword}
                    // areErrors={setAreThereErrors}
                />
            </div>

            <div className="w-full text-center py-4">
                <button onClick={postNewUser}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                        disabled={isButtonDisabled}>
                    Submit
                </button>
            </div>
        </div>
    )
}


export default RegisterForm;
