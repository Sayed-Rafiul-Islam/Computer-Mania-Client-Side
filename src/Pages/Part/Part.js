import React from 'react';

const Part = (props) => {
    const { _id, name, image, description, minimumQuantity, quantity, price } = props.part;
    return (
        <div>
            <h4>Name : {name}</h4>
            <img src={image} style={{ width: "15%" }} alt="" />
            <p>Description : {description}</p>
            <p>Minimum Buy Quantity : {minimumQuantity}</p>
            <p>Available Quantity : {quantity}</p>
            <p>Price : ${price}</p>
        </div>
    );
};

export default Part;