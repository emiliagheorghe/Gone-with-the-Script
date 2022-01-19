import { server } from '../config/globalConfig';

export const GET_USERS = 'GET_USERS';
export const ADD_USER = 'ADD_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';

export function getUsers() {
  return {
    type: GET_USERS,
    payload: async () => {
      const response = await fetch(`${server}/users`);
      const data = await response.json();
      return data;
    },
  };
}

export function addUser(user) {
  return {
    type: ADD_USER,
    payload: async () => {
        let response = await fetch(`${server}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        if(!response.ok){
            throw response
        }
        response = await fetch(`${server}/users`);
        const data = await response.json();
        return data;
    }
  }
}

export function updateUser(user, userID) {
    return {
      type: UPDATE_USER,
      payload: async () => {
        await fetch(`${server}/users/${userID}`, {
          method: 'put',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });
        let response = await fetch(`${server}/users`);
        let data = await response.json();
        return data;
      }
    }
  }

  export function deleteUser(userID) {
    return {
      type: DELETE_USER,
      payload: async () => {
        await fetch(`${server}/users/${userID}`, {
          method: 'delete'
        })
        let response = await fetch(`${server}/users`);
        let data = await response.json();
        return data;
      }
    }
  }
  
  export function getUser(user, userID) {
    return {
      type: GET_USERS,
      payload: async () => {
        const response = await fetch(`${server}/users/${userID}`);
        const data = await response.json();
        return data;
      },
    };
  }