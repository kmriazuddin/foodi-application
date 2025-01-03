import axios from 'axios';
import React from 'react';

const axiosPublic = axios.create({
    baseURL: 'https://foodi-application-server.onrender.com'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;