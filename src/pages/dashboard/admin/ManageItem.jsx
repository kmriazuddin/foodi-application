import React from 'react';
import useMenu from '../../../hooks/useMenu';
import { MdDelete } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageItem = () => {
    const [menu, loading, refetch] = useMenu();
    const axiosSecure = useAxiosSecure();

    // Delete Menu
    const handleDelete = (menus) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/menu/${menus?._id}`);
                Swal.fire({
                    title: "Deleted!",
                    text: `${menus?.name} has been deleted.`,
                    icon: "success"
                });
                refetch();
            }
        });
    }
    return (
        <div className='w-full md:w-[870px] px-4 mx-auto'>
            <h2 className='text-2xl font-semibold my-4'>Manage All <span className='tex text-greenLight'>Menu Items</span></h2>
            {/* Menu Items Table */}
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className='bg-greenLight text-white'>
                        <tr>
                            <th>Serial</th>
                            <th>Image</th>
                            <th>Category</th>
                            <th>Item Name</th>
                            <th>Price</th>
                            <th>Edit</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            menu.map((menus, index) => (
                                <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-circle w-16 h-16">
                                                    <img src={menus?.image} alt={menus?.name} />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <th>{menus?.category}</th>
                                    <td>{menus?.name}</td>
                                    <td>{menus?.price}</td>
                                    <td>
                                        <Link to={`/dashboard/updateMenu/${menus?._id}`}><button className="btn bg-greenLight hover:bg-green-500 text-rose-500 px-3"><CiEdit className='text-xl lg:text-3xl' /></button></Link>
                                    </td>
                                    <td>
                                        <button className="btn bg-greenLight hover:bg-green-500 text-rose-500 px-3" onClick={() => handleDelete(menus)}><MdDelete className='text-xl lg:text-3xl' /></button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageItem;