import React, {useEffect, useState} from 'react';
import axios from "axios";


const PrivatePage = () => {
    const [data, setData] = useState({})

    //use effect run twice in strict mode
    useEffect(() => {
        //GET request to laravel api
        axios.get('http://localhost:8000/api/private', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            }
        }).then(response => {
            setData(response.data)
        }).catch(error => {
            console.error('Error fetching data - ', error)
        })
    }, []);

    return (
        <div className={"mt-40 text-center"} data-testid="PrivatePage">
            <br/>
            <h1 className={"text-3xl"}>Private Page</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    )
}

export default PrivatePage;
