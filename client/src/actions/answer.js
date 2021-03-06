import axios from 'axios';

import {FETCH_ALL_ANSWERS, FETCH_ANSWERS_ERROR, POST_ANSWER, DELETE_ANSWER, UPDATE_ANSWER, VOTE_UP_ANSWER, VOTE_DOWN_ANSWER} from './types';
import {setAlert} from './alert';

export const upVote = (answerId, alertLoc) => async dispatch => {
    try {
        const res = await axios.get(`/api/vote/upvote/answer/${answerId}`);
        dispatch({
            type: VOTE_UP_ANSWER,
            payload: res.data.answers
        });
        dispatch(setAlert('Vote Added to answer', 'success', alertLoc));
    } catch (error) {
        dispatch(setAlert(error.response.data.error, 'danger', alertLoc));
        console.log('Error: ', error.response.data);
    }
}

export const downVote = (answerId, alertLoc) => async dispatch => {
    try {
        const res = await axios.get(`/api/vote/downvote/answer/${answerId}`);
        dispatch({
            type: VOTE_DOWN_ANSWER,
            payload: res.data.answers
        });
        dispatch(setAlert('Vote Removed from answer', 'success', alertLoc));
    } catch (error) {
        dispatch(setAlert(error.response.data.error, 'danger', alertLoc));
        console.log('Error: ', error.response.data);
    }
}

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

export const deleteAnswer = (answerId, questionId, alertLoc) => async dispatch => {
    try {
        const res = await axios.delete(`/api/answer/${answerId}/${questionId}`);
        dispatch({
            type: DELETE_ANSWER,
            payload: res.data.answers
        });
        dispatch(setAlert('Answer posted Successfully', 'success', alertLoc));
    } catch (error) {
        console.log('error: ', error.response);
        dispatch(setAlert(error.response.data.error, 'danger', alertLoc));
    }
}

export const updateAnswer = (answer, questionId, answerId, alertLoc) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({answer});
    try {
        const res = await axios.put(`/api/answer/${questionId}/${answerId}`, body, config);
        dispatch({
            type: UPDATE_ANSWER,
            payload: res.data.answers
        });
        dispatch(setAlert('Answer updated Successfully', 'success', alertLoc));
    } catch (error) {
        console.log('error: ', error.response);
        dispatch(setAlert(error.response.data.error, 'danger', alertLoc));
    }
}