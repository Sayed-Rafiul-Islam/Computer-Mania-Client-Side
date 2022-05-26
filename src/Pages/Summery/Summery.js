import React from 'react';

const Summery = () => {
    return (
        <div>
            <h1 className='text-primary text-3xl my-4'>
                <b> Summery</b>
            </h1>
            <div className="stats stats-vertical lg:stats-horizontal shadow">

                <div className="stat">
                    <div className="stat-title">We Served</div>
                    <div className="stat-value">1000+</div>
                    <div className="stat-desc">CUstomers</div>
                </div>

                <div className="stat">
                    <div className="stat-title">New Users</div>
                    <div className="stat-value">4,200</div>
                    <div className="stat-desc">↗︎ 400 (22%)</div>
                </div>

                <div className="stat">
                    <div className="stat-title">We provide</div>
                    <div className="stat-value">100+</div>
                    <div className="stat-desc">Parts and Products</div>
                </div>

            </div>
        </div>
    );
};

export default Summery;