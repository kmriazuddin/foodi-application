import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaUtensils } from 'react-icons/fa';

const UpdateMenu = () => {
    const item = useLoaderData();

    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const navigate = useNavigate();

    // Image Hosting Key
    const imageHostingKey = import.meta.env.VITE_IMGBB_KEY;
    // Image Hosting API
    const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

    const { register, handleSubmit, reset } = useForm()
    const onSubmit = async(data) => {
        const imageFile = {image: data.image[0]}
        const hostingImg = await axiosPublic.post(imageHostingApi, imageFile, {
            headers: {
                "Content-Type" : "multipart/form-data"
            }
        })
        if(hostingImg.data.success){
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: hostingImg.data.data.display_url
            }
            const postMenuItem = axiosSecure.patch(`/menu/${item?._id}`, menuItem);
            if(postMenuItem){
                reset()
                toast.success("Menu Uploaded Successfully!");
                navigate("/dashboard/manageItem");
            }
        }
    }
    return (
        <div className='w-full md:w-[870px] mx-auto'>
            <h2 className='text-2xl font-semibold my-4'>Update <span className='tex text-greenLight'>Menu Item</span></h2>
            {/* Input Form */}
            <form className='space-y-5' onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Recipe Name*</span>
                    </label>
                    <input type="text" placeholder="Recipe Name" className="input input-bordered w-full" {...register("name", { required: true })} defaultValue={item?.name} />
                </div>
                {/* Select Row */}
                <div className='flex items-center gap-4'>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Category*</span>
                        </label>
                        <select className="select select-bordered" {...register("category", { required: true })} defaultValue={item?.category}>
                            <option disabled value="soup">Select A Category</option>
                            <option value="salad">Salad</option>
                            <option value="pizza">Pizza</option>
                            <option value="soup">Soup</option>
                            <option value="dessert">Dessert</option>
                            <option value="drinks">Drinks</option>
                            <option value="popular">Popular</option>
                        </select>
                    </div>
                    {/* Price */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Price*</span>
                        </label>
                        <input type="number" placeholder="Price" className="input input-bordered w-full" {...register("price", { required: true })} defaultValue={item?.price} />
                    </div>
                </div>
                {/* Textarea */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Menu Details</span>
                    </label>
                    <textarea className="textarea textarea-bordered h-24" placeholder="Details Here..." {...register("recipe", { required: true })} defaultValue={item?.recipe}></textarea>
                </div>
                {/* File Input */}
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Pick a file:</span>
                    </label>
                    <input type="file" className="file-input file-input-bordered w-full" {...register("image", { required: true })} />
                </div>
                <button className='btn bg-greenLight text-white'>Update Item <FaUtensils /></button>
            </form>
        </div>
    );
};

export default UpdateMenu;