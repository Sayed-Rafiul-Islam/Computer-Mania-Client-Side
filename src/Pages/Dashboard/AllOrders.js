import axios from 'axios';
import React, { useEffect, useState } from 'react';

const AllOrders = () => {
    const [allOrders, setAllOrders] = useState([]);
    const [reload, setReload] = useState(0);

    useEffect(() => {
        const getParts = async () => {
            const data = await axios.get(`http://localhost:5000/allOrders`);
            setAllOrders(data.data);
        }
        getParts();
    }, [reload])

    const removeOrder = _id => {
        const url = `http://localhost:5000/orders/${_id}`;
        fetch(url, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                const newOrders = allOrders.filter(order => order?._id !== _id);
                setAllOrders(newOrders);
            })
    }

    const shipOrder = async _id => {
        await fetch(`http://localhost:5000/allOrders/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ shipStatus: true })
        })
            .then(res => res.json())
            .then(data => {
                setReload(reload + 1);
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
                            <th>Order Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allOrders?.map((order, index) =>
                                < tr key={order._id} className='text-center'>
                                    <th>{index + 1}</th>
                                    <td>{order.name}</td>
                                    <td>{order.amount}</td>
                                    <td>{order.price}</td>
                                    <td>
                                        {
                                            order.paid ? <b className='text-primary'>PAID</b>
                                                :
                                                <b className='text-error'>UNPAID</b>
                                        }
                                    </td>
                                    <td>
                                        {
                                            order.paid ?
                                                <>
                                                    {
                                                        order.shipStatus ? <i className='text-primary'>Shipped</i>
                                                            :
                                                            <button onClick={() => shipOrder(order._id)} className='btn btn-sm btn-outline btn-primary'>Ship Order</button>
                                                    }
                                                </>
                                                :
                                                <button onClick={() => removeOrder(order._id)} className='btn btn-sm btn-outline btn-error'>Remove Order</button>
                                        }
                                    </td>
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