import React, { useEffect, useState } from 'react';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import TitleAndSubtitle from '../Title/TitleAndSubtitle';
import Cards from '../../components/cards/Cards';

import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";

// Slider Next And Prev Function
const NEXTARROW = (props) => {
    const { className, style, onClick } = props;
    return (
        <div className={className} style={{ ...style, display: "block", background: "red" }} onClick={onClick}>NEXT</div>
    )
};
const PREVARROW = (props) => {
    const { className, style, onClick } = props;
    return (
        <div className={className} style={{ ...style, display: "block", background: "green" }} onClick={onClick}>BACK</div>
    )
};

const SpecialDishes = () => {
    const [recipes, setRecipes] = useState([]);
    const slider = React.useRef(null);

    useEffect(() => {
        fetch("/menu.json")
            .then(res => res.json())
            .then((data) => {
                const specialsRecipes = data.filter((item) => item.category === "popular");
                setRecipes(specialsRecipes)
            });
    }, []);

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ],
        nextArrow: <NEXTARROW />,
        prevArrow: <PREVARROW />
    };
    return (
        <div className='section-container my-20 relative'>
            <div>
                <TitleAndSubtitle subtitle={`Special Dishes`} title={`Standout Dishes From Our Menu`} />
            </div>

            <div className='space-x-1 md:absolute right-3 top-12 mb-10 md:mr-24'>
                <button onClick={() => slider?.current?.slickPrev()} className='btn rounded-full bg-greenLight hover:bg-green-400 text-white'><GrPrevious className='' /></button>
                <button onClick={() => slider?.current?.slickNext()} className='btn rounded-full bg-rose-500 hover:bg-rose-400 text-white'><GrNext /></button>
            </div>

            <Slider ref={slider} {...settings} className='overflow-hidden mt-10 space-x-5'>
                {
                    recipes.map((item) => (
                        <Cards key={item._id} item={item} />
                    ))
                }
            </Slider>
        </div>
    );
};

export default SpecialDishes;