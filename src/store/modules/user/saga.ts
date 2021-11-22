import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { LoginService } from 'src/service/login';
import { LoginRequestPayload, LoginReturn } from './model';
import { loginFail, loginRequest, loginSuccess } from './slice';

function* loginRequestSaga(action: PayloadAction<LoginRequestPayload>) {
  try {
    const loginData = action.payload;

    const loginResult: LoginReturn = yield call(LoginService.loginRequest, loginData);
    yield put(loginSuccess(loginResult.data));
  } catch (err) {
    yield put(loginFail({ error: '로그인 실패' }));
  }
}

export function* loginSaga() {
  yield takeLatest(loginRequest.type, loginRequestSaga);
}
