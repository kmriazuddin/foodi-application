import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';

const PrivateRoute = ({children}) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) return <LoadingSpinner />
    if(user) return children;
    return <Navigate to="/signUp" state={{from: location}} replace ></Navigate>
};

export default PrivateRoute;