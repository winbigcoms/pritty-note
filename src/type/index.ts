export type ListItem = {
  type: string;
  title: string;
  id?: string;
  children?: ListItem[];
};

export interface NoteListType {
  listItems: ListItem[];
  user: {
    name: string;
    id: string;
  };
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
