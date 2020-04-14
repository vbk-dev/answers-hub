import {connection} from '../utils/network-utils';

import {POST_QUESTION, POST_QUESTION_ERROR, FETCH_ALL_QUESTIONS} from './types';
import {setAlert} from './alert';

export const postQuestion = (questionDetails, alertLocation) => async dispatch => {
    const body = JSON.stringify(questionDetails);
    try {
        await connection.post('/api/question/', body);
        dispatch({
            type: POST_QUESTION
        });
        dispatch(setAlert('Your question posted Successfully', 'success', 'INDEX'));
        return true;
    } catch (error) {
        dispatch(setAlert(error.response.data.error, 'danger', alertLocation));        
        return false;
    }
}

export const fetchAllQuestions = () => async dispatch => {
    try {
        const res = await connection.get('/api/question/all');
        dispatch({
            type: FETCH_ALL_QUESTIONS,
            payload: res.data.questions
        })
    } catch (error) {
        // dispatch(setAlert(error.response.data.error, 'danger', alertLocation));
        // dispatch({
        //     type: POST_QUESTION_ERROR
        // });
    }
}