import axios from 'axios';

import {POST_QUESTION, FETCH_ALL_QUESTIONS, FETCH_QUESTION, FETCH_QUESTION_ERROR} from './types';
import {setAlert} from './alert';

export const postQuestion = (questionDetails, alertLocation) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify(questionDetails);
    try {
        await axios.post('/api/question/', body, config);
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
        const res = await axios.get('/api/question/all');
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

export const fetchQuestionDetails = (id, dashedTitle) => async dispatch => {
    try {
        const res = await axios.get(`/api/question/${id}/${dashedTitle}`);
        console.log('Server Response: ', res.data);
        dispatch({
            type: FETCH_QUESTION,
            payload: res.data.question
        })
    } catch (error) {
        dispatch({
            type: FETCH_QUESTION_ERROR
        });       
    }
}