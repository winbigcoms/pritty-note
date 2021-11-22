import React, { Dispatch, SetStateAction, useCallback } from 'react';

import styled from 'styled-components';

import { ListItemButton, ListItemText } from '@mui/material';

import { NoteListFolder } from 'src/components';
import { ListItem } from 'src/store/modules/note/model';
import { useDispatch } from 'react-redux';
import { getNotePageRequest } from 'src/store/modules/note/slice';

const StyledListItemText = styled(ListItemText)`
  .css-10hburv-MuiTypography-root {
    font-family: 'Hi Melody', cursive !important;
    font-size: 18px;
  }
`;

const MakeNavListContents = (props: {
  listItems: ListItem[];
  loop?: number;
  initSelectedItem: string;
  onSelect: Dispatch<SetStateAction<string>>;
}) => {
  const { listItems, loop = 2, initSelectedItem, onSelect } = props;
  const dispatch = useDispatch();
  const onPageClick = useCallback(
    (id: string) => {
      dispatch(getNotePageRequest(id));
    },
    [dispatch]
  );

  return (
    <>
      {listItems.map((listItem, idx) => {
        if (listItem.type === 'folder') {
          return (
            <React.Fragment key={idx}>
              <NoteListFolder
                loop={loop}
                initSelectedItem={initSelectedItem}
                primary={listItem.title}
                listItems={listItem.children}
                onSelect={onSelect}
              />
            </React.Fragment>
          );
        } else {
          return (
            <ListItemButton
              sx={{ pl: loop * 2 }}
              key={idx}
              style={{
                height: '60px'
              }}
              selected={initSelectedItem === listItem.id}
              onClick={() => {
                onPageClick(listItem.id);
                onSelect(listItem.id);
              }}
            >
              <StyledListItemText primary={listItem.title} />
            </ListItemButton>
          );
        }
      })}
    </>
  );
};

export const MakeNavList = React.memo(MakeNavListContents);
