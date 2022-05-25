import axios from 'axios';
import React, { useEffect, useState } from 'react';

const AllOrders = () => {
    const [allOrders, setAllOrders] = useState([]);

    useEffect(() => {
        const getParts = async () => {
            const data = await axios.get(`https://floating-stream-33356.herokuapp.com/allOrders`);
            setAllOrders(data.data);
        }
        getParts();
    }, [])

    const removeOrder = _id => {
        const url = `https://floating-stream-33356.herokuapp.com/orders/${_id}`;
        fetch(url, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                const newOrders = allOrders.filter(order => order?._id !== _id);
                setAllOrders(newOrders);
            })
    }
    return (
        <div>
            <h1 className='text-3xl mr-48 my-7'>All <span className='text-primary'>Order</span></h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr className='text-center'>
                            <th>No</th>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>Price</th>
                            <th>Payment Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allOrders?.map(order =>
                                < tr className='text-center'>
                                    <th>{order.index}</th>
                                    <td>{order.name}</td>
                                    <td>{order.amount}</td>
                                    <td>{order.price}</td>
                                    <td><button onClick={() => removeOrder(order._id)} className='btn btn-sm btn-outline btn-error'>Cancel Order</button></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default AllOrders;