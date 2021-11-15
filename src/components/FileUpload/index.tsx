import { Tooltip } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import styled from 'styled-components';
import { ChangeEvent } from 'react';

const CustomLabel = styled.label`
  position: relative;
  width: 40px;
  height: 40px;
  input {
    width: 1px;
    height: 1px;
  }

  svg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
`;

export const FileUpload = props => {
  const { setImgSrc } = props;

  const makeBase64 = (image: File): Promise<typeof image> => {
    return new Promise(() => {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = function (event) {
        const target = event.target as FileReader;
        setImgSrc(() => target.result as string);
        return target.result;
      }; // data url!
    });
  };

  const uploadImg = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const files = target.files as FileList;
    makeBase64(files[0]).then(res => console.log(res));
  };

  return (
    <Tooltip title='배경화면 바꾸기' placement='right-start'>
      <CustomLabel>
        <input type='file' onChange={uploadImg} />
        <FileUploadIcon />
      </CustomLabel>
    </Tooltip>
  );
};
