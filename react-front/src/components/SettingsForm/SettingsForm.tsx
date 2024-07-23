import React from 'react';
import {patchUser, useUser} from "../../context/UserContext";

const SettingsForm = () => {
    const {userName, setUserName} = useUser();
    const {emailAddress, setEmailAddress} = useUser();
    const patchDetails = () => patchUser(userName, emailAddress)


    const sendPasswordReset = () => {
        //
    }

    const deleteAccount = () => {
        //
    }

    return (
        <div>
            <div className="bg-amber-100 flex flex-wrap justify-center">
                <br/>
                <div className="w-2/3 my-4">
                    <label className="block font-medium text-sm text-gray-700 mx-10">
                        Name
                        <input
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="ml-4 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500
                        rounded-md shadow-sm w-3/4 p-2"/>
                    </label>
                </div>
                <div className="w-2/3 my-4">
                    <label className="block font-medium text-sm text-gray-700 mx-10">
                        Email
                        <input
                            value={emailAddress}
                            onChange={(e) => setEmailAddress(e.target.value)}
                            className="ml-4 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500
                        rounded-md shadow-sm w-3/4 p-2"/>
                    </label>
                </div>
                <div className="w-full text-center py-4">
                    <button onClick={patchDetails}
                            className="bg-blue-500 hover:bg-blue-700 text-sm text-white font-bold py-2 px-4 rounded-full"
                    >
                        Submit Changes
                    </button>
                </div>
            </div>
            <hr className="my-4"/>
            <div className="bg-amber-100 flex flex-col items-center gap-4 py-4">
                <p>Advanced Settings</p>
                <label className="block font-medium text-sm text-gray-700">
                    Request Password Reset Link</label>
                <button onClick={sendPasswordReset}
                        className="bg-amber-500 hover:bg-amber-700 text-sm text-white font-bold py-2 px-4 rounded-full"
                >Reset Password
                </button>
                <button onClick={deleteAccount}
                        className="bg-red-500 hover:bg-red-700 text-sm text-white font-bold py-2 px-4 rounded-full"
                >
                    Delete Account
                </button>
            </div>
        </div>
    );
}


export default SettingsForm;
