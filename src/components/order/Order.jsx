import React from 'react';
import TitleAndSubtitle from '../../pages/Title/TitleAndSubtitle';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const Order = () => {
    const { user } = useAuth();
    const token = localStorage.getItem('access-token');

    const { refetch, data: orders = [] } = useQuery({
        queryKey: ['orders', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:8000/payments?email=${user?.email}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            return res.json();
        }
    });
    
    
    // Date Formate
    const formatDate = (createdAt) => {
        const createdAtDate = new Date(createdAt)
        return createdAtDate.toLocaleDateString();
    }


    return (
        <div className='max-w-screen-2xl container mx-auto xl:px-20 px-4 py-20'>
            {/* Banner */}
            <div className='max-w-screen-2xl container mx-auto xl:px-24 bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%'>
                <div className='py-36 flex flex-col justify-center items-center gap-8'>
                    <div className='px-4 space-y-7'>
                        <TitleAndSubtitle title={`Manage Your All Orders`} />
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead className='bg-greenLight text-white'>
                                <tr>
                                    <th>#</th>
                                    <th>Order Date</th>
                                    <th>Transition Id</th>
                                    <th>Price</th>
                                    <th>Status</th>
                                    <th>Quantity</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {
                                    orders.map((item, index) => (
                                        <tr key={item?._id}>
                                            <td>{index + 1}</td>
                                            <td>{formatDate(item.createdAt)}</td>
                                            <td>{item?.transitionId}</td>
                                            <td className='font-bold'>$ {item?.price}</td>
                                            <th>{item?.status}</th>
                                            <td>{item?.quantity}</td>
                                            <Link to="/contact">
                                                <button className='btn px-2 py-2 btn-sm bg-green-400 text-rose-500'>Contact</button>
                                            </Link>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </table>
            </div>
        </div>
    );
};

export default Order;