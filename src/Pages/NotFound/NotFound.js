import React from 'react';

const NotFound = () => {
    return (
        <div>
            <div className='text-center mt-12'>
                <img className='w-1/4 mx-auto' src="https://i.ibb.co/YypN0yq/sad.png" alt="" />
                <h1 className='text-5xl text-primary'>404</h1>
                <h4 className='text-secondary'>page not found</h4>
                <p>The page you are looking for does not exists or another error occurred <br />
                    <b>Go Back</b> or head over to <b>https://computer-menia.web.app</b> to choose a new direction</p>
            </div>
        </div>
    );
};

export default NotFound;