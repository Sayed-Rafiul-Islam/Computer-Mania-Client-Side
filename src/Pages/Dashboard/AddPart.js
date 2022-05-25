import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const AddPart = () => {
    const [disabilty, setDisabilty] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const [minquantity, setMinQuantity] = useState(parseInt(quantity));
    const imageStorageKey = 'f78a08d7ab8036cae9a602c466f23ece';

    const [user] = useAuthState(auth);

    useEffect(() => {
        if (parseInt(quantity) >= parseInt(minquantity)) {
            setDisabilty(false);
        }
        else {
            setDisabilty(true);
        }
    }, [quantity, minquantity])



    const addPart = async e => {
        e.preventDefault();

        const name = e.target.name.value;
        const image = e.target.image.value;
        const description = e.target.description.value;
        const minimumQuantity = e.target.minimumQuantity.value;
        const quantity = e.target.quantity.value;
        const price = e.target.price.value;
        const newPart = {
            email: user.email,
            displayName: user.displayName,
            name: name,
            image: image,
            description: description,
            minimumQuantity: minimumQuantity,
            quantity: quantity,
            price: price
        }

        console.log(e.target.value)

        // if (!disabilty) {
        //     await axios.post(`https://floating-stream-33356.herokuapp.com/newPart`, newPart)
        //         .then(response => {
        //             const { data } = response;
        //             if (data.insertedId) {
        //                 console.log('success')
        //             }
        //         })
        //     e.target.reset()

        // }
    }
    return (
        <div className='mt-8 ml-8'>
            <h1 className='text-3xl lg:mr-96 mb-3'>Add A <span className='text-primary'>Product</span></h1>
            <form className='lg:mr-96' onSubmit={addPart}>
                <input name='name' type="text" placeholder="Product name" className="mb-3 input input-bordered input-primary w-full max-w-xs" /> <br />
                <input name='image' className='input input-bordered input-primary mb-3' type="file" /> <br />
                <input name='description' type="text" placeholder="Short Description" className="mb-3 input input-bordered input-primary w-full max-w-xs" /> <br />
                <input onChange={(e) => setQuantity(e.target.value)} name='quantity' type="number" placeholder="Add Amount" className="mb-3 input input-bordered input-primary w-full max-w-xs" /> <br />
                {
                    disabilty ?
                        <div className='text-error mb-3'><small>Added Amount must be greater than Minimum Order Amount</small> <br /></div>
                        :
                        ''
                }
                <input onChange={(e) => setMinQuantity(e.target.value)} name='minimumQuantity' type="number" placeholder="Minimum Order Amount" className="mb-3 input input-bordered input-primary w-full max-w-xs" /> <br />
                <input name='price' type="number" placeholder="$ Price" className="mb-3 input input-bordered input-primary w-full max-w-xs" /> <br />
                {
                    disabilty ?
                        <input className='btn btn-primary' disabled type="submit" value='Add Product' />
                        :
                        <input className='btn btn-primary' type="submit" value='Add Product' />
                }
            </form>
        </div>
    );
};

export default AddPart;