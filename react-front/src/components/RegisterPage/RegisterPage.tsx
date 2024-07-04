import React, {useEffect, useState} from 'react';
import axios from "axios";
import RegisterForm from "../RegisterForm/RegisterForm";

const RegisterPage = () => {

    return (
        <div className="mt-40 flex flex-wrap justify-center">
            <RegisterForm title={"Register Today to Gain Access"} />
        </div>
    );

}
export default RegisterPage;
