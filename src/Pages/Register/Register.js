import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import auth from '../../firebase.init';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import useToken from '../../hooks/useToken';

const Register = () => {
    const [user1, setUser1] = useState({});


    const [updateProfile, updating, error1] = useUpdateProfile(auth);
    // handle registration
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });



    const handleRegister = async e => {
        e.preventDefault();
        const displayName = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        const user = {
            user: { email, displayName }
        }
        setUser1(user)


        await createUserWithEmailAndPassword(email, password);
        await updateProfile({ displayName });



    }

    // error message 
    let errorMessage;
    if (error) {
        errorMessage = <p className='text-red-500'>{error.message}</p>;
    }

    //  navigation section
    const navigate = useNavigate();
    if (user) {
        toast.info('Verification mail has been sent');
        navigate('/home')
    }
    const [token] = useToken(user1);
    return (
        <div className='lg:mt-36'>
            <div className="card mx-auto mt-12 flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <h1 className="text-5xl font-bold">Please <span className='text-primary'>Register</span></h1>
                <form onSubmit={handleRegister} className="card-body">
                    <input type="text" placeholder="Name" name='name' className="input input-bordered" />
                    <input type="email" placeholder="Email" name='email' className="input input-bordered" />
                    <input type="password" placeholder="Password" name='password' className="input input-bordered" />
                    <input type="submit" placeholder="password" value='Register' className="btn btn-primary" />
                </form>
                {errorMessage}
            </div>
            <p className='text-center mt-3'>Already have an account? <Link className='text-decoration-none' to='/login'><span className='text-primary'>Go to Login</span></Link></p>
        </div>
    );
};

export default Register;