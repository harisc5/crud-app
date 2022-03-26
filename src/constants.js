import axios from "axios";

const BASE_URL = 'https://623cecdbdb0fc039d4b0ee00.mockapi.io/api/';

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Access-Control-Allow-Credentials': true,
        'Content-Type': 'application/json',
    },
});
