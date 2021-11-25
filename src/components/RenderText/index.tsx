import { useState } from 'react';
import { InputTextField } from 'src/components';

interface RenderTextProps {
  didNotWrite: (id: string) => void;
  saveTyping: (value: string, id: string, type: string, contentId: string) => void;
  content: string;
  type: string;
  contentId: string;
  renderData: {
    type: string;
    content: string;
    id: string;
  };
}

export const RenderText = (props: RenderTextProps) => {
  const { didNotWrite, saveTyping, content, renderData, type, contentId } = props;

  const [isEdit, setEditState] = useState(false);

  const changeMode = () => {
    setEditState(state => !state);
  };

  const dbClickP = () => {
    changeMode();
  };

  const changeStateDidNotWrite = (id: string) => {
    changeMode();
    didNotWrite(id);
  };
  const changeStateSaveTyping = (value: string, id: string) => {
    changeMode();
    saveTyping(value, id, type, contentId);
  };

  return isEdit ? (
    <InputTextField
      renderDataId={renderData.id}
      didNotWrite={changeStateDidNotWrite}
      saveTyping={changeStateSaveTyping}
      content={content}
    />
  ) : (
    <p onDoubleClick={dbClickP}>{content}</p>
  );
};
