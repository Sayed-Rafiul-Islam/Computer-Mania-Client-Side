import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Part from '../Part/Part';

const Parts = () => {
    const [parts, setParts] = useState([]);
    const homeParts = parts.slice(0, 6);
    useEffect(() => {
        const getparts = async () => {
            const data = await axios.get(`https://floating-stream-33356.herokuapp.com/parts`);
            setParts(data.data);
        }
        getparts();
    }, [])
    return (
        <div className='mt-5'>
            <h1 className='text-primary text-3xl mb-4 font-bold'>Parts</h1>
            <div className='grid lg:grid-cols-3 grid-cols-1'>
                {
                    homeParts.map(part => <Part
                        key={part._id}
                        part={part}
                    ></Part>
                    )
                }
            </div>
        </div>
    );
};

export default Parts;