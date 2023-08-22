import * as actionType from '../constants/actionTypes';

// authReducer starts with an initial state when the app first loads. 
// The initial state is an object with authData set to null.
const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case actionType.AUTH:
      // TODO: Store the returned data in cookies instead of local storage.
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));

      return { ...state, authData: action.data, loading: false, errors: null };
    case actionType.LOGOUT:
      localStorage.clear();

      return { ...state, authData: null, loading: false, errors: null };
    default:
      return state;
  }
};

export default authReducer;
