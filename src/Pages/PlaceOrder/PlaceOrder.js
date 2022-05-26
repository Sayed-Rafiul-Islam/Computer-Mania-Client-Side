import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router';
import auth from '../../firebase.init';

const PlaceOrder = () => {
    const [part, setPart] = useState({});
    const [able, setAble] = useState(false);
    const [reload, setReload] = useState(0);
    const [user] = useAuthState(auth);
    const { name, image, description, minimumQuantity, quantity, price } = part;


    const [amount, setAmount] = useState(0);

    useEffect(() => {
        if (parseInt(minimumQuantity) <= parseInt(amount) && parseInt(quantity) >= parseInt(amount)) {
            setAble(true)
        }
        else {
            setAble(false)
        }
    }, [amount])



    const { _id } = useParams();
    useEffect(() => {
        const getItem = async () => {
            const data = await axios.get(`http://localhost:5000/placeOrder/${_id}`);
            setPart(data.data);
        }
        getItem();
    }, [_id, reload])



    const handlePlaceOrder = async e => {
        e.preventDefault();
        const phone = e.target.phone.value;
        const address = e.target.address.value;

        const totalPriceInt = parseInt(amount) * parseInt(price);
        const totalPrice = `${totalPriceInt}`;
        console.log(totalPrice, totalPriceInt)

        const order = {
            userName: user.displayName,
            name: name,
            email: user.email,
            phone: phone,
            address: address,
            image: image,
            price: totalPrice,
            amount: amount
        }

        await axios.post(`http://localhost:5000/orders`, order)
            .then(response => {
                const { data } = response;
                if (data.insertedId) {
                    console.log('success', order)
                }
            })




        const newQuantity = parseInt(quantity) - parseInt(amount);
        const updatedQuantity = `${newQuantity}`;

        await fetch(`http://localhost:5000/placeOrder/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ updatedQuantity })
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setReload(reload + 1);
                }
            })

        e.target.reset()
        setAmount(0);
    }

    return (
        <div>
            <p>User Name : <span className='text-secondary'>{user.displayName}</span> <br /> Email : <span className='text-secondary'>{user.email}</span></p>
            <div className="mx-auto hero-content flex-col lg:flex-row">
                <img className='w-1/2 mr-2 rounded-l-full' src={image} alt='' />
                <div className='text-left ml-2'>
                    <h1 className="text-5xl font-bold">{name}</h1>
                    <p className="pt-4 mb-8"><i>{description}</i></p>
                    <p className='mb-2'>Minimum Order : <span className='text-primary'>{minimumQuantity}</span></p>
                    <p className='mb-2'>Available : <span className='text-secondary'>{quantity}</span></p>
                    <p className='mb-2'>Price : <span className='text-secondary'>${price}</span></p>

                    <div className='w-1/2 mt-9'>
                        <form onSubmit={handlePlaceOrder}>
                            <input onChange={(e) => setAmount(e.target.value)} type="number" placeholder="Enter Amount" name='amount' className="input my-2 input-bordered input-secondary w-1/2 max-w-xs" />
                            <input required type="number" placeholder="Phone Number" name='phone' className="input my-2 input-bordered input-secondary w-full max-w-xs" />
                            <input required type="text" placeholder="Shipping Address" name='address' className="input my-2 input-bordered input-secondary w-full max-w-xs" />
                            {
                                able ? <input className='btn btn-primary' type="submit" value="Place Order" id="" />
                                    :
                                    <input disabled className='btn btn-primary' type="submit" value="Place Order" id="" />
                            }
                        </form>
                        {
                            able || <small className='text-red-500 w-full'>Must be greater than {minimumQuantity} and lesser than {quantity}</small>
                        }
                    </div>
                </div>
            </div>
        </div>

    );
};

export default PlaceOrder;