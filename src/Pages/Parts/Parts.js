import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Part from '../Part/Part';

const Parts = () => {
    const [parts, setparts] = useState([]);
    useEffect(() => {
        const getparts = async () => {
            const data = await axios.get(`https://floating-stream-33356.herokuapp.com/parts`);
            setparts(data.data);
        }
        getparts();
    }, [])
    return (
        <div>
            <h1>parts</h1>
            <div>
                {
                    parts.map(part => <Part
                        part={part}
                    ></Part>
                    )
                }
            </div>
        </div>
    );
};

export default Parts;