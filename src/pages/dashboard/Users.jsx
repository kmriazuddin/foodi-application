import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaUser } from 'react-icons/fa6';
import { GrUserAdmin } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const Users = () => {
    const axiosSecure = useAxiosSecure();
    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    // Make A Admin
    const handleMakeAdmin = user => {
        axiosSecure.patch(`users/admin/${user._id}`)
        .then(res => {
            toast.success(`${user.name} Is Now Admin`);
            refetch();
        });
    }

    // User Delete
    const handleMakDelete = user => {
        axiosSecure.delete(`/users/${user._id}`)
        .then(res => {
            toast.success(`${user?.name} Is Delete From Database!`);
            refetch();
        })
    }


    return (
        <div>
            <div>
                <h5>All User</h5>
                <p>Total User: {users.length}</p>
            </div>
            {/* Table */}
            <div>
                <div className="overflow-x-auto">
                    <table className="table md:w-[700px]">
                        {/* head */}
                        <thead className='bg-greenLight text-white'>
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* User Row */}
                            {
                                users.map((user, index) => (
                                    <tr key={index}>
                                        <th>{index + 1}</th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-circle w-12 h-12">
                                                        <img src={user?.photoURl} alt={user?.name} />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{user?.name}</td>
                                        <td>{user?.email}</td>
                                        <td className='text-lg text-pink-500'>{user?.role === 'admin' ? (<button className="btn btn-ghost bg-greenLight hover:bg-green-400"><GrUserAdmin className='text-xl' /></button>) : (<button className="btn btn-ghost bg-greenLight hover:bg-green-400" onClick={() => handleMakeAdmin(user)}><FaUser className='text-xl' /></button>)}</td>
                                        <th>
                                            <button className="btn btn-ghost bg-greenLight hover:bg-green-400" onClick={() => handleMakDelete(user)}><MdDeleteForever className='text-2xl text-white' /></button>
                                        </th>
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

export default Users;