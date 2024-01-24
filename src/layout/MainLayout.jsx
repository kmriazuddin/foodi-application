import React, { useContext } from 'react';
import "../App.css"
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { AuthContext } from '../contexts/AuthProvider';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';

const MainLayout = () => {
    const { loading } = useContext(AuthContext);

    return (
        <div>
            {
                loading ? <LoadingSpinner />
                    :
                    <div>
                        <Navbar />
                        <div className='min-h-[calc(100vh-68px)]'>
                            <Outlet />
                        </div>
                        <Footer />
                    </div>
            }
        </div>
    );
};

export default MainLayout;