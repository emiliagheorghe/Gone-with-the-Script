const INITIAL_STATE = {
    usersList: [],
    error: null,
    fetching: false,
    fetched: false,
  };
  
  export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
      case 'GET_USERS_PENDING':
      case 'ADD_USER_PENDING':
      case 'UPDATE_USER_PENDING':
      case 'DELETE_USER_PENDING':
        return { ...state, error: null, fetching: true, fetched: false };
      case 'GET_USERS_FULFILLED':
      case 'ADD_USER_FULFILLED':
      case 'UPDATE_USER_FULFILLED':
      case 'DELETE_USER_FULFILLED':
        return {
          ...state,
          usersList: action.payload,
          fetching: false,
          fetched: true,
        };
      case 'GET_USERS_REJECTED':
      case 'ADD_USER_REJECTED':
      case 'UPDATE_USER_REJECTED':
      case 'DELETE_USER_REJECTED':
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
  