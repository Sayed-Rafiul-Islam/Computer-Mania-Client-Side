import { signOut } from 'firebase/auth';
import React from 'react';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';

const Header = () => {
    const [user] = useAuthState(auth);

    const handleLogout = () => {
        signOut(auth);
    }
    return (
        <div>
            <div class="dropdown mr-96">
                <label tabindex="0" class="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
                <ul tabindex="0" class="menu menu-compact dropdown-content ml-3 mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                    <Link className='text-lg text-left' to='/home'>Home</Link>
                    {
                        user ?
                            <div className='text-left'>
                                <Link className='text-lg ' to='/dashboard'>Dashboard</Link> <br />
                                <button onClick={handleLogout} className='text-lg'>Log Out</button>
                                <p className='text-lg  text-primary'>{user.displayName}</p>
                            </div>
                            :
                            <Link className='text-lg ' to='/login'>Login</Link>
                    }
                </ul>
            </div>

            <div class="hidden lg:flex">
                <div className='flex mx-auto'>
                    <Link className='text-lg px-3' to='/home'>Home</Link>
                    {
                        user ?
                            <div className='flex align-middle'>
                                <Link className='text-lg px-3' to='/dashboard'>Dashboard</Link>
                                <button onClick={handleLogout} className='text-lg'>Log Out</button>
                                <p className='text-lg px-3 text-primary'>{user.displayName}</p>
                            </div>
                            :
                            <Link className='text-lg px-3' to='/login'>Login</Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default Header;