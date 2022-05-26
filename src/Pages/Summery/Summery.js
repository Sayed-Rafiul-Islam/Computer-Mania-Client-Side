import React from 'react';

const Summery = () => {
    return (
        <div>
            <h1 className='text-primary text-3xl my-4'>
                <b> Summery</b>
            </h1>
            <div class="stats stats-vertical lg:stats-horizontal shadow">

                <div class="stat">
                    <div class="stat-title">We Served</div>
                    <div class="stat-value">1000+</div>
                    <div class="stat-desc">CUstomers</div>
                </div>

                <div class="stat">
                    <div class="stat-title">New Users</div>
                    <div class="stat-value">4,200</div>
                    <div class="stat-desc">↗︎ 400 (22%)</div>
                </div>

                <div class="stat">
                    <div class="stat-title">We provide</div>
                    <div class="stat-value">100+</div>
                    <div class="stat-desc">Parts and Products</div>
                </div>

            </div>
        </div>
    );
};

export default Summery;