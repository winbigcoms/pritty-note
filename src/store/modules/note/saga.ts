import { call, put, select, takeLatest } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { NoteService } from 'src/service/note';
import { RootState } from '..';
import {
  getNoteListFail,
  getNoteListRequest,
  getNoteListSuccess,
  getNotePageFail,
  getNotePageRequest,
  getNotePageSuccess
} from './slice';

function* getNoteListSaga() {
  try {
    const { id } = yield select((store: RootState) => store.user);
    const getNoteResult = yield call(NoteService.getNoteListData, id);

    yield put(getNoteListSuccess(getNoteResult.list));
  } catch (err) {
    yield put(getNoteListFail());
  }
}

function* getNotePageSaga(action: PayloadAction<string>) {
  try {
    const pageId = action.payload;
    const { id: owner } = yield select((store: RootState) => store.user);
    const { title, contents, id } = yield call(NoteService.getNotePageData, pageId, owner);

    yield put(getNotePageSuccess({ title, contents, id, type: 'file' }));
  } catch (err) {
    yield put(getNotePageFail());
  }
}

export function* noteSaga() {
  yield takeLatest(getNoteListRequest.type, getNoteListSaga);
  yield takeLatest(getNotePageRequest.type, getNotePageSaga);
}
