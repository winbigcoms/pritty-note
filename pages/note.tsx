import { MouseEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useRouter } from 'next/dist/client/router';

import styled from 'styled-components';

import { NoteList, NoteRenderer } from 'src/container';

import { RootState } from 'src/store/modules';
import { ListItem } from 'src/store/modules/note/model';
import { getNoteListRequest } from 'src/store/modules/note/slice';

const selectedItemData = {
  title: '생각보다 어렵다',
  type: 'file',
  id: '126',
  contents: [
    {
      type: 'text',
      content: 'sdfsdfasfdsfsf',
      id: '126-0'
    },
    {
      type: 'paint',
      content: '',
      id: '126-1'
    }
  ]
};

const user = {
  name: '백승일',
  id: 'lifeWater'
};

const NoteBox = styled.div`
  height: 100vh;
  overflow: hidden;
  display: flex;
  &>div: first-child {
    width: 15%;
    height: 100vh;
  }

  &>div: nth-child(2) {
    width: 85%;
    padding: 30px;
    height: 100vh;
  }

  .MuiListItemButton-gutters {
    height: 60px;
  }
`;

const Note = () => {
  const [noteData, setNodeData] = useState(selectedItemData);

  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.user);
  const { list, contents } = useSelector((state: RootState) => state.note);
  const router = useRouter();

  const makeNewInput = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as Element).classList.contains('backLayer')) {
    }
  };

  const makeNewNote = (initNoteData: { title: string; type: string; id: string }) => {
    const { id, type, title } = initNoteData;
  };

  const didNotWrite = (id: string) => {
    setNodeData(data => ({
      ...data,
      contents: data.contents.filter(item => item.id !== id)
    }));
  };

  const saveTyping = (value: string, id: string, type?: string) => {
    setNodeData(data => ({
      ...data,
      contents: data.contents.map((contentsData, idx) => {
        if (contentsData.id === id) {
          return {
            type: 'text',
            content: value,
            id: `${data.id}-${idx}`
          };
        }
        return contentsData;
      })
    }));
  };

  useEffect(() => {
    if (!userData.id) {
      router.push('/');
      return;
    }
    dispatch(getNoteListRequest());
  }, [dispatch, router, userData.id]);

  return (
    <NoteBox>
      <div>
        <NoteList listItems={list} user={user} makeNewNote={makeNewNote} />
      </div>
      <div onDoubleClick={makeNewInput} className='backLayer'>
        <NoteRenderer noteItemData={contents} didNotWrite={didNotWrite} saveTyping={saveTyping} />
      </div>
    </NoteBox>
  );
};

export default Note;
