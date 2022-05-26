import React from 'react';

const Repair = () => {
    return (
        <div>
            <div className="hero min-h-screen" style={{ backgroundImage: `url('https://i.ibb.co/kKFmYsS/istockphoto-489081568-612x612.jpg')` }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">We Can Repair</h1>
                        <p className="mb-5">We also provide repairing services on computer and computer parts and also we buy second hand computer parts at a good price. For selling, just contact us using the information given in the contact us section </p>
                        <div className='lg:ml-20'>
                            <div className="form-control mx-auto">
                                <label className="label">
                                    <span className="label-text">Your Email</span>
                                </label>
                                <label className="input-group mb-3">
                                    <span>Email</span>
                                    <input type="text" placeholder="email@yahoo.com" className="input input-bordered" />
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="input-group mb-3">
                                    <span>Name</span>
                                    <input type="text" placeholder="Name" className="input input-bordered" />
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="input-group mb-3">
                                    <span>Issue</span>
                                    <input type="text" placeholder="Issue" className="input input-bordered" />
                                </label>
                            </div>
                        </div>
                        <button className="btn btn-primary">Submit</button>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Repair;