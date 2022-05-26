import React from 'react';

const Repair = () => {
    return (
        <div>
            <div class="hero min-h-screen" style={{ backgroundImage: `url('https://i.ibb.co/kKFmYsS/istockphoto-489081568-612x612.jpg')` }}>
                <div class="hero-overlay bg-opacity-60"></div>
                <div class="hero-content text-center text-neutral-content">
                    <div class="max-w-md">
                        <h1 class="mb-5 text-5xl font-bold">We Can Repair</h1>
                        <p class="mb-5">We also provide repairing services on computer and computer parts and also we buy second hand computer parts at a good price. For selling, just contact us using the information given in the contact us section </p>
                        <div className='lg:ml-20'>
                            <div class="form-control mx-auto">
                                <label class="label">
                                    <span class="label-text">Your Email</span>
                                </label>
                                <label class="input-group mb-3">
                                    <span>Email</span>
                                    <input type="text" placeholder="email@yahoo.com" class="input input-bordered" />
                                </label>
                            </div>
                            <div class="form-control">
                                <label class="input-group mb-3">
                                    <span>Name</span>
                                    <input type="text" placeholder="Name" class="input input-bordered" />
                                </label>
                            </div>
                            <div class="form-control">
                                <label class="input-group mb-3">
                                    <span>Issue</span>
                                    <input type="text" placeholder="Issue" class="input input-bordered" />
                                </label>
                            </div>
                        </div>
                        <button class="btn btn-primary">Submit</button>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Repair;