import axios from 'axios';

import {POST_QUESTION, FETCH_QUESTIONS_LIST, FETCH_QUESTION, FETCH_QUESTION_ERROR, VOTE_UP_QUESTION, VOTE_DOWN_QUESTION,
        START_LOADING, END_LOADING, NO_QUESTION_TO_LOAD, APPEND_QUESTIONS } from './types';
import {setAlert} from './alert';

export const loadQuestions = (searchTerm, page) => async dispatch => {
    dispatch({type: START_LOADING});
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({query: searchTerm, page});
    try {
        const res = await axios.post('/api/question/search', body, config);
        const questions = res.data.questions;
        
        if (!questions) {
            dispatch({type: NO_QUESTION_TO_LOAD});
            return dispatch({type: END_LOADING}); 
        }

        dispatch({type: APPEND_QUESTIONS, payload: questions});
        console.log({questions});
        dispatch({type: END_LOADING});
    } catch (error) {
        dispatch(setAlert(error.response.data.error + ' Please Refresh Page', 'danger', 'INDEX'));
        dispatch({type: END_LOADING});
    }
}

export const upVote = (questionId, alertLoc) => async dispatch => {
    try {
        const res = await axios.get(`/api/vote/upvote/question/${questionId}`);
        dispatch({
            type: VOTE_UP_QUESTION,
            payload: res.data.question
        });
        dispatch(setAlert('Vote Added to question', 'success', alertLoc));
    } catch (error) {
        dispatch(setAlert(error.response.data.error, 'danger', alertLoc));
        console.log('Error: ', error.response.data);
    }
}

export const downVote = (questionId, alertLoc) => async dispatch => {
    try {
        const res = await axios.get(`/api/vote/downvote/question/${questionId}`);
        dispatch({
            type: VOTE_DOWN_QUESTION,
            payload: res.data.question
        });
        dispatch(setAlert('Vote Removed from question', 'success', alertLoc));
    } catch (error) {
        dispatch(setAlert(error.response.data.error, 'danger', alertLoc));
        console.log('Error: ', error.response.data);
    }
}

export const postQuestion = (questionDetails, alertLoc, history) => async dispatch => {
    dispatch({type: START_LOADING});
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
        dispatch({type: END_LOADING});
    } catch (error) {
        dispatch(setAlert(error.response.data.error, 'danger', alertLoc));
        dispatch({type: END_LOADING});
    }
}

export const updateQuestion = (questionDetails, questionId, alertLoc, history) => async dispatch => {
    dispatch({type: START_LOADING});
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
        dispatch({type: END_LOADING});
    } catch (error) {
        dispatch(setAlert(error.response.data.error, 'danger', alertLoc));
        dispatch({type: END_LOADING});
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
        console.log('Error: ', error.response.error);
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

export const fetchQuestionList = (searchTerm, page=1) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({query: searchTerm, page});
    try {
        const res = await axios.post('/api/question/search', body, config);
        dispatch({
            type: FETCH_QUESTIONS_LIST,
            payload: res.data.questions === null ? [] : res.data.questions
        })  
    } catch (error) {
        dispatch(setAlert(error.response.data.error + ' Please Refresh Page', 'danger', 'INDEX'));
    }
}