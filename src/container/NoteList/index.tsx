import { ChangeEvent, useState } from 'react';

import styled from 'styled-components';
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Radio,
  RadioGroup
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { InputTextField, MakeNavList } from 'src/components';
import { NoteListType } from 'src/type';
import { useDispatch } from 'react-redux';
import { resetNotePage } from 'src/store/modules/note/slice';
import { useRouter } from 'next/dist/client/router';

const StyledListSubheader = styled(ListSubheader)`
  width: 100%;
  padding: 10px 0px;
  font-size: 32px !important;
  border-bottom: 1px solid rgb(204, 204, 204) !important;
  font-family: 'Hi Melody', cursive !important;
  height: 60 px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
`;

const StyledLastListItemText = styled(ListItemText)`
  .css-10hburv-MuiTypography-root {
    font-family: 'Hi Melody', cursive !important;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const NewNoteButtonMakerContainer = styled.div`
  position: sticky;
  bottom: 0;
`;

const NewNoteContainer = styled.div`
  padding: 10px;
  display: flex;
  position: absolute;
  bottom: 60px;
  background-color: #fff;
  justify-content: center;
  border-top: 1px solid #000;
  align-items: center;
  flex-wrap: wrap;
  & > div {
    width: 65%;
  }

  & label {
    margin: 0px;
    & > span {
      padding: 2px 8px;
    }
  }
`;

const MakeNewNoteButton = styled(ListItemButton)`
  background-color: #fff;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;

  &: hover {
    background-color: #fff !important;
  }
`;

const SaveNewNoteButton = styled(Button)`
  margin-top: 10px !important;
  width: 100%;
`;

export const NoteList = (props: NoteListType) => {
  const { listItems, user, makeNewNote } = props;
  const [showNewNoteMaker, setShowNewNoteMaker] = useState(false);
  const [selectedItem, selectItem] = useState('0');
  const [newNoteData, setNewNoteData] = useState({
    type: 'flie',
    title: ''
  });

  const dispatch = useDispatch();
  const router = useRouter();

  const onShowNewNoteMaker = () => {
    setShowNewNoteMaker(state => !state);
  };

  const onChangeNewNoteType = (e: ChangeEvent<HTMLInputElement>) => {
    setNewNoteData(state => ({
      ...state,
      type: e.target.value
    }));
  };

  const saveTyping = (value: string) => {
    setNewNoteData(state => ({ ...state, title: value }));
  };

  const onSaveNewNoteClick = () => {
    makeNewNote({
      title: newNoteData.title,
      type: newNoteData.type,
      id: listItems.length !== 0 ? listItems[listItems.length - 1].id + 1 : '1'
    });

    setShowNewNoteMaker(false);
  };

  const onClickHome = () => {
    dispatch(resetNotePage());
  };

  const onSelectPage = (loginId, pageId) => {
    router.push(`/note/${loginId}/${pageId}`);
  };

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
        <ListItemButton
          selected={selectedItem === '0'}
          onClick={() => {
            onSelectPage(user.id, '0');
            selectItem('0');
          }}
        >
          Home
        </ListItemButton>
        <MakeNavList listItems={listItems} selectedItem={selectedItem} onSelect={selectItem} />
        <NewNoteButtonMakerContainer>
          {showNewNoteMaker && (
            <NewNoteContainer>
              <InputTextField
                renderDataId={listItems.length !== 0 ? listItems[listItems.length - 1].id + 1 : '1'}
                placeholder='노트의 이름을 주세요'
                saveTyping={saveTyping}
              />
              <FormControl component='fieldset'>
                <RadioGroup
                  aria-label='gender'
                  name='controlled-radio-buttons-group'
                  value={newNoteData.type}
                  onChange={onChangeNewNoteType}
                >
                  <FormControlLabel value='file' control={<Radio />} label='파일' />
                  <FormControlLabel value='folder' control={<Radio />} label='폴더' />
                </RadioGroup>
              </FormControl>
              <SaveNewNoteButton onClick={onSaveNewNoteClick} variant='outlined'>
                저장하기
              </SaveNewNoteButton>
            </NewNoteContainer>
          )}
          <MakeNewNoteButton onMouseDown={onShowNewNoteMaker}>
            <StyledLastListItemText
              primary={
                <>
                  노트 쓰기
                  <AddCircleOutlineIcon sx={{ ml: 2 }} />
                </>
              }
            />
          </MakeNewNoteButton>
        </NewNoteButtonMakerContainer>
      </div>
    </List>
  );
};
