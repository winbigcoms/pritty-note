import type { NextPage } from 'next';
import { useState } from 'react';

import { BgBox } from 'src/components';
import { LoginForm } from 'src/container';

const Home: NextPage = () => {
  const [imgSrc, setImgSrc] = useState('');
  return (
    <>
      <BgBox img={imgSrc} setImgSrc={setImgSrc}>
        <LoginForm />
      </BgBox>
    </>
  );
};

export default Home;
