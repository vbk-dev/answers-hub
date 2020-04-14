import { POST_QUESTION, FETCH_ALL_QUESTIONS} from '../actions/types';

const initialState = {
    question: null,
    questionsList: []
}

export default function(state=initialState, action) {
    const {type, payload} = action;
    switch(type){
        case FETCH_ALL_QUESTIONS:
            return { ...state, questionsList: payload }
        case POST_QUESTION:
            return state
        default:
            return state
    }
}