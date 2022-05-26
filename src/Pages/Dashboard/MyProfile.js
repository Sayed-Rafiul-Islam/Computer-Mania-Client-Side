import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const MyProfile = () => {
    const [user] = useAuthState(auth);
    const updateProfile = async e => {
        e.preventDefault();

        const education = e.target.education.value;
        const linkedin = e.target.linkedin.value;
        const location = e.target.location.value;
        const phone = e.target.phone.value;
        const profile = {
            email: user.email,
            displayName: user.displayName,
            education: education,
            linkedin: linkedin,
            location: location,
            phone: phone
        }
        if (user?.email) {
            await fetch(`http://localhost:5000/profile?email=${user.email}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(profile)
            })
                .then(res => res.json())
                .then(data => {

                })
        }
        e.target.reset()

    }
    return (
        <div className='mt-8 ml-8'>
            <h1 className='text-3xl lg:mr-96 mb-3'>Name : <span className='text-primary'>{user.displayName}</span></h1>
            <h1 className='text-xl lg:mr-96 mb-3'>Email : <span className='text-primary'>{user.email}</span></h1>
            <form className='lg:mr-96' onSubmit={updateProfile}>
                <input name='education' type="text" placeholder="Education" className="mb-3 input input-bordered input-primary w-full max-w-xs" /> <br />
                <input name='linkedin' type="text" placeholder="Linked In Profile Link" className="mb-3 input input-bordered input-primary w-full max-w-xs" /> <br />
                <input name='location' type="text" placeholder="Location" className="mb-3 input input-bordered input-primary w-full max-w-xs" /> <br />
                <input name='phone' type="number" placeholder="Cell Number" className="mb-3 input input-bordered input-primary w-full max-w-xs" /> <br />
                <input className='btn btn-primary' type="submit" value='Update Profile' />
            </form>
        </div>
    );
};

export default MyProfile;