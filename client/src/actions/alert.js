import {SET_ALERT, REMOVE_ALERT, SET_ALERT_LOCATION, REMOVE_ALERT_LOCATION} from './types';

export const setAlert = (msg, alertType, location) => dispatch => {
    dispatch({
        type: SET_ALERT,
        payload: {
            msg,
            alertType
        }
    });
    dispatch({
        type: SET_ALERT_LOCATION,
        payload: location
    });
    setTimeout(()=> {
        dispatch({type: REMOVE_ALERT});
        dispatch({type: REMOVE_ALERT_LOCATION});
    }, 5000);
}