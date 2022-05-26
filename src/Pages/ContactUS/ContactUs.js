import React from 'react';

const ContactUs = () => {
    return (
        <div className='my-8'>
            <h1 className="text-5xl font-bold text-primary">Contact Us</h1>
            <div className="hero">

                <div className="hero-content flex-col lg:flex-row">
                    <img className='w-96' src="https://i.ibb.co/mvNZ4Gy/contact-us.png" />
                    <div className='text-left'>

                        <p className="mt-4">Phone : <span className='text-primary'>+8801645797223 or 01955569777</span></p>
                        <p className="mt-2 mb-3">Email : <span className='text-primary'>computermenia@yahoo.com</span></p>
                        <label className="mt-5">Write us : </label> <br />
                        <textarea className="textarea textarea-primary w-full mt-2" placeholder="How can we serve you?"></textarea> <br />
                        <button className="btn btn-primary w-full mt-2">Send Text</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;