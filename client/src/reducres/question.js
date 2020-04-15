import { POST_QUESTION, FETCH_ALL_QUESTIONS, FETCH_QUESTION, FETCH_QUESTION_ERROR} from '../actions/types';

const initialState = {
    question: null,
    questionsList: [],
    isLoading: true,
}

export default function(state=initialState, action) {
    const {type, payload} = action;
    switch(type){
        case FETCH_ALL_QUESTIONS:
            return { ...state, questionsList: payload }
        case POST_QUESTION:
            return state
        case FETCH_QUESTION:
            return { ...state, isLoading: false, question: payload }
        case FETCH_QUESTION_ERROR:
            return { ...state, isLoading: false, question: null }
        default:
            return state
    }
}