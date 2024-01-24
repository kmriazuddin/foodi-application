import React from 'react';
import TitleAndSubtitle from '../Title/TitleAndSubtitle';
import { CiStar } from "react-icons/ci";


const Testimonials = () => {
    return (
        <div className='section-container'>
            <div className='flex flex-col md:flex-row justify-between items-center gap-10'>
                <div className='md:w-1/2'>
                    <img src="https://i.ibb.co/n8HsgGs/testimonials.png" alt="testimonials" />
                </div>
                <div className='md:w-1/2'>
                    <TitleAndSubtitle subtitle={`Testimonials`} title={`What Our Customers Say About Us`} description={`“I had the pleasure of dining at Foodi last night, and I'm still raving about the experience! The attention to detail in presentation and service was impeccable”`} />
                    <div className='flex items-center gap-4 flex-wrap'>
                        <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                            <div className="avatar">
                                <div className="w-12">
                                    <img src="https://i.ibb.co/CKphy1g/avartar.png" />
                                </div>
                            </div>
                            <div className="avatar">
                                <div className="w-12">
                                    <img src="https://i.ibb.co/xqnp2Zq/testimonial2.png" />
                                </div>
                            </div>
                            <div className="avatar">
                                <div className="w-12">
                                    <img src="https://i.ibb.co/s5DD7B4/Mask-group.png" />
                                </div>
                            </div>
                            <div className="avatar placeholder">
                                <div className="w-12 bg-neutral text-neutral-content">
                                    <span>+99</span>
                                </div>
                            </div>
                        </div>
                        <div className='space-y-1'>
                            <h5 className='text-lg font-semibold'>Customer Feedback</h5>
                            <div className='flex items-center gap-2'>
                                <CiStar className='text-yellow-400' />
                                <span className='font-semibold'>4.9 <span className='text-[#807E7E]'>(18.6k Reviews)</span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Testimonials;