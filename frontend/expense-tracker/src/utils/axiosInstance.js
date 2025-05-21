import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout:10000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

//request intercepter

axiosInstance.interceptors.request.use(
    (config) => {
    const accesstoken = localStorage.getItem("token");
    if (accesstoken) {
        config.headers.Authorization = `Bearer ${accesstoken}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

//response intercepter
axiosInstance.interceptors.response.use(
    (response) => {
    return response;
}, (error)=>{
    if (error.response) {
        if (error.response.status === 401) {
            window.location.href = "/login";

        } else if (error.response.status == 500) {
            console.error("Server error. Please try again later.");
        }
    } else if (error.code === 'ECONNREFUSED') {
        console.error("Request timeout.Please try again later.");
    }
    return Promise.reject(error);
}

    
    
);

export default axiosInstance;