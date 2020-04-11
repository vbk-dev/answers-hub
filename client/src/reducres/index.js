import {combineReducers} from 'redux';

import alert from './alert';
import global from './global';

export default combineReducers({
    alert,
    global
});