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
            <div className="dropdown right-80 left-0 fixed z-50" >
                <label tabIndex="0" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
                <ul tabIndex="0" className=" text-left menu menu-compact dropdown-content ml- mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                    <CustomLink className='text-lg' to='/home'><span className='transition-colors hover:text-primary'>Home</span></CustomLink>
                    <CustomLink className='text-lg' to='/portfolio'><span className='transition-colors hover:text-primary'>Portfolio</span></CustomLink>
                    <CustomLink className='text-lg' to='/blogs'><span className='transition-colors hover:text-primary'>Blogs</span></CustomLink>
                    {
                        user ?
                            <>
                                <CustomLink className='text-lg' to='/dashboard'><span className='transition-colors hover:text-primary'>Dashboard</span></CustomLink>
                                <CustomLink to='/'><button className='text-lg transition-colors hover:text-red-500' onClick={handleLogout}>Log Out</button>
                                    <p className='text-lg ml-5 text-primary'>{user?.displayName}</p></CustomLink>

                            </>
                            :
                            <CustomLink className='text-lg ' to='/login'><span className='transition-colors hover:text-primary'>Login</span></CustomLink>
                    }
                </ul>
            </div>

            <div className="hidden lg:flex fixed w-full bg-stone-900 py-3 top-10 z-50">
                <div className='flex mx-auto'>
                    <CustomLink className='text-lg px-3' to='/home'><span className='transition-colors hover:text-primary'>Home</span></CustomLink>
                    <CustomLink className='text-lg px-3' to='/portfolio'><span className='transition-colors hover:text-primary'>My Portfolio</span></CustomLink>
                    <CustomLink className='text-lg px-3' to='/blogs'><span className='transition-colors hover:text-primary'>Blogs</span></CustomLink>
                    {
                        user ?
                            <div className='flex align-middle'>
                                <CustomLink className='text-lg px-3' to='/dashboard'><span className='transition-colors hover:text-primary'>Dashboard</span></CustomLink>
                                <CustomLink className='text-lg' to='/'><button onClick={handleLogout} className='transition-colors hover:text-red-500'>Log Out</button>
                                </CustomLink>
                                <p className='text-lg ml-5 text-primary'>{user?.displayName}</p>
                            </div>
                            :
                            <CustomLink className='text-lg px-3' to='/login'><span className='transition-colors hover:text-primary'>Login</span></CustomLink>
                    }
                </div>
            </div>
        </div>
    );
};

export default Header;