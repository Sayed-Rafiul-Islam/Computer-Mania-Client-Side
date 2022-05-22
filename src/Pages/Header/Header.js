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
            <nav>
                <div className='flex mx-auto my-5'>
                    <div className='mx-auto flex align-middle'>
                        <Link className='text-lg px-3' to='/home'>Home</Link>
                        {
                            user ?
                                <div className='flex align-middle'>
                                    <button onClick={handleLogout} className='text-lg'>Log Out</button>
                                    <p className='text-lg px-3 text-primary'>{user.displayName}</p>

                                </div>
                                :
                                <Link className='text-lg px-3' to='/login'>Login</Link>
                        }
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;