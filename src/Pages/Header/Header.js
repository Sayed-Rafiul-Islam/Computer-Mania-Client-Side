import { signOut } from 'firebase/auth';
import React from 'react';
import auth from '../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import CustomLink from '../CustomLink';

const Header = () => {
    const [user] = useAuthState(auth);

    const handleLogout = () => {
        signOut(auth);
    }
    return (
        <div>
            <div className="dropdown mr-96">
                <label tabIndex="0" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
                <ul tabIndex="0" className="menu menu-compact dropdown-content ease-in-out ml-3 mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                    <CustomLink className='text-lg text-left' to='/home'>Home</CustomLink>
                    <CustomLink className='text-lg text-left' to='/portfolio'>My Portfolio</CustomLink>
                    <CustomLink className='text-lg text-left' to='/blogs'>Blogs</CustomLink>
                    {
                        user ?
                            <div className='text-left'>
                                <CustomLink className='text-lg ' to='/dashboard'>Dashboard</CustomLink> <br />
                                <button onClick={handleLogout} className='text-lg'>Log Out</button>
                                <p className='text-lg text-primary'>{user.displayName}</p>
                            </div>
                            :
                            <CustomLink className='text-lg ' to='/login'>Login</CustomLink>
                    }
                </ul>
            </div>

            <div className="hidden lg:flex">
                <div className='flex mx-auto'>
                    <CustomLink className='text-lg px-3' to='/home'>Home</CustomLink>
                    <CustomLink className='text-lg px-3' to='/portfolio'>My Portfolio</CustomLink>
                    <CustomLink className='text-lg px-3' to='/blogs'>Blogs</CustomLink>
                    {
                        user ?
                            <div className='flex align-middle'>
                                <CustomLink className='text-lg px-3' to='/dashboard'>Dashboard</CustomLink>
                                <button onClick={handleLogout} className='text-lg transition-colors hover:text-red-500'>Log Out</button>
                                <p className='text-lg px-3 text-primary'>{user.displayName}</p>
                            </div>
                            :
                            <CustomLink className='text-lg px-3' to='/login'>Login</CustomLink>
                    }
                </div>
            </div>
        </div>
    );
};

export default Header;