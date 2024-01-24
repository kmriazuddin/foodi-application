import React from 'react';
import LoadingPage from '../error/LoadingPage';
import Banner from '../../components/banner/banner';
import Categories from './Categories';
import SpecialDishes from './SpecialDishes';
import Testimonials from './Testimonials';
import OurServices from './OurServices';

const Home = () => {
    return (
        <div>
            <Banner />
            <Categories />
            <SpecialDishes />
            <Testimonials />
            <OurServices />
        </div>
    );
};

export default Home;