import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Modal from '../modal/Modal';
import { AuthContext } from '../../contexts/AuthProvider';
import toast from 'react-hot-toast';
import axios from 'axios';
import { FaFacebookF, FaGithub, FaGoogle } from 'react-icons/fa';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const SignUp = () => {
    const { createUser, signUpWithGmail, login, updateUserProfile } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

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
        createUser(email, password)
            .then((result) => {
                const user = result.user;
                updateUserProfile(data.email, data.photoURL)
                    .then(() => {
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(function (response) {
                                toast.success("signUp Successfully!")
                                navigate(from, { replace: true })
                            })
                    })
                toast.success("SignIn Success!")
                document.getElementById('my_modal_5').close()
                navigate(from, { replace: true })
            })
            .catch((error) => toast.error("Authentication Error", error));
    }

    const handleRegister = () => {
        signUpWithGmail()
            .then((result) => {
                const user = result.user;
                const userInfor = {
                    name: result?.user?.displayName,
                    email: result?.user?.email,
                };
                axiosPublic
                    .post("/users", userInfor)
                    .then((response) => {
                        toast.success("Signin successful!");
                        navigate("/");
                    });
            })
            .catch((error) => console.log(error));
    };

    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex gap-10 items-center">
                    <div className="text-center hidden md:block lg:block lg:text-left">
                        <img src="https://i.ibb.co/yfwfG4n/login.png" alt="Authentication" />
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form className="card-body" method='dialog' onSubmit={handleSubmit(onSubmit)}>
                            <h3 className='md:text-2xl text-greenLight font-semibold'>Create A Account!</h3>
                            {/* name */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="name"
                                    placeholder="Your name"
                                    className="input input-bordered"
                                    {...register("name")}
                                />
                            </div>
                            {/* email */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="email"
                                    className="input input-bordered"
                                    {...register("email")}
                                />
                            </div>
                            {/* password */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="password"
                                    className="input input-bordered"
                                    {...register("password")}
                                />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover mt-2">
                                        Forgot password?
                                    </a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn bg-greenLight hover:bg-green-400 text-white" type='submit' value="Sign Up" />
                            </div>
                            <p className='text-center my-1'>Already member? <button className='font-semibold underline text-pink-500' onClick={() => document.getElementById('my_modal_5').showModal()}>Login</button> Here.</p>
                            <Link className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" to="/">✕</Link>
                            <div className="text-center space-x-3">
                                <button
                                    onClick={handleRegister}
                                    className="btn btn-circle hover:bg-green hover:text-white"
                                >
                                    <FaGoogle />
                                </button>
                                <button className="btn btn-circle hover:bg-green hover:text-white">
                                    <FaFacebookF />
                                </button>
                                <button className="btn btn-circle hover:bg-green hover:text-white">
                                    <FaGithub />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <Modal />
            </div>
        </div>
    );
};

export default SignUp;