import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { GiConfirmed } from "react-icons/gi";
import { MdDeleteForever } from 'react-icons/md';
import Swal from 'sweetalert2';
import { IoMdCheckmark } from 'react-icons/io';

const ManageBooking = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { refetch, data: orders = [] } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const res = await axiosSecure.get('/payments/all');
            return res.data;
        }
    });

    const handleConfirm = async (item) => {
        await axiosSecure.patch(`/payments/${item?._id}`)
            .then(res => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${item?.itemName} Confirm Order!`,
                    showConfirmButton: false,
                    timer: 2500
                });
                refetch();
            })
    }

    return (
        <div>
            <div className='flex justify-between items-center m-4'>
                <h5>All Orders</h5>
                <p>Total Orders: {orders.length}</p>
            </div>
            {/* Table */}
            <div>
                <div className="overflow-x-auto">
                    <table className="table md:w-[700px]">
                        {/* head */}
                        <thead className='bg-greenLight text-white'>
                            <tr>
                                <th>#</th>
                                <th>Users</th>
                                <th>Transition Id</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Confirm Order</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* User Row */}
                            {
                                orders.map((item, index) => (
                                    <tr key={index}>
                                        <th>{index + 1}</th>
                                        <td>{item?.email}</td>
                                        <td>{item?.transitionId}</td>
                                        <td>${item?.price}</td>
                                        <th>{item?.status}</th>
                                        <th>{item?.status === "confirmed" ? <button className="btn btn-ghost bg-greenLight hover:bg-green-400"><GiConfirmed className='text-xl text-white' /></button> : <button className="btn btn-ghost bg-greenLight hover:bg-green-400" onClick={() => handleConfirm(item)}><IoMdCheckmark className='text-rose-500 font-bold' /></button>}</th>
                                        <th><button className="btn btn-ghost bg-greenLight hover:bg-green-400"><MdDeleteForever className='text-2xl text-white' /></button></th>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageBooking;