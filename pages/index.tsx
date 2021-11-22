import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';

import { BgBox } from 'src/components';
import { LoginForm, SignUpForm } from 'src/container';

const Home: NextPage = () => {
  const [imgSrc, setImgSrc] = useState('');
  return (
    <>
      <Head>
        <title>Pritty Node</title>
      </Head>

      <BgBox img={imgSrc} setImgSrc={setImgSrc}>
        <LoginForm />
      </BgBox>
    </>
  );
};

export default Home;
