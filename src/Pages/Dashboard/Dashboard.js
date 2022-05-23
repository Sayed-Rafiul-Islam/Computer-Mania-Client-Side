import React from 'react';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div>
            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    <label for="my-drawer-2" className="btn ml-72 btn-primary rounded-r-sm rounded-l-lg drawer-button lg:hidden">Menu</label>
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label for="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
                        <li><Link to='/dashboard'>My Profile</Link></li>
                        <li><Link to='/dashboard/myOrders'>My orders</Link></li>
                        <li><Link to='/dashboard/addReview'>Add A Review</Link></li>
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;