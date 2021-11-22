import { PayloadAction } from '@reduxjs/toolkit';
import { ListItem, noteInitalState, SelectedData } from './model';

export const noteReducer = {
  getNoteListRequest: (state: noteInitalState) => {
    state.loading = true;
  },
  getNoteListSuccess: (state: noteInitalState, action: PayloadAction<ListItem[]>) => {
    state.list = action.payload;
    state.loading = false;
  },
  getNoteListFail: (state: noteInitalState) => {
    state.list = [];
    state.loading = false;
  },
  getNotePageRequest: {
    reducer: (state: noteInitalState) => {
      state.loading = true;
    },
    prepare: (pageRequestParams: string) => ({ payload: pageRequestParams })
  },
  getNotePageSuccess: (state: noteInitalState, action: PayloadAction<SelectedData>) => {
    state.loading = false;
    state.contents = action.payload;
  },
  getNotePageFail: (state: noteInitalState) => {
    state.loading = false;
    state.contents = undefined;
  },
  resetNotePage: (state: noteInitalState) => {
    state.loading = false;
    state.contents = undefined;
  }
};
