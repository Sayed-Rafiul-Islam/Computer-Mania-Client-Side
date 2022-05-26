import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ManageParts = () => {

    const [parts, setParts] = useState([]);
    console.log(parts)

    useEffect(() => {
        const getParts = async () => {
            const data = await axios.get(`https://floating-stream-33356.herokuapp.com/parts`);
            setParts(data.data);
        }
        getParts();
    }, [])

    const removeProduct = _id => {
        const url = `https://floating-stream-33356.herokuapp.com/parts/${_id}`;
        fetch(url, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                const newParts = parts.filter(part => part?._id !== _id);
                setParts(newParts);
            })
    }
    return (
        <div className='w-full mt-5'>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr className='text-center'>
                            <th>No</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Amount</th>
                            <th>Minimum Order</th>
                            <th>Price</th>
                            <th>Product Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            parts?.map((part, index) =>
                                <tr className='text-center' key={part._id}>
                                    <td>{index + 1}</td>
                                    <td>{part.name}</td>
                                    <td><div className="avatar">
                                        <div className="w-24 mask mask-hexagon">
                                            <img src={part.image} alt="" />
                                        </div>
                                    </div></td>
                                    <td>{part.quantity}</td>
                                    <td>{part.minimumQuantity}</td>
                                    <td>{part.price}</td>
                                    <td><button onClick={() => removeProduct(part._id)} className='btn btn-xs btn-outline btn-error'>Remove Product</button></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default ManageParts;