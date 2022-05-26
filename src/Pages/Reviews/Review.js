import axios from 'axios';
import React, { useEffect, useState } from 'react';
import UserReview from './UserReview';

const Review = () => {
    const [reviews, setReviews] = useState([]);
    console.log(reviews)
    useEffect(() => {
        const getparts = async () => {
            const data = await axios.get(`http://localhost:5000/reviews`);
            setReviews(data.data);
        }
        getparts();
    }, [])

    return (
        <div>
            <h1 className='text-primary text-3xl'>Reviews</h1>
            <div className='my-6'>
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