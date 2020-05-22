import {SET_ALERT_LOCATION, REMOVE_ALERT_LOCATION, RESET_LINK_AUTHORIZED, RESET_LINK_UNAUTHORIZED, 
    RESET_AUTHORIZATION_TOGGLER, START_LOADING, END_LOADING} from '../actions/types';

const initialState = {
    alertLocation: null,
    isResetLinkVerified: false,
    isLoading: false
};

export default function (state=initialState, action) { 
    const {type, payload} = action;
    
    switch(type) {
        case SET_ALERT_LOCATION:
            return {...state, alertLocation: payload};
        case REMOVE_ALERT_LOCATION:
            return {...state, alertLocation: null};
        case RESET_LINK_AUTHORIZED:
            return {...state, isResetLinkVerified: true};
        case RESET_LINK_UNAUTHORIZED:
        case RESET_AUTHORIZATION_TOGGLER:
            return {...state, isResetLinkVerified: false};
        case START_LOADING:
            return {...state, isLoading: true};
        case END_LOADING:
            return {...state, isLoading: false};
        default:
            return state;
    }
}