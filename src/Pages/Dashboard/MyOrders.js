import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';

const MyOrders = () => {
    const navigate = useNavigate()
    const [user] = useAuthState(auth);
    const [myOrders, setMyOrders] = useState([]);
    useEffect(() => {
        const getOrders = () => {
            const email = user?.email;
            if (email) {
                fetch(`https://floating-stream-33356.herokuapp.com/myOrders?email=${email}`, {
                    method: "GET",
                    headers: {
                        'content-type': 'application/json',
                        'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                    .then(res => {
                        if (res.status === 401 || res.status === 403) {
                            navigate('/home')
                            signOut(auth);
                            localStorage.removeItem('accessToken')
                        }
                        return res.json()
                    })
                    .then(data => setMyOrders(data))
            }
        }
        getOrders();
    }, [user])

    const handleOrderCancel = _id => {
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
                            myOrders?.map((myOrder, index) =>
                                < tr key={myOrder._id} className='text-center'>
                                    <th>{index + 1}</th>
                                    <td>{myOrder.name}</td>
                                    <td>{myOrder.amount}</td>
                                    <td>{myOrder.price}</td>
                                    <td><Link to={`/dashboard/payment/${myOrder._id}`} className='btn btn-xs btn-outline btn-primary'>Proceed to Payment</Link></td>
                                    <td><button onClick={() => handleOrderCancel(myOrder._id)} className='btn btn-xs btn-outline btn-error'>Cancel Order</button></td>
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