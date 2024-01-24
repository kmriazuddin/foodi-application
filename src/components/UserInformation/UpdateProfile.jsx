import React, { useContext } from 'react';
import { useForm } from "react-hook-form"
import { AuthContext } from '../../contexts/AuthProvider';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
    const { updateUserProfile } = useContext(AuthContext);

    // Redirecting To Home Page
    const location = useLocation();
    const navigate = useNavigate();
    const from = location?.state?.from?.pathname || "/";

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        const name = data.name;
        const photoURL = data.photoURL;
        updateUserProfile(name, photoURL)
        .then(() => {
            // Profile updated!
            toast.success("Update Profile!")
            navigate(from, {replace: true});
          }).catch((error) => {
            // An error occurred
            toast.error("Have A Problem!", error)
          });
    }

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                    <h2 className='font-bold'>Update Your Profile</h2>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" placeholder="Your Name Here" className="input input-bordered" required {...register("name")} />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Upload Photo</span>
                        </label>
                        <input type="text" placeholder="photoURL" className="input input-bordered" required {...register("photoURL")} />

                        <input type="file" className="file-input w-full max-w-xs" />
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn bg-greenLight hover:bg-green-400">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfile;