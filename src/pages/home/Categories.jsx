import React from 'react';
import TitleAndSubtitle from '../Title/TitleAndSubtitle';

const categoryItems = [
    { id: 1, title: "Main Dish", description: "(86 dishes)", image: "https://i.ibb.co/t8V67nd/img1.png" },
    { id: 2, title: "Break Fast", description: "(12 dishes)", image: "https://i.ibb.co/gMPJpdv/img2.png" },
    { id: 3, title: "Dessert", description: "(48 dishes)", image: "https://i.ibb.co/j3hvgqB/img3.png" },
    { id: 4, title: "Browse All", description: "(255 dishes)", image: "https://i.ibb.co/py3HVGT/img4.png" }
]

const Categories = () => {
    return (
        <div className='section-container py-16'>
            <TitleAndSubtitle subtitle={`Customer Favorites`} title={`Popular Categories`} textPosition={`center`} />

            {/* Dish Card */}
            <div className='flex flex-col sm:flex-row flex-wrap justify-center items-center gap-8 mt-10'>
                {
                    categoryItems.map((item, i) => (
                        <div key={i} className='bg-white py-5 px-5 w-72 mx-auto text-center cursor-pointer hover:-translate-y-4 duration-300 transition-all shadow-lg rounded-md'>
                            <div className='flex w-full mx-auto justify-center items-center'>
                                <img className='bg-[#C1F1C6] w-28 h-28 p-5 rounded-full' src={item.image} alt="Dish" />
                            </div>
                            <div className='mt-5 space-y-1'>
                                <h5>{item.title}</h5>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Categories;