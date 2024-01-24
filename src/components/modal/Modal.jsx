import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../contexts/AuthProvider';
import toast from 'react-hot-toast';


const Modal = () => {
    const { login, signUpWithGmail } = useContext(AuthContext);

    // Redirecting To Home Page
    const location = useLocation();
    const navigate = useNavigate();
    const from = location?.state?.from?.pathname || "/";

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        const email = data.email;
        const password = data.password;
        login(email, password)
            .then((result) => {
                const user = result.user;
                toast.success("Login Success!");
                document.getElementById('my_modal_5').close()
                navigate(from, {replace: true});
            })
            .catch((error) => toast.error("Authentication Error", error));
    }

    // authentication With Google
    const handleLogin = () => {
        signUpWithGmail()
            .then((result) => {
                const user = result.user;
                toast.success("Login Success!")
                document.getElementById('my_modal_5').close()
                navigate(from, { replace: true });
            })
            .catch((error) => toast.error("Authentication Error", error));
    }
    return (
        <div>
            <dialog id="my_modal_5" className="modal modal-middle sm:modal-middle">
                <div className="modal-box">
                    <div className="modal-action flex flex-col justify-center mt-0">
                        <form className="card-body" method='dialog' onSubmit={handleSubmit(onSubmit)}>
                            <h3 className='md:text-2xl text-greenLight font-semibold'>Please Login!</h3>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" className="input input-bordered" required {...register("email")} />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" className="input input-bordered" required {...register("password")} />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn bg-greenLight hover:bg-green-400 text-white" type='submit' value="Login" />
                            </div>
                            <p className='text-center my-1'>New member? <Link className='font-semibold underline text-pink-500' to="/signUp">Sign Up</Link> Here.</p>
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" htmlFor="my_modal_5" onClick={() => document.getElementById('my_modal_5').close()}>✕</button>
                        </form>
                        {/* Social Media Login */}
                        <div className='flex justify-center gap-4 items-center'>
                            <button className="btn btn-circle bg-greenLight hover:bg-rose-500 hover:text-white" onClick={handleLogin}>
                                <FaGoogle className='text-xl' />
                            </button>
                            <button className="btn btn-circle bg-greenLight hover:bg-rose-500 hover:text-white">
                                <FaFacebook className='text-2xl' />
                            </button>
                            <button className="btn btn-circle bg-greenLight hover:bg-rose-500 hover:text-white">
                                <FaGithub className='text-2xl' />
                            </button>
                        </div>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default Modal;