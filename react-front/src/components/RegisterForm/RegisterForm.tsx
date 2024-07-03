import React, {FC, useEffect, useRef, useState} from 'react';
import InputHinter from "../InputHinter/InputHinter";
import axios from "axios";


interface RegisterFormProps {
}

const RegisterForm = ({title = "Register Now"}) => {
    const [fullNameData, setFullName] = useState("");
    const [emailData, setEmail] = useState("");
    const [passwordData, setPassword] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        // Disable the button if any of the inputs are empty
        setIsButtonDisabled(
            fullNameData.trim() === '' ||
            emailData.trim() === '' ||
            passwordData.trim() === ''
        );
    }, [fullNameData, emailData, passwordData]);

    function postNewUser() {
        axios.post('http://localhost:8000/api/register', {}).then((r) => {

            alert(fullNameData + emailData + passwordData);
            alert("User Successfully Registered!\n" + r);
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
