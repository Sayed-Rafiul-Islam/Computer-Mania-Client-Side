import axios from 'axios';
import React, { useEffect, useState } from 'react';
import UserReview from './UserReview';

const Review = () => {
    const [reviews, setReviews] = useState([]);
    console.log(reviews)
    useEffect(() => {
        const getparts = async () => {
            const data = await axios.get(`https://floating-stream-33356.herokuapp.com/reviews`);
            setReviews(data.data);
        }
        getparts();
    }, [])

    return (
        <div>
            <h1 className='text-primary my-4 text-3xl'><b>Reviews</b></h1>
            <div className='my-6 grid lg:grid-cols-4'>
                {
                    reviews.map(userReview => <UserReview
                        key={userReview._id}
                        userReview={userReview}
                    ></UserReview>)
                }
            </div>
        </div>
    );
};

export default Review;