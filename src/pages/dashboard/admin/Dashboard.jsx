import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { CiDollar } from "react-icons/ci";
import { FaUsers } from 'react-icons/fa';
import { MdRestaurantMenu } from 'react-icons/md';
import { IoBagAddSharp } from 'react-icons/io5';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Legend, Cell } from 'recharts';

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

    const { data: chartData = [] } = useQuery({
        queryKey: ['orderStats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/orderStats');
            return res.data;
        }
    });

    // 
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const PieChartData = chartData.map((data) => {
        return { name: data.category, value: data.revenue }
    })

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
            {/* Chart And Graphs */}
            <div className='mt-5 flex flex-col sm:flex-row'>
                <div className='sm:w-1/2 w-full'>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <AreaChart
                                data={chartData}
                                margin={{
                                    top: 10,
                                    right: 30,
                                    left: 0,
                                    bottom: 0,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="category" />
                                <YAxis />
                                <Tooltip />
                                <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="#8884d8" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className='sm:w-1/2 w-full'>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={400} height={400}>
                            <Pie
                                data={PieChartData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {PieChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;