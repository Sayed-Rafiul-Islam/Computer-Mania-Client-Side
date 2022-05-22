import React from 'react';
import { useNavigate } from 'react-router';

const Part = (props) => {
    const { _id, name, image, description, minimumQuantity, quantity, price } = props.part;
    const navigate = useNavigate();
    const handlePlaceOrder = _id => {
        navigate(`/placeOrder/${_id}`)
    }
    return (
        <div className='mb-4'>
            <img src={image} className='w-1/2 mx-auto' alt="" />
            <h4>Name : {name}</h4>
            <p>Description : {description}</p>
            <p>Minimum Buy Quantity : {minimumQuantity}</p>
            <p>Available Quantity : {quantity}</p>
            <p>Price : ${price}</p>
            <button onClick={() => handlePlaceOrder(_id)} className='btn btn-primary rounded-lg'>Place Order</button>
        </div>
    );
};

export default Part;