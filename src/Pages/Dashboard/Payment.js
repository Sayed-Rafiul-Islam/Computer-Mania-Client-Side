import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useQuery } from 'react-query'
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51L3JjiH7yGWsDGHml4W4G7p82P0PBWqkzlXFmz1HcpNdhwhwM8zirHnglh4UMjm7fazjm3R6jaaIoLitx0JIQAVz00iRb13JIA')

const Payment = () => {
    const { _id } = useParams();
    const url = `https://floating-stream-33356.herokuapp.com/payment/${_id}`
    const [order, setOrder] = useState({})
    const { name, image, address, amount, price } = order;

    useEffect(() => {
        const getParts = async () => {
            const data = await axios.get(url);
            setOrder(data.data);
        }
        getParts();
    }, [_id])


    console.log(order)


    return (
        <div className="card lg:card-side bg-base-100 shadow-xl w-3/4 lg:ml-48 mx-auto mt-12">
            <figure><img className="w-72 rounded-xl" src={image} alt='' /></figure>
            <div className="card-body text-left">
                <b className='text-primary text-3xl'>{name}</b>
                <b>Amount : <span className='text-primary'>{amount}</span></b>
                <b>Total Price : <span className='text-primary'>{price}</span></b>
                <b>Shipping Address : <span className='text-primary'>{address}</span></b>
                <div>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm order={order} />
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default Payment;