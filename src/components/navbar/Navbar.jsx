import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaRegUserCircle } from "react-icons/fa";
import Modal from '../modal/Modal';
import { AuthContext } from '../../contexts/AuthProvider';
import Profile from '../profile/Profile';


const Navbar = () => {
    const { user } = useContext(AuthContext);

    // Handle Scroll Function
    const [isSticky, setSticky] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            if (offset > 0) {
                setSticky(true)
            } else {
                setSticky(false)
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.addEventListener("scroll", handleScroll);
        }
    }, []);

    const navItems = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li tabIndex={0}>
            <details>
                <summary>Menu</summary>
                <ul className="p-2 space-y-2 lg:w-60">
                    <li><NavLink to="/menu">All</NavLink></li>
                    <li><NavLink to="/salad">Salad</NavLink></li>
                    <li><NavLink to="/pizza">Pizza</NavLink></li>
                </ul>
            </details>
        </li>
        <li tabIndex={0}>
            <details>
                <summary>Services</summary>
                <ul className="p-2 space-y-2 lg:w-60">
                    <li><NavLink to="/onlineBooking">Online Booking</NavLink></li>
                    <li><NavLink to="/tableBooking">Table Booking</NavLink></li>
                    <li><NavLink to="/order">Order Tracking</NavLink></li>
                </ul>
            </details>
        </li>
        <li><NavLink to="/offers">Offers</NavLink></li>
    </>
    return (
        <header className='max-w-screen-2xl container mx-auto fixed top-0 left-0 right-0 transition-all duration-300 ease-in-out'>
            <div className={`navbar xl:px-24 ${isSticky ? "shadow-md bg-base-100 transition-all duration-300 ease-in-out" : ""}`}>
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {
                                navItems
                            }
                        </ul>
                    </div>
                    <Link to="/" className="btn btn-ghost text-xl">
                        <img src="https://i.ibb.co/VQhvLkn/logo.png" alt="logo" />
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {
                            navItems
                        }
                    </ul>
                </div>
                <div className="navbar-end gap-2">
                    <button className="btn btn-ghost btn-circle hidden lg:flex">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </button>
                    <label tabIndex={0} className='btn btn-ghost btn-circle hidden lg:flex'>
                        <div className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                            <span className="badge badge-sm indicator-item">8</span>
                        </div>
                    </label>
                    {/* Login Button */}

                    {
                        user ? <Profile user={user} />
                            :
                            <button className='btn flex items-center gap-2 bg-greenLight rounded-3xl px-6 text-white' onClick={() => document.getElementById('my_modal_5').showModal()}><FaRegUserCircle /> Login</button>
                    }
                    <Modal />
                </div>
            </div>
        </header>
    );
};

export default Navbar;