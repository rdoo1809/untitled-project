import React, {useEffect, useState} from 'react';
import axios from "axios";

const PublicPage = () => {
        //useState
        const [data, setData] = useState({})

        useEffect(() => {
            //GET request to laravel api
            axios.get('http://localhost:8000/api/public').then(response => {
                setData(response.data)
            }).catch(error => {
                console.error('Error fetching data - ', error)
            })
        }, []);

        return (
            <div className={"text-center mt-40"} data-testid="PublicPage">
               <h1 className={"text-3xl"}> PublicPage Component</h1>
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>)
    }

    export default PublicPage;
