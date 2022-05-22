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
            const data = await axios.get(`https://floating-stream-33356.herokuapp.com/placeOrder/${_id}`);
            setPart(data.data);
        }
        getItem();
    }, [_id, reload])



    const handlePlaceOrder = e => {
        e.preventDefault();
        const phone = e.target.phone.value;
        const address = e.target.address.value;

        e.target.reset()
        const newQuantity = parseInt(quantity) - parseInt(amount);
        const updatedQuantity = `${newQuantity}`;

        fetch(`https://floating-stream-33356.herokuapp.com/placeOrder/${_id}`, {
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
    }

    return (
        <div>
            <p>User Name : <span className='text-secondary'>{user.displayName}</span> <br /> Email : <span className='text-secondary'>{user.email}</span></p>
            <div class="mx-auto hero-content flex-col lg:flex-row">
                <img className='w-1/2 rounded-l-full' src={image} alt='' />
                <div className='text-left'>
                    <h1 class="text-5xl font-bold">{name}</h1>
                    <p class="pt-4 mb-8"><i>{description}</i></p>
                    <p className='mb-2'>Minimum Order : <span className='text-primary'>{minimumQuantity}</span></p>
                    <p className='mb-2'>Available : <span className='text-secondary'>{quantity}</span></p>
                    <p className='mb-2'>Price : <span className='text-secondary'>${price}</span></p>

                    <div className='w-1/2 mt-9'>
                        <form onSubmit={handlePlaceOrder}>
                            <input onChange={(e) => setAmount(e.target.value)} type="number" placeholder="Enter Amount" name='amount' class="input my-2 input-bordered input-secondary w-1/2 max-w-xs" />
                            <input required type="number" placeholder="Phone Number" name='phone' class="input my-2 input-bordered input-secondary w-full max-w-xs" />
                            <input required type="text" placeholder="Enter Address" name='address' class="input my-2 input-bordered input-secondary w-full max-w-xs" />
                            {
                                able ? <input className='btn btn-primary' type="submit" value="Place Order" id="" />
                                    :
                                    <input disabled className='btn btn-primary' type="submit" value="Place Order" id="" />
                            }
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default PlaceOrder;