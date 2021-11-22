import { PayloadAction } from '@reduxjs/toolkit';
import { LoginData, LoginFailReturn, LoginRequestPayload, LoginSuccessReturn } from './model';

export const userReducer = {
  loginRequest: {
    reducer: (state: LoginData) => {
      state.loading = true;
    },
    prepare: (loginData: LoginRequestPayload) => ({ payload: loginData })
  },
  loginSuccess: (state: LoginData, action: PayloadAction<LoginSuccessReturn>) => {
    state.id = action.payload.id;
    state.name = action.payload.name;
  },
  loginFail: (state: LoginData, action: PayloadAction<LoginFailReturn>) => {
    state.error = action.payload.error;
  },
  logout: (state: LoginData) => {
    state.id = '';
    state.name = '';
  }
};
