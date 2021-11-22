import { StandardTextFieldProps, TextField, TextFieldProps } from '@mui/material';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

interface InputTextFieldProps extends StandardTextFieldProps {
  didNotWrite?: (id?: string) => void;
  saveTyping?: (value: string, id?: string, type?: string) => void;
  renderDataId: string;
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
  const { didNotWrite, saveTyping, content, renderDataId, ...rest } = props;
  const TextRef = useRef(null);

  const typingHandler = (value: string) => {
    if (!value) {
      didNotWrite && didNotWrite(renderDataId);
      return;
    }
    saveTyping && saveTyping(value, renderDataId);
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
      {...rest}
    />
  );
};
