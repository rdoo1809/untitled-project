import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useUser} from "../../context/UserContext";
import SettingsForm from "../SettingsForm/SettingsForm";


const UserPage = () => {
    const {userName} = useUser();


    return (
        <div className='mt-40 text-3xl' data-testid="UserPage">
            <header><b>{userName}</b> - Change your account settings here!
            </header>
            <hr/>
            <main className='w-full'>
                <SettingsForm />
            </main>
        </div>
    )
}

export default UserPage;
