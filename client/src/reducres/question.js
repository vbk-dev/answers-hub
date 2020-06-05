import { POST_QUESTION, FETCH_QUESTIONS_LIST, FETCH_QUESTION, FETCH_QUESTION_ERROR, VOTE_UP_QUESTION, VOTE_DOWN_QUESTION,
            NO_QUESTION_TO_LOAD, APPEND_QUESTIONS} from '../actions/types';

const initialState = {
    question: {
        isLoading: true,
        details: null
    },
    questionsList: [],
    isLoading: true,
    pageCount: 2,
    isMoreQuestions: true
}

export default function(state=initialState, action) {
    const {type, payload} = action;
    switch(type){
        case FETCH_QUESTIONS_LIST:
            return { ...state, questionsList: payload, pageCount: 2, isLoading: false, question: { isLoading: true, details: null }, isMoreQuestions: true };
        case POST_QUESTION:
            return state;
        case FETCH_QUESTION:
        case VOTE_UP_QUESTION:
        case VOTE_DOWN_QUESTION:
            return { ...state, questionsList: [], isLoading: false, question: { isLoading: false, details: payload } };
        case FETCH_QUESTION_ERROR:
            return { ...state, questionsList: [], isLoading: false, question: { isLoading: true, details: payload } };
        case NO_QUESTION_TO_LOAD:
            return { ...state , isMoreQuestions: false};
        case APPEND_QUESTIONS: return { ...state, pageCount: (state.pageCount + 1), questionsList: [...state.questionsList, ...payload] };
        default:
            return state
    }
}