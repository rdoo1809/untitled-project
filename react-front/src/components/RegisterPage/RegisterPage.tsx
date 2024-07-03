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
            <pre className="w-full">{JSON.stringify(data, null, 2)}</pre>
            <RegisterForm title={"Register Today to Gain Access"} />
        </div>
    );

}
export default RegisterPage;
