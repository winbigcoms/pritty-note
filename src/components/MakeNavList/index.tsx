import React, { Dispatch, SetStateAction } from 'react';

import styled from 'styled-components';

import { ListItemButton, Collapse, ListItemText } from '@mui/material';

import { ListItem } from 'src/type';
import { NoteListFolder } from 'src/components';

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

  return (
    <>
      {loop === 2 && (
        <ListItemButton
          selected={initSelectedItem === '0'}
          onClick={() => {
            onSelect('0');
          }}
        >
          Home
        </ListItemButton>
      )}
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
                height: '50px'
              }}
              selected={initSelectedItem === listItem.id}
              onClick={() => {
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
