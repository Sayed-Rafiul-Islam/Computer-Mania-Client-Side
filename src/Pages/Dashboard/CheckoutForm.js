import React, { useEffect, useState } from 'react';
import {
    CardElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router';


const CheckoutForm = ({ order }) => {
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessege, setErrorMessege] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const [success, setSuccess] = useState('')
    const [transactionId, setTransactionId] = useState('')
    const [loading, setLoading] = useState(false)
    const { price, email, _id } = order;

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
        setLoading(true);
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
        setSuccess('')

        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: email,
                    },
                },
            },
        );
        if (intentError) {
            setErrorMessege(intentError?.message)

        }
        else {
            setTransactionId(paymentIntent.id);
            setErrorMessege('');
            setSuccess("Payment Completed");

            fetch(`https://floating-stream-33356.herokuapp.com/payment/${_id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify({ orderId: _id, transactionId: paymentIntent.id })
            }).then(res => res.json())
                .then(data => console.log(data))

        }
        setLoading(false)
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
            {
                loading ? <p>loading</p> : <button className='btn btn-sm btn-outline btn-primary mt-5' type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
            }
            {errorMessege && <p className='text-error'>{errorMessege}</p>}
            {success && <div>
                <p className='text-primary'>{success}</p>
                <p>Your Transaction ID is : <b className='text-primary'>{transactionId}</b></p>
            </div>}
        </form>

    );
};

export default CheckoutForm;