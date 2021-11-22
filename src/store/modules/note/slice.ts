import { createSlice } from '@reduxjs/toolkit';
import { noteInitalState } from './model';
import { noteReducer } from './reducer';

const initialState: noteInitalState = {
  list: [],
  contents: undefined,
  loading: false
};

const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: noteReducer
});

export const {
  getNoteListRequest,
  getNoteListSuccess,
  getNoteListFail,
  getNotePageRequest,
  getNotePageSuccess,
  getNotePageFail,
  resetNotePage
} = noteSlice.actions;
export default noteSlice.reducer;
