import { createSlice } from '@reduxjs/toolkit';
import { LoginData } from './model';
import { userReducer } from './reducer';

const initialState: LoginData = {
  id: '',
  name: '',
  loading: false,
  error: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: userReducer
});

export const { loginRequest, loginSuccess, loginFail, logout } = userSlice.actions;

export default userSlice.reducer;
