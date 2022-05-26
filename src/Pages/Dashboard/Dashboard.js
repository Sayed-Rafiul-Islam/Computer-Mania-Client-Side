import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Outlet } from 'react-router';
import auth from '../../firebase.init';
import useAdmin from '../../hooks/useAdmin';
import CustomLink from '../CustomLink';

const Dashboard = () => {
    const [user] = useAuthState(auth);
    const [admin] = useAdmin(user);
    return (
        <div className='mt-0 lg:mt-24'>
            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    <label htmlFor="my-drawer-2" className="btn ml-72 btn-outline btn-primary rounded-r-sm rounded-l-lg drawer-button lg:hidden">Menu</label>
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    {
                        admin ?
                            <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
                                <li><CustomLink to='/dashboard'>My Profile</CustomLink></li>
                                <li><CustomLink to='/dashboard/allOrders'>All Orders</CustomLink></li>
                                <li><CustomLink to='/dashboard/manageParts'>Manage Products</CustomLink></li>
                                <li><CustomLink to='/dashboard/addPart'>Add Product</CustomLink></li>
                                <li><CustomLink to='/dashboard/makeAdmin'>Make Admin</CustomLink></li>
                            </ul>
                            :
                            <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
                                <li><CustomLink to='/dashboard'>My Profile</CustomLink></li>
                                <li><CustomLink to='/dashboard/myOrders'>My orders</CustomLink></li>
                                <li><CustomLink to='/dashboard/addReview'>Add A Review</CustomLink></li>
                            </ul>
                    }


                </div>
            </div>
        </div>
    );
};

export default Dashboard;