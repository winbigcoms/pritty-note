import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';

import { BgBox } from 'src/components';
import { LoginForm } from 'src/container/loginForm';

const Home: NextPage = () => {
  const [imgSrc, setImgSrc] = useState('');
  const [pageType,setPage] = useState('login')
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
