import { server } from '../config/globalConfig';

export const GET_FEEDBACKS = 'GET_FEEDBACKS';
export const ADD_FEEDBACK = 'ADD_FEEDBACK';
export const UPDATE_FEEDBACK = 'UPDATE_FEEDBACK';
export const DELETE_FEEDBACK = 'DELETE_FEEDBACK';

export function getFeedbacks() {
  return {
    type: GET_FEEDBACKS,
    payload: async () => {
      const response = await fetch(`${server}/feedbacks`);
      const data = await response.json();
      return data;
    },
  };
}

export function addFeedback(feedback) {
  return {
    type: ADD_FEEDBACK,
    payload: async () => {
        let response = await fetch(`${server}/feedbacks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(feedback)
        })
        if(!response.ok){
            throw response
        }
        response = await fetch(`${server}/feedbacks`);
        const data = await response.json();
        return data;
    }
  }
}

export function updateFeedback(feedback, feedbackID) {
    return {
      type: UPDATE_FEEDBACK,
      payload: async () => {
        await fetch(`${server}/feedbacks/${feedbackID}`, {
          method: 'put',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(feedback),
        });
        let response = await fetch(`${server}/feedbacks`);
        let data = await response.json();
        return data;
      }
    }
  }

  export function deleteFeedback(feedbackID) {
    return {
      type: DELETE_FEEDBACK,
      payload: async () => {
        await fetch(`${server}/feedbacks/${feedbackID}`, {
          method: 'delete'
        })
        let response = await fetch(`${server}/feedbacks`);
        let data = await response.json();
        return data;
      }
    }
  }
  