import {connection} from '../utils/network-utils';

import {REGISTRATION_SUCCESS, LOGIN_SUCCESS, 
    LOGOUT, LOAD_USER, AUTH_FAILED} from './types';
import {setAlert} from './alert';

export const registerUser = (userDetails, alertLocation) => async dispatch => {
    const body = JSON.stringify(userDetails);
    try {
        const res = await connection.post('/api/auth/register-user', body);
        dispatch({
            type: REGISTRATION_SUCCESS,
            payload: res.data.token
        });
        // dispatch(loadUser());
    } catch (error) {
        dispatch(setAlert(error.response.data.error, 'danger', alertLocation));
        dispatch({
            type: AUTH_FAILED
        });
    }
}

export const loginUser = (userDetails, alertLocation) => async dispatch => {
    const body = JSON.stringify(userDetails);
    try {
        const res = await connection.post('/api/auth/login-user', body);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data.token
        });
        // dispatch(loadUser());
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
    try {
        const res = await connection.get('/api/auth');
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