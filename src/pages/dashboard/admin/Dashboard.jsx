import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { CiDollar } from "react-icons/ci";
import { FaUsers } from 'react-icons/fa';
import { MdRestaurantMenu } from 'react-icons/md';
import { IoBagAddSharp } from 'react-icons/io5';

const Dashboard = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { refetch, data: stats = [] } = useQuery({
        queryKey: ['stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/adminStats');
            return res.data;
        }
    });

    return (
        <div className='w-full md:w-[870px] mx-auto px-4'>
            <h2 className='text-2xl font-semibold my-4'>Hi, {user?.displayName}</h2>
            {/* Stats Design */}
            <div className="stats stats-vertical w-full lg:stats-horizontal shadow space-y-1 md:space-y-0 lg:space-y-0">
                <div className="stat bg-emerald-300">
                    <div className="stat-figure text-secondary">
                        <CiDollar className='text-red font-bold text-xl' />
                    </div>
                    <div className="stat-title">Revenue</div>
                    <div className="stat-value">{stats?.revenue}</div>
                    <div className="stat-desc">Jan 1st - Feb 1st</div>
                </div>
                <div className="stat bg-orange-300">
                    <div className="stat-figure text-secondary">
                        <FaUsers className='text-sky-400 font-bold text-xl' />
                    </div>
                    <div className="stat-title">Users</div>
                    <div className="stat-value">{stats?.users}</div>
                    <div className="stat-desc">↗︎ 400 (22%)</div>
                </div>
                <div className="stat bg-indigo-300">
                    <div className="stat-figure text-secondary">
                        <MdRestaurantMenu className='text-white font-bold text-xl' />
                    </div>
                    <div className="stat-title">Menu Items</div>
                    <div className="stat-value">{stats?.menuItems}</div>
                    <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>
                <div className="stat bg-purple-300">
                    <div className="stat-figure text-secondary">
                        <IoBagAddSharp className='text-pink-400 font-bold text-xl' />
                    </div>
                    <div className="stat-title">Orders</div>
                    <div className="stat-value">{stats?.orders}</div>
                    <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;