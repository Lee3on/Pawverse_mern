import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

// This is a Redux thunk action creator
// If the sign-in request is successful, an action of type AUTH is dispatched with the returned data as the payload.
// After dispatching the AUTH action, the user is redirected to the home page ('/') using React Router's push method.
export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    router.push('/');
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    router.push('/');
  } catch (error) {
    console.log(error);
  }
};
