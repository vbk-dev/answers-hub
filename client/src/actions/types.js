// types constants for alert state
export const SET_ALERT = 'SET_ALERT';
export const REMOVE_ALERT = 'REMOVE_ALERT';

// types consants for global state
export const SET_ALERT_LOCATION = 'SET_ALERT_LOCATION';
export const REMOVE_ALERT_LOCATION = 'REMOVE_ALERT_LOCATION';
export const START_LOADING = 'START_LOADING';
export const END_LOADING = 'END_LOADING';

// types consants for auth state
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const LOAD_USER = 'LOAD_USER';
export const AUTH_FAILED = 'AUTH_FAILED';
export const RESET_LINK_AUTHORIZED = 'RESET_LINK_AUTHORIZED';
export const RESET_LINK_UNAUTHORIZED = 'RESET_LINK_UNAUTHORIZED';
export const RESET_AUTHORIZATION_TOGGLER = 'RESET_AUTHORIZATION_TOGGLER';

// types constants form questions state
export const FETCH_QUESTIONS_LIST = 'FETCH_QUESTIONS_LIST';
export const POST_QUESTION = 'POST_QUESTION';
export const POST_QUESTION_ERROR = 'POST_QUESTION_ERROR';
export const FETCH_QUESTION = 'FETCH_QUESTION';
export const FETCH_QUESTION_ERROR = 'FETCH_QUESTION_ERROR';
export const VOTE_UP_QUESTION = 'VOTE_UP_QUESTION';
export const VOTE_DOWN_QUESTION = 'VOTE_DOWN_QUESTION';
export const INCRIMENT_PAGE_COUNT = 'INCRIMENT_PAGE_COUNT';
export const APPEND_QUESTIONS = 'APPEND_QUESTIONS';
export const NO_QUESTION_TO_LOAD = 'NO_QUESTION_TO_LOAD';

// types constants form answer state
export const FETCH_ALL_ANSWERS = 'FETCH_ALL_ANSWERS';
export const FETCH_ANSWERS_ERROR = 'FETCH_ANSWERS_ERROR';
export const POST_ANSWER = 'POST_ANSWER';
export const DELETE_ANSWER = 'DELETE_ANSWER';
export const UPDATE_ANSWER = 'UPDATE_ANSWER';
export const VOTE_UP_ANSWER = 'VOTE_UP_ANSWER';
export const VOTE_DOWN_ANSWER = 'VOTE_DOWN_ANSWER';