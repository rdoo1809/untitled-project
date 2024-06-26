import React, {FC, useEffect, useState} from 'react';
import axios from "axios";

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
        <div>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
        // <div data-testid="RegisterPage">
        //     RegisterPage Component
        // </div>
    );

}
export default RegisterPage;
