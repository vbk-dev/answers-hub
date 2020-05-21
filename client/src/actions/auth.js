import axios from 'axios';

import {REGISTRATION_SUCCESS, LOGIN_SUCCESS, LOGOUT, LOAD_USER, AUTH_FAILED, RESET_LINK_AUTHORIZED,
    RESET_LINK_UNAUTHORIZED, RESET_AUTHORIZATION_TOGGLER} from './types';
import {setAlert} from './alert';
import setAuthToken from '../utils/set-header-token';

export const resetVerificationToggler = () => dispatch => {
    dispatch({ type: RESET_AUTHORIZATION_TOGGLER });
}

export const resetPassword = (id, password, confirmPassword, history) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({id, password, confirmPassword});
    try {
        await axios.post('/api/auth/reset-password', body, config);
        dispatch({ type: RESET_AUTHORIZATION_TOGGLER });
        history.push('/login');
        dispatch(setAlert('Please Login with updated Password', 'success', 'LOGIN_FORM'));
    } catch (error) {
        dispatch({ type: RESET_LINK_UNAUTHORIZED });
    }
}

export const resetLinkVerification = (token, id) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({token, id});
    try {
        await axios.post('/api/auth/verify-reset-link', body, config);
        dispatch({ type: RESET_LINK_AUTHORIZED });
        return true;
    } catch (error) {
        dispatch({ type: RESET_LINK_UNAUTHORIZED });
        return false;
    }
}

export const requestPasswrodReset = (email, alertLocation) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({email});
    try {
        const res = await axios.post('/api/auth/request-password-reset', body, config);
        dispatch(setAlert(res.data.message, 'success', alertLocation));
        console.log('Success');
    } catch (error) {
        dispatch(setAlert(error.response.data.error, 'danger', alertLocation));
        console.log('Failed');
    }
}

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