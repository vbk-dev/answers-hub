import {connection} from '../utils/network-utils';

import {REGISTRATION_SUCCESS, REGISTRATION_FAILED, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT} from './types';
import {setAlert} from './alert';

export const registerUser = (userDetails, alertLocation) => async dispatch => {
    const body = JSON.stringify(userDetails);
    try {
        const res = await connection.post('/api/auth/register-user', body);
        dispatch({
            type: REGISTRATION_SUCCESS,
            payload: res.data.token
        });
    } catch (error) {
        dispatch(setAlert(error.response.data.error, 'danger', alertLocation));
        dispatch({
            type: REGISTRATION_FAILED
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
    } catch (error) {
        dispatch(setAlert(error.response.data.error, 'danger', alertLocation));
        dispatch({
            type: LOGIN_FAILED
        });
    }
}

export const logoutUser = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
}