import {SET_ALERT_LOCATION, REMOVE_ALERT_LOCATION} from '../actions/types';

const initialState = {
    alertLocation: null
};

export default function (state=initialState, action) { 
    const {type, payload} = action;
    
    switch(type) {
        case SET_ALERT_LOCATION:
            return {...state, alertLocation: payload};
        case REMOVE_ALERT_LOCATION:
            return {...state, alertLocation: null};
        default:
            return state;
    }
}