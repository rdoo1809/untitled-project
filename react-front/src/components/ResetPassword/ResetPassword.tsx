import React, {FC, useEffect, useState} from 'react';
import InputHinter from "../InputHinter/InputHinter";
import {resetPassword} from "../../context/AuthContext";
import {useSearchParams} from "react-router-dom";



const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();

    const token = searchParams.get("token")||''

    console.log(searchParams.get("token"));
    return (
        <div className="w-1/2 bg-amber-100 flex flex-wrap justify-center mt-40">
            <h1 className="text-center text-2xl font-bold">Password Updater</h1>
            <br/>
            <div className="w-2/3">
                <InputHinter
                    name="Password"
                    type="text"
                    className="mt-1 block w-full"
                    value={password}
                    onChange={setPassword}
                />
            </div>
            <div className="w-full text-center py-4">
                <button onClick={() => resetPassword(password, token, '')}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                        Update Password
                </button>
            </div>
        </div>
    );
}


export default ResetPassword;
