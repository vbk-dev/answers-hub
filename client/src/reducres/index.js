import {combineReducers} from 'redux';

import alert from './alert';
import global from './global';
import auth from './auth';
import ques from './question';

export default combineReducers({
    alert,
    global,
    auth,
    ques
});