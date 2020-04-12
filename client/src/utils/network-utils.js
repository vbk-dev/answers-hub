import axios from 'axios';

export const connection = axios.create({
    baseURL: 'http://localhost:5000/',
    headers: {
        'Access-Control-Allow-Origin': 'http://localhost:5000/',
        'x-auth-token': localStorage.getItem('token'),
        'Content-Type': 'application/json'
    }
});