import styled from 'styled-components';
import { Dispatch, HTMLAttributes, SetStateAction } from 'react';

import Image from 'next/image';
import { FileUpload } from '../FileUpload';

interface BgBoxProps extends HTMLAttributes<HTMLDivElement> {
  img?: string;
  setImgSrc: Dispatch<SetStateAction<string>>;
}

const Box = styled.div`
  min-width: 1440px;
  width: 100vw;
  height: 100vh;
  position: relative;

  img {
    object-fit: contain;
  }

  & > div {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  & > label {
    position: absolute;
    left: 50px;
    bottom: 50px;
    cursor: pointer;
    border: 1px solid #000;
    box-shadow: 1px 1px 1px;
    transition: all 0.5s;

    &: hover {
      box-shadow: 0px 0px 0px;
    }
  }
`;

export const BgBox = (props: BgBoxProps) => {
  const { img, children, setImgSrc } = props;

  return (
    <Box>
      <Image
        src={img || '/background/bg.png'}
        alt='배경이미지'
        layout='fill'
        priority={img ? false : true}
      />
      <FileUpload setImgSrc={setImgSrc} />
      {children}
    </Box>
  );
};
