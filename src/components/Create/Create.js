import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dataSearch from '../../assets/data.json'

function Create() {
    const [data, setData] = useState([]);
    useEffect(() => {
        setData(dataSearch);
    }, [])
    const createData = async () => {
        for (let i = 0; i < data.length; i++) {
            await axios.post('http://06f0494f9632.ngrok.io/api/document/create', data[i]);
        }
        console.log("scc");
    }
    return (
        <div>
            <button type="submit" onClick={() => createData()}>Create</button>
        </div>
    );
}

export default Create;