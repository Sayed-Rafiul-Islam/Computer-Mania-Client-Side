import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import MyOrder from './MyOrder';


const MyOrders = () => {

    const [user] = useAuthState(auth);
    const [myOrders, setMyOrders] = useState([]);
    useEffect(() => {
        const getOrders = async () => {
            const email = user?.email;
            if (email) {
                const { data } = await axios.get(`https://floating-stream-33356.herokuapp.com/myOrders?email=${email}`)
                setMyOrders(data)
            }
        }
        getOrders();
    }, [user])

    const handleOrderCancel = async _id => {
        const url = `https://floating-stream-33356.herokuapp.com/orders/${_id}`;
        fetch(url, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                const newOrders = myOrders.filter(myOrder => myOrder?._id !== _id);
                setMyOrders(newOrders);
            })
    }


    return (
        <div>
            <h1>my orders</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>Price</th>
                            <th>Payment Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myOrders.map(myOrder =>
                                < tr >
                                    <th>{myOrder.index}</th>
                                    <td>{myOrder.name}</td>
                                    <td>{myOrder.amount}</td>
                                    <td>{myOrder.price}</td>
                                    <td><button onClick={() => handleOrderCancel(myOrder._id)} className='btn btn-sm btn-outline btn-error'>Cancel Order</button></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default MyOrders;