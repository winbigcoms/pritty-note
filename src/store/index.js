import { createWrapper } from 'next-redux-wrapper';

import createSagaMiddleware from '@redux-saga/core';
import { all, fork } from '@redux-saga/core/effects';
import { configureStore } from '@reduxjs/toolkit';

import reducer from './modules';
import { loginSaga } from './modules/user/saga';
import { noteSaga } from './modules/note/saga';

const sagaMiddleware = createSagaMiddleware();

export function* rootSaga() {
  yield all([fork(loginSaga), fork(noteSaga)]);
}

const makeStore = () => {
  const store = configureStore({
    reducer,
    middleware: [sagaMiddleware],
    devTools: process.env.NODE_ENV !== 'production'
  });

  sagaMiddleware.run(rootSaga);

  return store;
};

export const wrapper = createWrapper(makeStore, {
  debug: process.env.NODE_ENV !== 'production'
});
