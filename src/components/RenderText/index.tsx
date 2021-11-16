import { useState } from 'react';
import { InputTextField } from 'src/components';

interface RenderTextProps {
  didNotWrite: (id: string) => void;
  saveTyping: (value: string, id: string) => void;
  content: string;
  renderData: {
    type: string;
    content: string;
    id: string;
  };
}

export const RenderText = (props: RenderTextProps) => {
  const { didNotWrite, saveTyping, content, renderData } = props;

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
    saveTyping(value, id);
  };

  return isEdit ? (
    <InputTextField
      renderData={renderData}
      didNotWrite={changeStateDidNotWrite}
      saveTyping={changeStateSaveTyping}
      content={content}
    />
  ) : (
    <p onDoubleClick={dbClickP}>{content}</p>
  );
};
