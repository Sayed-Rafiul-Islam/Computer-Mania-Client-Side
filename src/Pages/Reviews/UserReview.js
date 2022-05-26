import React from 'react';

const UserReview = (props) => {
    const { displayName, rating, experience } = props.userReview;
    return (
        <div className='px-5 my-4'>
            <div className='bg-success-content border border-primary text-left px-3 py-4 rounded-lg'>
                <h1 className='text-2xl text-primary'>{displayName}</h1>
                <p className='text-xs'>Rating : <span className='text-primary'>{rating}</span></p>
                <i>{experience}</i>
            </div>
        </div>
    );
};

export default UserReview;