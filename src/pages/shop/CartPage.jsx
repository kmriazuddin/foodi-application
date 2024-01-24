import React, { useContext } from 'react';
import TitleAndSubtitle from '../Title/TitleAndSubtitle';
import useCart from '../../hooks/useCart';
import { MdDelete } from "react-icons/md";
import Swal from 'sweetalert2';
import { AuthContext } from '../../contexts/AuthProvider';

const CartPage = () => {
    const [cart, refetch] = useCart();
    const { user } = useContext(AuthContext);

    // Delete Add Cart Item
    const handleDelete = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:8000/carts/${item._id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }
    return (
        <div className='section-container'>
            {/* Banner */}
            <div className='max-w-screen-2xl container mx-auto xl:px-24 bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%'>
                <div className='py-36 flex flex-col justify-center items-center gap-8'>
                    <div className='px-4 space-y-7'>
                        <TitleAndSubtitle title={`Item Added To The Cart`} />
                    </div>
                </div>
            </div>
            {/* Table */}
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className='bg-greenLight text-white'>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Category</th>
                            <th>Food Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            cart.map((item, index) => (
                                <tr key={item?._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-circle w-14 h-14 md:w-24 md:h-24">
                                                    <img src={item?.image} alt={item?.category} />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{item?.category}</td>
                                    <td className='font-bold'>{item?.name}</td>
                                    <td>{item?.quantity}</td>
                                    <td>$ {item?.price}</td>
                                    <th>
                                        <button className="btn bg-greenLight hover:bg-green-400" onClick={() => handleDelete(item)}><MdDelete className='text-xl md:text-2xl text-rose-500' /></button>
                                    </th>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            {/* Customer Details */}
            <div className='my-10 flex flex-col md:flex-row justify-between items-start'>
                <div className='md:w-1/2 space-y-3'>
                    <h3 className='font-medium'>Customer Details</h3>
                    <p>Name: {user?.displayName}</p>
                    <p>Email: {user?.email}</p>
                    <p>User ID: {user?.uid}</p>
                </div>
                <div className='md:w-1/2 space-y-3'>
                    <h3 className='font-medium'>Shopping Details</h3>
                    <p>Total Items: {cart?.length}</p>
                    <p>Total Price: $0.00</p>
                    <button className='btn bg-greenLight hover:bg-green-500 text-white hover:text-rose-500'>Checkout</button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;