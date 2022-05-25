import React, { useEffect, useState } from 'react';
import {
    CardElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router';
import { signOut } from 'firebase/auth';
import auth from '../../firebase.init';

const CheckoutForm = ({ order }) => {
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessege, setErrorMessege] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const { price } = order;
    console.log(JSON.stringify({ price }))

    useEffect(() => {
        const getOrders = () => {
            if (price) {
                fetch(`https://floating-stream-33356.herokuapp.com/create-payment-intent`, {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json',
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify({ price })
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data?.clientSecret) {
                            setClientSecret(data.clientSecret)
                        }
                    })
            }
        }
        getOrders();
    }, [price])

    const handleSubmit = async e => {
        e.preventDefault()
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setErrorMessege(error?.message)
        } else {
            setErrorMessege('');
        }
    }
    return (

        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className='btn btn-sm btn-outline btn-primary mt-5' type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            {errorMessege && <p className='text-error'>{errorMessege}</p>}
        </form>

    );
};

export default CheckoutForm;