import axios from 'axios';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

const AddPart = () => {
    const [show, setShow] = useState(false);
    const imageStorageKey = 'f78a08d7ab8036cae9a602c466f23ece';
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [user] = useAuthState(auth);

    const addPart = async data => {
        if (parseInt(data.quantity) >= parseInt(data.minimumQuantity)) {
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

                        axios.post(`https://floating-stream-33356.herokuapp.com/newPart`, newPart)
                            .then(response => {
                                const { data } = response;
                                if (data.insertedId) {
                                }
                            })
                        reset()
                        toast.success("Product Added Successfully")
                    }
                })
        }
        else {
            setShow(true);
            toast.error('Amount must be Greater than Minimum Order Amount');
        }


    }
    return (
        <div className='mt-12 lg:ml-48 w-1/2 mx-auto'>
            <h1 className='text-3xl mb-3'>Add A <span className='text-primary'>Product</span></h1>
            <form onSubmit={handleSubmit(addPart)}>
                <div className='form-control w-full mx-w-xs'>
                    <label className='text-left ml-4 mt-2'>
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
                    <label className='text-left ml-4 mt-2'>
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
                        {errors.image?.type === 'required' && <span className='label-text-alt text-red-500'>{errors.image.message}</span>}
                    </label>
                </div>


                <div className='form-control w-full mx-w-xs'>
                    <label className='text-left ml-4 mt-2'>
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
                        {errors.description?.type === 'required' && <span className='label-text-alt text-red-500'>{errors.description.message}</span>}
                    </label>
                </div>

                <div className='form-control w-full mx-w-xs'>
                    <label className='text-left ml-4 mt-2'>
                        <span className='label-text'>Amount</span>
                    </label>
                    <input
                        type='number'
                        placeholder="Amount"
                        className='input input-bordered w-full mx-w-xs'
                        {...register("quantity", {
                            required: {
                                value: true,
                                message: 'Amount is Required'
                            }
                        })} />
                    <label className='text'>
                        {errors.quantity?.type === 'required' && <span className='label-text-alt text-red-500'>{errors.quantity.message}</span>}
                    </label>
                </div>

                <div className='form-control w-full mx-w-xs'>
                    <label className='text-left ml-4 mt-2'>
                        <span className='label-text'>Minimum Order Amount</span>
                    </label>
                    <input
                        type='number'
                        placeholder="Minimum Order"
                        className='input input-bordered w-full mx-w-xs'
                        {...register("minimumQuantity", {
                            required: {
                                value: true,
                                message: 'Minimum Amount is Required'
                            }
                        })} />
                    <label className='text'>
                        {errors.minimumQuantity?.type === 'required' && <span className='label-text-alt text-red-500'>{errors.minimumQuantity.message}</span>}
                    </label>
                </div>

                <div className='form-control w-full mx-w-xs'>
                    <label className='text-left ml-4 mt-2'>
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
                        {errors.price?.type === 'required' && <span className='label-text-alt text-red-500'>{errors.price.message}</span>}
                    </label>
                </div>
                <input className='btn btn-primary lg:rounded-3xl rounded-xl w-1/2 mt-9 lg:mt-5' type="submit" value='Add Product' />
            </form>

        </div >
    );
};

export default AddPart;