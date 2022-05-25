import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useForm } from "react-hook-form";

const AddPart = () => {
    const [disabilty, setDisabilty] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const [minquantity, setMinQuantity] = useState(parseInt(quantity));
    const imageStorageKey = 'f78a08d7ab8036cae9a602c466f23ece';

    const { register, formState: { errors }, handleSubmit, reset } = useForm();


    const [user] = useAuthState(auth);

    useEffect(() => {
        if (parseInt(quantity) >= parseInt(minquantity)) {
            setDisabilty(false);
        }
        else {
            setDisabilty(true);
        }
    }, [quantity, minquantity])



    const addPart = async data => {
        const image = data.image[0];
        const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
        const formData = new FormData();
        formData.append('image', image)
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    const img = result.data.url;
                    const newPart = {
                        email: user.email,
                        displayName: user.displayName,
                        name: data.name,
                        image: img,
                        description: data.description,
                        minimumQuantity: data.minimumQuantity,
                        quantity: data.quantity,
                        price: data.price
                    }
                    if (!disabilty) {
                        axios.post(`https://floating-stream-33356.herokuapp.com/newPart`, newPart)
                            .then(response => {
                                const { data } = response;
                                if (data.insertedId) {
                                }
                            })
                        reset()

                    }
                }

            })
        // data.preventDefault();

        // const name = e.target.name.value;
        // const image = e.target.image.value;
        // const description = e.target.description.value;
        // const minimumQuantity = e.target.minimumQuantity.value;
        // const quantity = e.target.quantity.value;
        // const price = e.target.price.value;
        // const newPart = {
        //     email: user.email,
        //     displayName: user.displayName,
        //     name: name,
        //     image: image,
        //     description: description,
        //     minimumQuantity: minimumQuantity,
        //     quantity: quantity,
        //     price: price
        // }


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
            <form onSubmit={handleSubmit(addPart)}>
                <div className='form-control w-full mx-w-xs'>
                    <label className='label'>
                        <span className='label-text'>Product Name</span>
                    </label>
                    <input
                        type='text'
                        placeholder="Product name"
                        className='input input-bordered w-full mx-w-xs'
                        {...register("name", {
                            required: {
                                value: true,
                                message: 'Product Name is Required'
                            }
                        })} />
                    <label className='text'>
                        {errors.name?.type === 'required' && <span className='label-text-alt text-red-500'>{errors.name.message}</span>}
                    </label>
                </div>

                <div className='form-control w-full mx-w-xs'>
                    <label className='label'>
                        <span className='label-text'>Picture</span>
                    </label>
                    <input
                        type='file'
                        className='input input-bordered w-full mx-w-xs'
                        {...register("image", {
                            required: {
                                value: true,
                                message: 'Picture is Required'
                            }
                        })} />
                    <label className='text'>
                        {errors.name?.type === 'required' && <span className='label-text-alt text-red-500'>{errors.name.message}</span>}
                    </label>
                </div>


                <div className='form-control w-full mx-w-xs'>
                    <label className='label'>
                        <span className='label-text'>Description</span>
                    </label>
                    <input
                        type='text'
                        placeholder="Description"
                        className='input input-bordered w-full mx-w-xs'
                        {...register("description", {
                            required: {
                                value: true,
                                message: 'Description is Required'
                            }
                        })} />
                    <label className='text'>
                        {errors.name?.type === 'required' && <span className='label-text-alt text-red-500'>{errors.name.message}</span>}
                    </label>
                </div>

                <div className='form-control w-full mx-w-xs'>
                    <label className='label'>
                        <span className='label-text'>Amount</span>
                    </label>
                    <input
                        type='number'
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="Amount"
                        className='input input-bordered w-full mx-w-xs'
                        {...register("quantity", {
                            required: {
                                value: true,
                                message: 'Amount is Required'
                            }
                        })} />
                    <label className='text'>
                        {errors.name?.type === 'required' && <span className='label-text-alt text-red-500'>{errors.name.message}</span>}
                    </label>
                </div>

                {
                    disabilty ?
                        <div className='text-error mb-3'><small>Added Amount must be greater than Minimum Order Amount</small> <br /></div>
                        :
                        ''
                }

                <div className='form-control w-full mx-w-xs'>
                    <label className='label'>
                        <span className='label-text'>Minimum Order Amount</span>
                    </label>
                    <input
                        type='number'
                        onChange={(e) => setMinQuantity(e.target.value)}
                        placeholder="Minimum Order"
                        className='input input-bordered w-full mx-w-xs'
                        {...register("minimumQuantity", {
                            required: {
                                value: true,
                                message: 'Minimum Amount is Required'
                            }
                        })} />
                    <label className='text'>
                        {errors.name?.type === 'required' && <span className='label-text-alt text-red-500'>{errors.name.message}</span>}
                    </label>
                </div>

                <div className='form-control w-full mx-w-xs'>
                    <label className='label'>
                        <span className='label-text'>Price</span>
                    </label>
                    <input
                        type='number'
                        placeholder="$ Price"
                        className='input input-bordered w-full mx-w-xs'
                        {...register("price", {
                            required: {
                                value: true,
                                message: 'Price is Required'
                            }
                        })} />
                    <label className='text'>
                        {errors.name?.type === 'required' && <span className='label-text-alt text-red-500'>{errors.name.message}</span>}
                    </label>
                </div>

                {
                    disabilty ?
                        <input className='btn btn-primary w-full mx-w-xs' disabled type="submit" value='Add Product' />
                        :
                        <input className='btn btn-primary w-full mx-w-xs' type="submit" value='Add Product' />

                }
            </form>

            {/* <form className='lg:mr-96' onSubmit={addPart}>
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
            </form> */}
        </div >
    );
};

export default AddPart;