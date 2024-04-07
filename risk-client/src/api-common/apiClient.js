import axios from "axios"


const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL ,
    timeout: 50000
})

axiosClient.interceptors.request.use(function (config) {
    const token = `Bearer ${localStorage.getItem('AUTH_TOKEN')}`;
    config.headers.Authorization = token;

    return config;
});

axiosClient.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});


export default axiosClient