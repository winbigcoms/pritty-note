import React, { Dispatch, SetStateAction, useCallback } from 'react';

import styled from 'styled-components';

import { ListItemButton, ListItemText } from '@mui/material';

import { NoteListFolder } from 'src/components';
import { ListItem } from 'src/store/modules/note/model';
import { useDispatch, useSelector } from 'react-redux';
import { getNotePageRequest } from 'src/store/modules/note/slice';
import { NavListItemButton } from '../NavListItemButton';
import { RootState } from 'src/store/modules';

const StyledListItemText = styled(ListItemText)`
  .css-10hburv-MuiTypography-root {
    font-family: 'Hi Melody', cursive !important;
    font-size: 18px;
  }
`;

const MakeNavListContents = (props: {
  listItems: ListItem[];
  loop?: number;
  selectedItem: string;
  onSelect: Dispatch<SetStateAction<string>>;
}) => {
  const { listItems, loop = 2, selectedItem, onSelect } = props;

  const dispatch = useDispatch();

  const { id } = useSelector((store: RootState) => store.user);

  const onPageClick = (id: string) => {
    onSelect(id);
  };

  return (
    <>
      {listItems.map((listItem, idx) => {
        if (listItem.type === 'folder') {
          return (
            <React.Fragment key={idx}>
              <NoteListFolder
                loop={loop}
                initSelectedItem={selectedItem}
                primary={listItem.title}
                listItems={listItem.children}
                onSelect={onSelect}
              />
            </React.Fragment>
          );
        } else {
          return (
            <NavListItemButton
              onSelect={onSelect}
              key={idx}
              loop={loop}
              selected={selectedItem === listItem.id}
              title={listItem.title}
              noteId={listItem.id}
              loginId={id}
            />
          );
        }
      })}
    </>
  );
};

export const MakeNavList = React.memo(MakeNavListContents);
