import { MouseEvent, useState } from 'react';
import { NoteList, NoteRenderer } from 'src/container';
import styled from 'styled-components';

const mockData = [
  {
    type: 'folder',
    title: '중제목1',
    children: [
      {
        type: 'file',
        title: '소제목1',
        id: '1'
      },
      {
        type: 'file',
        title: '소제목2',
        id: '2'
      },
      {
        type: 'folder',
        title: '소제목3',
        children: [
          {
            type: 'file',
            title: '내부소제목1',
            id: '3'
          },
          {
            type: 'file',
            title: '내부소제목2',
            id: '4'
          }
        ]
      }
    ]
  },
  {
    type: 'file',
    title: '소제목3',
    id: '5'
  },
  {
    type: 'file',
    title: '소제목4',
    id: '6'
  },
  {
    type: 'file',
    title: '소제목3',
    id: '15'
  },
  {
    type: 'file',
    title: '소제목4',
    id: '16'
  },
  {
    type: 'file',
    title: '소제목4',
    id: '26'
  },
  {
    type: 'file',
    title: '소제목3',
    id: '125'
  },
  {
    type: 'file',
    title: '생각보다 어렵다',
    id: '126'
  },
  {
    type: 'folder',
    title: '중제목2',
    children: [
      {
        type: 'file',
        title: '소제목1',
        id: '7'
      },
      {
        type: 'file',
        title: '소제목2',
        id: '8'
      },
      {
        type: 'file',
        title: '소제목3',
        id: '9'
      }
    ]
  },
  {
    type: 'folder',
    title: '중제목2',
    children: [
      {
        type: 'file',
        title: '소제목1',
        id: '57'
      },
      {
        type: 'file',
        title: '소제목2',
        id: '58'
      },
      {
        type: 'file',
        title: '소제목3',
        id: '59'
      }
    ]
  }
];

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

  const makeNewInput = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as Element).classList.contains('backLayer')) {
      setNodeData(data => ({
        ...data,
        contents: [
          ...data.contents,
          {
            type: 'input',
            content: '',
            id: `${data.id}-${data.contents.length + 1}`
          }
        ]
      }));
    }
  };

  const didNotWrite = (id: string) => {
    setNodeData(data => ({
      ...data,
      contents: data.contents.filter(item => item.id !== id)
    }));
  };

  const saveTyping = (value: string, id: string) => {
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

  return (
    <NoteBox>
      <div>
        <NoteList listItems={mockData} user={user} />
      </div>
      <div onDoubleClick={makeNewInput} className='backLayer'>
        <NoteRenderer noteItemData={noteData} didNotWrite={didNotWrite} saveTyping={saveTyping} />
      </div>
    </NoteBox>
  );
};

export default Note;
