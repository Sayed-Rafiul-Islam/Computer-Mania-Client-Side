import React from 'react';

const ContactUs = () => {
    return (
        <div className='my-8'>
            <h1 class="text-5xl font-bold text-primary">Contact Us</h1>
            <div class="hero">

                <div class="hero-content flex-col lg:flex-row">
                    <img className='w-96' src="https://i.ibb.co/mvNZ4Gy/contact-us.png" />
                    <div className='text-left'>

                        <p class="mt-4">Phone : <span className='text-primary'>+8801645797223 or 01955569777</span></p>
                        <p class="mt-2 mb-3">Email : <span className='text-primary'>computermenia@yahoo.com</span></p>
                        <label class="mt-5">Write us : </label> <br />
                        <textarea class="textarea textarea-primary w-full mt-2" placeholder="How can we serve you?"></textarea> <br />
                        <button class="btn btn-primary w-full mt-2">Send Text</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;