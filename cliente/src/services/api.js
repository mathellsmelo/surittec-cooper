import axios from 'axios';

import { API_BASE_URL } from '../contants';
import { getToken } from "./auth";

const api = axios.create({
    baseURL: API_BASE_URL
});

api.interceptors.request.use(async config => {
    const token = getToken();
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export default api;