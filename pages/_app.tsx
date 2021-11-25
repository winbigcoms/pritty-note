import { NextPage } from 'next';
import { AppProps } from 'next/dist/shared/lib/router/router';
import { ThemeProvider } from 'styled-components';

import { theme, GlobalStyle } from 'styles';
import { wrapper } from 'src/store';
import Head from 'next/head';

const WrappedComponent: NextPage<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Pritty Node</title>
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

export default wrapper.withRedux(WrappedComponent);
