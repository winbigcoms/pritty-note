import { MouseEvent } from 'react';

import styled from 'styled-components';

import { Painting, InputTextField, RenderText } from 'src/components';

import { NoteItemData } from 'src/type';

interface NoteRendererProps {
  saveTyping: (value: string, id: string) => void;
  noteItemData: NoteItemData;
  didNotWrite: (id: string) => void;
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
  const { noteItemData, didNotWrite, saveTyping } = props;

  return (
    <NoteRenderContainer>
      <h2>제목: {noteItemData.title}</h2>
      {noteItemData.contents.map((contentData, idx) => {
        if (contentData.type === 'text') {
          return (
            <RenderText
              content={contentData.content}
              saveTyping={saveTyping}
              didNotWrite={didNotWrite}
              renderData={contentData}
            />
          );
        } else if (contentData.type === 'paint') {
          return <Painting key={idx} width={400} height={400} />;
        } else {
          return (
            <InputTextField
              key={idx}
              saveTyping={saveTyping}
              didNotWrite={didNotWrite}
              renderData={contentData}
            />
          );
        }
      })}
    </NoteRenderContainer>
  );
};
