import {REGISTRATION_SUCCESS, REGISTRATION_FAILED, LOGIN_SUCCESS, 
    LOGIN_FAILED, LOGOUT, LOAD_USER, AUTH_FAILED} from '../actions/types';

const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: true,
    token: localStorage.getItem('token')
}

export default function(state=initialState, action){
    const {type, payload} = action;
    switch(type){
        case LOAD_USER: 
            return {...state, isAuthenticated: true, isLoading: false, user: payload};
        case REGISTRATION_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload);
            return { ...state, isAuthenticated: true, isLoading: false, token: payload};
        case REGISTRATION_FAILED:
        case LOGIN_FAILED:
        case LOGOUT:
        case AUTH_FAILED:
            localStorage.removeItem('token');
            return {...state, user: null, isAuthenticated: false, isLoading: true, token: null};
        default:
            return state;
    }
}