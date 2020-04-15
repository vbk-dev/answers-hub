import {REGISTRATION_SUCCESS, LOGIN_SUCCESS, 
    LOGOUT, LOAD_USER, AUTH_FAILED} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: true,
    user: null
};

export default function(state=initialState, action){
    const {type, payload} = action;
    switch(type){
        case LOAD_USER: 
        return {...state, isAuthenticated:true, isLoading: false, user:payload};
        case REGISTRATION_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload);
            return {...state, isAuthenticated:true, isLoading: false, token:payload }
        case LOGOUT:
        case AUTH_FAILED:
            localStorage.removeItem('token');
            return {...state, isAuthenticated:null, isLoading: false, token:null, user: null};
        default:
            return state;
    }
}