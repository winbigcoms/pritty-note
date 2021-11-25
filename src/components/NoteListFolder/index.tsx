import { Dispatch, SetStateAction, useState } from 'react';
import { MakeNavList } from 'src/components';
import { ListItemButton, ListItemText, Collapse, List } from '@mui/material';
import styled from 'styled-components';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { ListItem } from 'src/store/modules/note/model';

interface NoteListFolderProps {
  loop: number;
  initSelectedItem: string;
  primary: string;
  onSelect: Dispatch<SetStateAction<string>>;
  listItems: ListItem[];
}

const StyledListItemText = styled(ListItemText)`
  .css-10hburv-MuiTypography-root {
    font-family: 'Hi Melody', cursive !important;
    font-size: 18px;
  }
`;

export const NoteListFolder = (props: NoteListFolderProps) => {
  const { loop, initSelectedItem, primary, onSelect, listItems } = props;

  const [isOpen, setOpen] = useState(false);

  const changeOpenState = () => {
    setOpen(state => !state);
  };

  return (
    <>
      <ListItemButton sx={{ pl: loop * 2 }} onClick={changeOpenState}>
        <StyledListItemText primary={primary} />
        {isOpen ? <FolderOpenIcon /> : <FolderIcon />}
      </ListItemButton>
      <Collapse in={isOpen}>
        <List>
          {
            <MakeNavList
              listItems={listItems}
              loop={loop + 1}
              selectedItem={initSelectedItem}
              onSelect={onSelect}
            />
          }
        </List>
      </Collapse>
    </>
  );
};
