import React from 'react';
import { CiStar } from 'react-icons/ci';
import TitleAndSubtitle from '../Title/TitleAndSubtitle';

const servicesList = [
    {id: 1, title: "Catering", description: "Delight your guests with our flavors and  presentation", image: "https://i.ibb.co/fXnGk0t/fi-rr-salad.png"},
    {id: 2, title: "Fast delivery", description: "We deliver your order promptly to your door", image: "https://i.ibb.co/c122NMt/fi-rr-time-fast.png"},
    {id: 3, title: "Online Ordering", description: "Explore menu & order with ease using our Online Ordering", image: "https://i.ibb.co/7WSH0TW/fi-rr-shopping-cart-check.png"},
    {id: 4, title: "Gift Cards", description: "Give the gift of exceptional dining with Foodi Gift Cards", image: "https://i.ibb.co/fQyQPyk/fi-rr-gift.png"}
]

const OurServices = () => {
    return (
        <div>
            <div className='section-container'>
                <div className='flex flex-col md:flex-row justify-between items-center gap-10'>
                    <div className='md:w-1/2'>
                        <TitleAndSubtitle subtitle={`Our Story & Services`} title={`Our Culinary Journey And Services`} description={`Rooted in passion, we curate unforgettable dining experiences and offer exceptional services, blending culinary artistry with warm hospitality.`} />
                        <button className='btn rounded-full bg-greenLight text-white px-8 py-3'>Explore</button>
                    </div>
                    <div className='md:w-1/2'>
                        <div className='grid sm:grid-cols-2 grid-cols-1 gap-8 items-center'>
                            {
                                servicesList.map((service) => (
                                    <div className='py-5 px-4 space-y-2 text-center shadow-md rounded-md text-greenLight cursor-pointer hover:border-indigo-600 transition-all duration-300 hover:border' key={service.id}>
                                        <img className='mx-auto' src={service.image} alt="Icon" />
                                        <h5 className='pt-3 font-semibold'>{service.title}</h5>
                                        <p className='text-[#90BD95]'>{service.description}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OurServices;