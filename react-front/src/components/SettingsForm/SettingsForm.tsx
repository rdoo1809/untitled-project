import React, {useEffect, useMemo, useState} from 'react';
import InputHinter from "../InputHinter/InputHinter";
import axios from "axios";


const SettingsForm = () => {
    const [userName, setUserName] = useState("");
    const [emailAddress, setEmailAddress] = useState("");

    //useMemo for user?

    useEffect(() => {
        let storedEmail = (localStorage.getItem('userEmail'));
        let storedName = (localStorage.getItem('userName'));
        // @ts-ignore
        setEmailAddress(storedEmail);
        // @ts-ignore
        setUserName(storedName);

    }, []);

    const patchUser = () => {
        axios.patch("/api/update-user", {
            //

        }).then((data) => {
            //


        }).catch((e) => {
            console.log(e)
        });
    }

    return (
        <div className="w-1/2 bg-amber-100 flex flex-wrap justify-center">
            <br/>
            <div className="w-2/3 my-4">
                <label className="block font-medium text-sm text-gray-700 mx-10">
                    Name
                    <input
                        value={userName}
                        className="ml-4 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500
                        rounded-md shadow-sm w-3/4 p-2"/>
                </label>
            </div>
            <div className="w-2/3 my-4">
                <label className="block font-medium text-sm text-gray-700 mx-10">
                    Email
                    <input
                        value={emailAddress}
                        className="ml-4 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500
                        rounded-md shadow-sm w-3/4 p-2"/>
                </label>
            </div>
            <div className="w-full text-center py-4">
                <button onClick={patchUser}
                        className="bg-blue-500 hover:bg-blue-700 text-sm text-white font-bold py-2 px-4 rounded-full"
                >
                    Submit Changes
                </button>
            </div>
        </div>
    );
}


export default SettingsForm;
