import { combineReducers } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import user from './user/slice';
import note from './note/slice';

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload
    };
  }

  return combineReducers({ user, note })(state, action);
};

export default reducer;
export type RootState = ReturnType<typeof reducer>;
