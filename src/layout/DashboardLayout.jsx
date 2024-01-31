import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdDashboardCustomize } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";
import { IoHomeOutline } from "react-icons/io5";
import { FaShoppingBag } from "react-icons/fa";
import { CgMenuBoxed } from "react-icons/cg";
import { MdDashboard } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import LogIn from '../components/authentication/LogIn';
import useAdmin from '../hooks/useAdmin';
import useAuth from '../hooks/useAuth';

const sharedLink = (
    <>
        <li><Link to="/"><IoHomeOutline /> Home</Link></li>
        <li><Link to="/menu"><CgMenuBoxed /> Menu</Link></li>
        <li><Link to="/orderTracking"><FaMapLocationDot /> Order Tracking</Link></li>
        <li><Link to="/customerSupport"><BiSupport /> Customer Support</Link></li>
    </>
)

const DashboardLayout = () => {
    const {loading} = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();

    return (
        <div>
            {
                isAdmin ? <>
                    <div className="drawer lg:drawer-open">
                        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content flex flex-col sm:items-start sm:justify-start">
                            {/* Page content here */}
                            <div className='flex justify-between items-center mx-4 mt-1'>
                                <label htmlFor="my-drawer-2" className="drawer-button lg:hidden bg-greenLight text-white px-2 py-1 rounded-lg"><MdDashboardCustomize className='text-4xl' /></label>
                                <button className='btn rounded-lg px-6 bg-greenLight text-white sm:hidden'><FaRegUser /> Logout</button>
                            </div>
                            <div className='mt-5 md:mt-2 mx-4'>
                                <Outlet />
                            </div>
                        </div>
                        <div className="drawer-side">
                            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                                {/* Sidebar content here */}
                                <li><Link>
                                    <img src="https://i.ibb.co/VQhvLkn/logo.png" alt="logo" />
                                    <span className="badge badge-secondary">Admin</span>
                                </Link></li>
                                <hr />
                                <li className='mt-4'><Link to="/dashboard"><MdDashboard /> Dashboard</Link></li>
                                <li><Link to="/dashboard/manageBooking"><FaShoppingBag /> Manage Booking</Link></li>
                                <li><Link to="/dashboard/addMenu"><IoIosAddCircleOutline /> Add Menu</Link></li>
                                <li><Link to="/dashboard/manageItem"><FaEdit /> Manage Item</Link></li>
                                <li className='mb-3'><Link to="/dashboard/users"><FaUsers /> All Users</Link></li>
                                <hr />
                                {/* Shared Link */}
                                {
                                    sharedLink
                                }
                            </ul>
                        </div>
                    </div>
                </> : <LogIn />
            }
        </div>
    );
};

export default DashboardLayout;