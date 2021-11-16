import { TextField } from '@mui/material';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

interface InputTextFieldProps {
  didNotWrite: (id: string) => void;
  saveTyping: (value: string, id: string) => void;
  renderData: {
    type: string;
    content: string;
    id: string;
  };
  content?: string;
}

const StyledTextField = styled(TextField)`
  width: 100%;
  input {
    padding: 5px 0px 0px 10px;
    height: 26px;
    margin: 2px 0px 7px;
  }
`;

export const InputTextField = (props: InputTextFieldProps) => {
  const { didNotWrite, saveTyping, content, renderData } = props;
  const TextRef = useRef(null);

  const typingHandler = (value: string) => {
    if (!value) {
      didNotWrite(renderData.id);
    }
    saveTyping(value, renderData.id);
  };

  const onEndTyping = e => {
    typingHandler(e.target.value);
  };
  const onPressEnter = e => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      typingHandler(TextRef.current.value);
    }
  };

  useEffect(() => {
    (TextRef.current as HTMLInputElement).focus();
  }, []);

  return (
    <StyledTextField
      inputRef={TextRef}
      onBlur={onEndTyping}
      defaultValue={content}
      onKeyPress={onPressEnter}
    />
  );
};
