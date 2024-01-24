import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoHeartOutline } from "react-icons/io5";


const Cards = ({ item }) => {
    // Heart Icon Clicked
    const [isHeartClicked, setIsHeartClicked] = useState(false);
    const handleHeartClick = () => {
        setIsHeartClicked(!isHeartClicked);
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
                        <div className="btn bg-greenLight text-white">Fashion</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cards;