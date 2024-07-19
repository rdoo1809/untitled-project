import React, {useEffect, useState} from 'react';
import {useUser} from "../../context/UserContext";
import SettingsForm from "../SettingsForm/SettingsForm";


const UserPage = () => {
    const {userName} = useUser();


    return (
        <div className='mt-40 text-3xl' data-testid="UserPage">
            <header className='ml-20'><b>{userName}</b> - Change your account settings here!
            </header>
            <main className='w-full mt-20 flex flex-wrap justify-center'>
                <SettingsForm />
            </main>
        </div>
    )
}

export default UserPage;
