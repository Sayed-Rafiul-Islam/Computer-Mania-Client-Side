import React, { useState } from 'react';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import auth from '../../firebase.init';
import axios from 'axios';
import { toast } from 'react-toastify';
import SocialLogin from '../SocialLogin/SocialLogin';
import useToken from '../../hooks/useToken';

const Login = () => {
    // navigation section
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";

    // reset password auth
    const [email, setEmail] = useState('');
    const [sendPasswordResetEmail, sending, error1] = useSendPasswordResetEmail(auth);

    //  sign in with mail handle
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const [token] = useToken(user);

    const handleLogin = async e => {
        e.preventDefault();

        // taken values via form
        const email = e.target.email.value;
        const password = e.target.password.value;
        await signInWithEmailAndPassword(email, password);

        // email sent to database and access token stored in local storage
        // const { data } = await axios.post('/login', { email })
        // localStorage.setItem('accessToken', data.accessToken);
    }

    // error message and toast if user logs in
    let errorMessage;
    if (error) {
        errorMessage = <p className='text-red-500 text-center'>{error?.message}</p>;
    }
    if (user) {
        // toast.success('Successfully Logged In');
        navigate(from, { replace: true });
    }
    return (
        <div>
            <div className="card mx-auto mt-12 flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <h1 className="text-5xl font-bold">Login <span className='text-primary'>Now!</span></h1>
                <form onSubmit={handleLogin} className="card-body">
                    <input type="email" placeholder="Email" name='email' className="input input-bordered" />
                    <input type="password" placeholder="Password" name='password' className="input input-bordered" />
                    <input type="submit" placeholder="password" value='Login' className="btn btn-primary" />
                </form>
                {errorMessage}
            </div>
            <p className='text-center mt-3'>Don't have an account? <Link className='text-decoration-none' to='/register'><span className='text-primary'>Go to Register</span></Link></p>
            <p className='text-center'>Forgot Password?<button onClick={async () => {
                await sendPasswordResetEmail(email);
                toast.info('Reset Password Link Sent via Email');
            }} className='btn btn-ghost px-2 pb-2 text-primary'>Reset Password</button></p>

            <div className="divider mx-auto w-3/4">OR</div>

            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Login;