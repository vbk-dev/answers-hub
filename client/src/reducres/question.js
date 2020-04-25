import { POST_QUESTION, FETCH_QUESTIONS_LIST, FETCH_QUESTION, FETCH_QUESTION_ERROR, VOTE_UP, VOTE_DOWN} from '../actions/types';

const initialState = {
    question: null,
    questionsList: [],
    isLoading: true,
}

export default function(state=initialState, action) {
    const {type, payload} = action;
    switch(type){
        case FETCH_QUESTIONS_LIST:
            return { ...state, questionsList: payload, isLoading: false }
        case POST_QUESTION:
            return state
        case FETCH_QUESTION:
        case VOTE_UP:
        case VOTE_DOWN:
            return { ...state, isLoading: false, question: payload }
        case FETCH_QUESTION_ERROR:
            return { ...state, isLoading: false, question: null }
        default:
            return state
    }
}