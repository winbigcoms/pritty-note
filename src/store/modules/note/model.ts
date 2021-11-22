export type ListItem = {
  type: string;
  title: string;
  id?: string;
  children?: ListItem[];
};

export type SelectedData = {
  title: string;
  type: string;
  id: string;
  contents: {
    type: string;
    content: string;
    id: string;
    url?: string;
  }[];
};

export interface noteInitalState {
  list: ListItem[];
  contents: SelectedData | undefined;
  loading: boolean;
}
