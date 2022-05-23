import React from 'react';

const MyOrder = (props) => {
    const myOrder = props.myOrder;
    console.log(myOrder)
    const { amount, name, image, price, _id } = myOrder;
    return (
        <tr>
            <th>1</th>
            <td>{name}</td>
            <td>{amount}</td>
            <td>{price}</td>
        </tr>
    );
};

export default MyOrder;