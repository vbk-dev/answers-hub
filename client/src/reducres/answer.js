import { FETCH_ALL_ANSWERS, FETCH_ANSWERS_ERROR, POST_ANSWER, DELETE_ANSWER, UPDATE_ANSWER } from '../actions/types';

const initialState = {
    answerList: [],
    isLoading: true,
}

export default function(state=initialState, action) {
    const {type, payload} = action;
    switch(type){
        case FETCH_ALL_ANSWERS:
        case POST_ANSWER:
        case DELETE_ANSWER:
        case UPDATE_ANSWER:
            return { ...state, isLoading: false, answerList: payload };
        case FETCH_ANSWERS_ERROR:
            return { ...state, isLoading: false, answerList: [] };
        default:
            return state;
    }
}