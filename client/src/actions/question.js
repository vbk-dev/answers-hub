import axios from 'axios';

import {POST_QUESTION, FETCH_QUESTIONS_LIST, FETCH_QUESTION, FETCH_QUESTION_ERROR } from './types';
import {setAlert} from './alert';

export const postQuestion = (questionDetails, alertLoc, history) => async dispatch => {
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
        history.push('/');
        dispatch(setAlert('Your question posted Successfully', 'success', 'INDEX'));
    } catch (error) {
        dispatch(setAlert(error.response.data.error, 'danger', alertLoc));
    }
}

export const updateQuestion = (questionDetails, questionId, alertLoc, history) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify(questionDetails);
    try {
        const res = await axios.put(`/api/question/${questionId}`, body, config);
        dispatch({
            type: FETCH_QUESTION,
            payload: res.data.question
        });
        history.push('/');
        dispatch(setAlert('Question Updated Successfully', 'success', 'INDEX'));
    } catch (error) {
        dispatch(setAlert(error.response.data.error, 'danger', alertLoc));
    }
}

export const fetchAllQuestions = () => async dispatch => {
    try {
        const res = await axios.get('/api/question/all');
        dispatch({
            type: FETCH_QUESTIONS_LIST,
            payload: res.data.questions
        })
    } catch (error) {
        dispatch(setAlert(error.response.data.error + ' Please Refresh Page', 'danger', 'INDEX'));
        // dispatch({
        //     type: POST_QUESTION_ERROR
        // });
    }
}

export const fetchQuestionDetails = (id, dashedTitle) => async dispatch => {
    try {
        const res = await axios.get(`/api/question/${id}/${dashedTitle}`);
        dispatch({
            type: FETCH_QUESTION,
            payload: res.data.question
        })
    } catch (error) {
        dispatch({
            type: FETCH_QUESTION_ERROR
        });
        console.log('Error: ', error.response.data);
    }
}

export const deleteQuestion = (id, alertLoc, history) => async dispatch => {
    try {
            await axios.delete(`/api/question/${id}`);
        dispatch(setAlert('Question Deleted Successfully', 'success', 'INDEX'));
        history.push('/');
    } catch (error) {
        dispatch(setAlert(error.response.data.error + ' Please Refresh Page', 'danger', alertLoc));
    }
}


export const fetchQuestionList = searchTerm => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({query: searchTerm});
    try {
        const res = await axios.post('/api/question/search', body, config);
        dispatch({
            type: FETCH_QUESTIONS_LIST,
            payload: res.data.questions === null ? [] : res.data.questions
        })  
    } catch (error) {
        dispatch(setAlert(error + ' Please Refresh Page', 'danger', 'INDEX'));
    }
}