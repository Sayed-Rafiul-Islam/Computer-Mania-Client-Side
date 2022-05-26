import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const AddReview = () => {
    const [user] = useAuthState(auth);
    const [rating, setRating] = useState('5');
    const handleRating = async e => {
        e.preventDefault();
        const experience = e.target.experience.value;
        const review = {
            email: user.email,
            displayName: user.displayName,
            rating: rating,
            experience: experience
        }
        if (user?.email) {
            await fetch(`http://localhost:5000/review?email=${user.email}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(review)
            })
                .then(res => res.json())
                .then(data => {

                })
        }
        e.target.reset()

    }

    return (
        <div className='mt-12 lg:mr-72'>
            <h1 className='text-3xl mb-4'><span className='text-primary'>Rate</span> Our Service</h1>
            <form onSubmit={handleRating}>
                <div onChange={e => setRating(e.target.value)} className="rating rating-lg rating-half mb-8">
                    <input type="radio" value='0.5' name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-1" />
                    <input type="radio" value='1' name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-2" />
                    <input type="radio" value='1.5' name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-1" />
                    <input type="radio" value='2' name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-2" />
                    <input type="radio" value='2.5' name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-1" />
                    <input type="radio" value='3' name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-2" />
                    <input type="radio" value='3.5' name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-1" />
                    <input type="radio" value='4' name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-2" />
                    <input type="radio" value='4.5' name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-1" />
                    <input type="radio" value='5' name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-2" />
                </div> <br />
                <textarea name='experience' className="textarea textarea-primary w-2/3" placeholder="How was your Experience ?"></textarea> <br />
                <input className='btn btn-primary w-1/4 mt-4' type="submit" value='Add Review' />
            </form>

        </div>
    );
};

export default AddReview;