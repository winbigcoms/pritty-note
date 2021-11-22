import { ListItem } from 'src/store/modules/note/model';

export interface NoteListType {
  listItems: ListItem[];
  user: {
    name: string;
    id: string;
  };
  makeNewNote: (initNoteData: { title: string; type: string; id: string }) => void;
}

export interface NoteItemData {
  title: string;
  type: string;
  id: string;
  contents: {
    type: string;
    content: string;
    id: string;
  }[];
}
