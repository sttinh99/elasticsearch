import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dataSearch from '../../assets/data1.json'

function Create() {
    const [data, setData] = useState([]);
    useEffect(() => {
        setData(dataSearch);
    }, [])
    const createData = async () => {
        for (let i = 0; i < data.length; i++) {
            await axios.post('https://search-doc.herokuapp.com/api/document/create', data[i]);
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