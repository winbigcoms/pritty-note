import { useState } from 'react';

import styled from 'styled-components';
import { List, ListSubheader } from '@mui/material';

import { MakeNavList } from 'src/components';
import { NoteListType } from 'src/type';

const StyledListSubheader = styled(ListSubheader)`
  padding: 10px 0px;
  font-size: 32px !important;
  border-bottom: 1px solid rgb(204, 204, 204) !important;
  font-family: 'Hi Melody', cursive !important;
  height: 60 px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
`;

export const NoteList = (props: NoteListType) => {
  const { listItems, user } = props;
  const [selectedItem, selectItem] = useState('0');

  return (
    <List
      style={{
        borderRight: '1px solid #ccc'
      }}
      subheader={<StyledListSubheader>{user.name}의 노트</StyledListSubheader>}
    >
      <div
        style={{
          overflow: 'auto',
          height: 'calc(100vh - 69px)'
        }}
      >
        <MakeNavList listItems={listItems} initSelectedItem={selectedItem} onSelect={selectItem} />
      </div>
    </List>
  );
};
