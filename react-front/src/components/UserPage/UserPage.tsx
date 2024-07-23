import React, {useEffect, useState} from 'react';
import {useUser} from "../../context/UserContext";
import SettingsForm from "../SettingsForm/SettingsForm";


const UserPage = () => {
    const userName = localStorage.getItem('userName') ?? "";


    return (
        <div className='mt-40' data-testid="UserPage">
            <header className='ml-20  text-3xl'><b>{userName}</b> - Change your account settings and user info here!</header>
            <main className='w-full mt-20 flex justify-center'>
                <SettingsForm />
            </main>
        </div>
    )
}

export default UserPage;
