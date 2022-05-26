import React from 'react';

const MyPortfolio = () => {
    return (
        <div className="card lg:card-side bg-base-100 shadow-xl w-3/4 lg:ml-80 mx-auto lg:mt-36 mt-12">
            <figure><img className="w-96 rounded-xl" src="https://i.ibb.co/9vm0rcW/IMG-1697-min.jpg" alt='' /></figure>
            <div className="card-body text-left">
                <h2 className="card-title text-primary">Sayed Rafiul Islam</h2>
                <p><b className='text-primary'>Email :</b> sayedrafiulislam@gmail.com</p>
                <p><b className='text-primary'>Education :</b> <br /> Shahjalal University of Science And Technology <br />
                    Department of <b>Physics</b> <br />
                    Second Year, Second Semester
                </p>
                <h1><b className='text-primary'>Skills : </b><ul>
                    <li>- HTML</li>
                    <li>- CSS</li>
                    <li>- JavaScript</li>
                    <li>- NodeJS</li>
                    <li>- Bootstrap</li>
                    <li>- Tailwind</li>
                    <li>- React</li>
                    <li>- MongoDB</li>
                    <li>- Adobe Photoshop</li>
                </ul></h1> <br />
                <h1><b className='text-primary'>Projects : </b><ul>
                    <li>1. <a className='hover:text-secondary' target="blank" href='https://fruit-warhouse.web.app/'>Fruit Warehouse</a></li>
                    <li>2. <a className='hover:text-secondary' target="blank" href='https://assignment-10-a4aed.web.app/'>Physics With Fun</a></li>
                    <li>3. <a className='hover:text-secondary' target="blank" href='https://cloths-heaven.netlify.app/'>Cloth's Heaven</a></li>

                </ul>
                </h1>
            </div>
        </div>
    );
};

export default MyPortfolio;