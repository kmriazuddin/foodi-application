import React from 'react';

const Banner = () => {
    return (
        <div className='section-container bg-gradient-to-tr from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%'>
            <div className='py-24 flex flex-col md:flex-row-reverse justify-between items-center gap-8'>
                {/* Image Div */}
                <div className='lg:w-1/2'>
                    <img src="https://i.ibb.co/6tn6P0X/banner.png" alt="banner" />
                    <div className='flex flex-col md:flex-row items-center justify-center gap-3 -mt-14'>
                        <div className='flex items-center gap-2 bg-white py-2 px-3 rounded-2xl shadow-md w-64'>
                            <img className='rounded-2xl' src="https://i.ibb.co/y631r5L/b-food1.png" alt="logo" />
                            <div className='space-y-1'>
                                <h5 className='font-medium mb-1'>Spicy Noodles</h5>
                                <div className="rating rating-sm">
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" readOnly />
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" readOnly />
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-green-400" checked readOnly />
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" readOnly />
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" readOnly />
                                </div>
                                <p className='text-rose-500'>$18.00</p>
                            </div>
                        </div>
                        <div className='sm:flex hidden items-center gap-2 bg-white py-2 px-3 rounded-2xl shadow-md w-64'>
                            <img className='rounded-2xl' src="https://i.ibb.co/y631r5L/b-food1.png" alt="logo" />
                            <div className='space-y-1'>
                                <h5 className='font-medium mb-1'>Spicy Noodles</h5>
                                <div className="rating rating-sm">
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" readOnly />
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" readOnly />
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-green-400" checked readOnly />
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" readOnly />
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" readOnly />
                                </div>
                                <p className='text-rose-500'>$18.00</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Text Div */}
                <div className='lg:w-1/2 space-y-5 px-5'>
                    <h2 className='text-4xl md:text-5xl font-bold leading-snug md:leading-snug'>Dive into Delights Of Delectable <span className='text-greenLight'>Food</span></h2>
                    <p className='text-xl text-[#4A4A4A]'>Where Each Plate Weaves a Story of Culinary Mastery and Passionate Craftsmanship</p>
                    <button className='btn bg-greenLight text-white font-semibold rounded-3xl px-6 py-2'>Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default Banner;