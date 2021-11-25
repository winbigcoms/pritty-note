import { useEffect, useState } from 'react';

import styled from 'styled-components';

import { Painting, InputTextField, RenderText } from 'src/components';

import { NoteItemData } from 'src/type';
import { NoteHome } from '..';

interface NoteRendererProps {
  noteItemData: NoteItemData | undefined;
}

const NoteRenderContainer = styled.div`
  margin: auto;
  width: 70%;

  h2 {
    font-size: 32px;
    margin-bottom: 30px;
  }

  p {
    font-size: 18px;
    height: 40px;
    display: flex;
    align-items: center;
  }
`;

export const NoteRenderer = (props: NoteRendererProps) => {
  const { noteItemData } = props;
  const [noteItemState, setNoteItemState] = useState<NoteItemData>();

  const didNotWrite = (id: string) => {
    setNoteItemState(data => ({
      ...data,
      contents: data.contents.filter(item => item.id !== id)
    }));
  };

  const saveTyping = (value: string, id: string, type: string, contentId: string) => {
    setNoteItemState(data => {
      return {
        ...data,
        [type]:
          type === 'title'
            ? value
            : data.contents.map((contentsData, idx) => {
                if (contentsData.id === id) {
                  return {
                    type: 'text',
                    content: value,
                    id: `${data.id}-${idx}`
                  };
                }
                return contentsData;
              })
      };
    });
  };

  useEffect(() => {
    setNoteItemState(noteItemData);
  }, [noteItemData]);

  if (!noteItemData) {
    return (
      <NoteRenderContainer>
        <NoteHome />
      </NoteRenderContainer>
    );
  }

  return noteItemState ? (
    <NoteRenderContainer>
      <h2>제목: {noteItemState.title}</h2>
      {noteItemState.contents.map((contentData, idx) => {
        if (contentData.type === 'text') {
          return (
            <RenderText
              type='contents'
              key={idx}
              content={contentData.content}
              contentId={contentData.id}
              saveTyping={saveTyping}
              didNotWrite={didNotWrite}
              renderData={contentData}
            />
          );
        } else if (contentData.type === 'paint') {
          return <Painting key={idx} width={400} height={400} />;
        }
      })}
    </NoteRenderContainer>
  ) : (
    <div>로딩중</div>
  );
};
