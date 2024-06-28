import React, {useEffect, useState} from 'react';
import axios from "axios";
import RegisterForm from "../RegisterForm/RegisterForm";

const RegisterPage = () => {
    //useState
    const [data, setData] = useState({})

    useEffect(() => {
        //GET request to laravel api
        axios.get('http://localhost:8000/api/get').then(response => {
            setData(response.data)
        }).catch(error => {
            console.error('Error fetching data - ', error)
        })

    }, []);

    return (
        <div className=" flex flex-wrap justify-center">
            <pre>{JSON.stringify(data, null, 2)}</pre>
            <h1 className="w-full text-center">Register an Account to Gain Access!</h1>
            <br/>
            <RegisterForm/>
        </div>
    );

}
export default RegisterPage;
