import axios from 'axios';

import {REGISTRATION_SUCCESS, LOGIN_SUCCESS, 
    LOGOUT, LOAD_USER, AUTH_FAILED} from './types';
import {setAlert} from './alert';
import setAuthToken from '../utils/set-header-token';

export const registerUser = (userDetails, alertLocation) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify(userDetails);
    try {
        const res = await axios.post('/api/auth/register-user', body, config);
        dispatch({
            type: REGISTRATION_SUCCESS,
            payload: res.data.token
        });
        dispatch(loadUser());
    } catch (error) {
        dispatch(setAlert(error.response.data.error, 'danger', alertLocation));
        dispatch({
            type: AUTH_FAILED
        });
    }
}

export const loginUser = (userDetails, alertLocation) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify(userDetails);
    try {
        const res = await axios.post('/api/auth/login-user', body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data.token
        });
        dispatch(loadUser());
    } catch (error) {
        dispatch(setAlert(error.response.data.error, 'danger', alertLocation));
        dispatch({
            type: AUTH_FAILED
        });
    }
}

export const logoutUser = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
}

export const loadUser = () => async dispatch => {
    if (localStorage.token){
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get('/api/auth');
        dispatch({
            type: LOAD_USER,
            payload: res.data.user
        });
    } catch (error) {
        dispatch({
            type: AUTH_FAILED
        });
    }
}