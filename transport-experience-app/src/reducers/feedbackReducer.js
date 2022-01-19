// import { GET_FEEDBACKS } from '../actions/feedbackAction';

const INITIAL_STATE = {
  feedbackList: [],
  error: null,
  fetching: false,
  fetched: false,
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'GET_FEEDBACKS_PENDING':
    case 'ADD_FEEDBACK_PENDING':
    case 'UPDATE_FEEDBACK_PENDING':
    case 'DELETE_FEEDBACK_PENDING':
      return { ...state, error: null, fetching: true, fetched: false };
    case 'GET_FEEDBACKS_FULFILLED':
    case 'ADD_FEEDBACK_FULFILLED':
    case 'UPDATE_FEEDBACK_FULFILLED':
    case 'DELETE_FEEDBACK_FULFILLED':
      return {
        ...state,
        feedbackList: action.payload,
        fetching: false,
        fetched: true,
      };
    case 'GET_FEEDBACKS_REJECTED':
    case 'ADD_FEEDBACK_REJECTED':
    case 'UPDATE_FEEDBACK_REJECTED':
    case 'DELETE_FEEDBACK_REJECTED':
      return {
        ...state,
        error: action.payload,
        fetching: false,
        fetched: false,
      };
    default:
      return state;
  }
}
