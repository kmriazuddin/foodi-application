import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoHeartOutline } from "react-icons/io5";
import { AuthContext } from '../../contexts/AuthProvider';
import Swal from 'sweetalert2';


const Cards = ({ item }) => {
    const { user } = useContext(AuthContext);
    const { _id, name, image, category, price } = item;

    const navigate = useNavigate();
    const location = useLocation();

    // Heart Icon Clicked
    const [isHeartClicked, setIsHeartClicked] = useState(false);
    const handleHeartClick = () => {
        setIsHeartClicked(!isHeartClicked);
    }

    // Add To Cart
    const handleAddToCart = (item) => {
        if (user && user?.email) {
            const cartItem = { menuItemId: _id, name, quantity: 1, image, price, category, email: user?.email }
            fetch('https://foodi-application-server.onrender.com/carts', {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(cartItem)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Your work has been saved",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })
        } else {
            Swal.fire({
                title: "Please Login?",
                text: "Without an account can't able to add products!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Signup Now!"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/signUp', {state: {from: location}})
                }
            });
        }
    }
    return (
        <div className='px-2'>
            <div className="card bg-base-100 shadow-xl relative">
                <div className={`absolute gap-2 ring-2 top-2 p-2 bg-greenLight rating heartStar ${isHeartClicked ? "text-rose-500" : "text-white"}`} onClick={handleHeartClick}>
                    <IoHeartOutline className='h-10 w-10 cursor-pointer' />
                </div>
                <Link to={`/menu/${item._id}`}>
                    <figure><img className='w-60 h-32 justify-center items-center mx-auto flex hover:scale-105 transition-all duration-300 md:h-52 ease-in-out' src={item.image} alt="Shoes" /></figure>
                </Link>
                <div className="card-body">
                    <Link to={`/menu/${item._id}`}><h2 className="card-title">{item.name}</h2></Link>
                    <p>{item.recipe}</p>
                    <div className="card-actions justify-between items-center mt-2">
                        <h5 className='font-semibold'><span className='text-sm text-red mr-1'>$</span>{item.price}</h5>
                        <button className="btn bg-greenLight text-white" onClick={() => handleAddToCart(item)}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cards;