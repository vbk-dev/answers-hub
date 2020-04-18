import axios from 'axios';

import {FETCH_ALL_ANSWERS, FETCH_ANSWERS_ERROR, POST_ANSWER} from './types';
import {setAlert} from './alert';

export const fetchAllAnswers = (questionId, alertLoc) => async dispatch => {
    try {
        const res = await axios.get(`/api/answer/fetch/${questionId}`);
        dispatch({
            type: FETCH_ALL_ANSWERS,
            payload: res.data.answers
        })
    } catch (error) {
        dispatch(setAlert(error.response.data.error + '. Please Refresh Page', 'danger', alertLoc));
        dispatch({
            type: FETCH_ANSWERS_ERROR
        });
    }
}

export const postAnswer = (answer, questionId, alertLoc) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({answer});
    try {
        const res = await axios.post(`/api/answer/post-answer/${questionId}`, body, config);
        console.log('Response: ', res.data.answers);
        dispatch({
            type: POST_ANSWER,
            payload: res.data.answers
        });
        dispatch(setAlert('Answer posted Successfully', 'success', alertLoc));
    } catch (error) {
        console.log('error: ', error.response);
        dispatch(setAlert(error.response.data.error, 'danger', alertLoc));
    }
}