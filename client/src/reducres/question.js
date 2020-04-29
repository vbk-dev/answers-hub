import { POST_QUESTION, FETCH_QUESTIONS_LIST, FETCH_QUESTION, FETCH_QUESTION_ERROR, VOTE_UP_QUESTION, VOTE_DOWN_QUESTION} from '../actions/types';

const initialState = {
    question: {
        isLoading: true,
        details: null
    },
    questionsList: [],
    isLoading: true,
}

export default function(state=initialState, action) {
    const {type, payload} = action;
    switch(type){
        case FETCH_QUESTIONS_LIST:
            return { ...state, questionsList: payload, isLoading: false, question: { isLoading: true, details: null } };
        case POST_QUESTION:
            return state
        case FETCH_QUESTION:
        case VOTE_UP_QUESTION:
        case VOTE_DOWN_QUESTION:
            return { ...state, questionsList: [], isLoading: true, question: { isLoading: false, details: payload } }
        case FETCH_QUESTION_ERROR:
            return { ...state, questionsList: [], isLoading: false, question: { isLoading: true, details: payload } }
        default:
            return state
    }
}