import { MouseEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useRouter } from 'next/dist/client/router';

import styled from 'styled-components';

import { NoteList, NoteRenderer } from 'src/container';

import { RootState } from 'src/store/modules';
import { GetServerSideProps } from 'next';
import { NoteService } from 'src/service/note';

const NoteBox = styled.div`
  height: 100vh;
  overflow: hidden;
  display: flex;
  &>div: first-child {
    width: 15%;
    height: 100vh;
    min-width: 261px;
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

const Note = props => {
  const { noteList, noteContent } = props;

  const dispatch = useDispatch();
  const router = useRouter();
  const userData = useSelector((state: RootState) => state.user);

  const makeNewInput = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as Element).classList.contains('backLayer')) {
    }
  };

  const makeNewNote = (initNoteData: { title: string; type: string; id: string }) => {
    const { id, type, title } = initNoteData;
  };

  useEffect(() => {
    if (!userData.id) {
      router.push('/');
      return;
    }
  }, [dispatch, router, userData.id]);

  return (
    <NoteBox>
      <div>
        <NoteList listItems={noteList.list} user={userData} makeNewNote={makeNewNote} />
      </div>
      <div onDoubleClick={makeNewInput} className='backLayer'>
        <NoteRenderer noteItemData={noteContent} />
      </div>
    </NoteBox>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const { params } = context;
  const { noteId, id } = params;

  const noteList = noteId ? await NoteService.getNoteListData(noteId as string) : { list: [] };
  const noteContent =
    id !== '0' ? await NoteService.getNotePageData(id as string, noteId as string) : null;

  return {
    props: { noteList, noteContent }
  };
};

export default Note;
