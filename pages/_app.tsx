import { NextPage } from 'next';
import { AppProps } from 'next/dist/shared/lib/router/router';
import { ThemeProvider } from 'styled-components';

import { theme, GlobalStyle } from 'styles';

const WrappedComponent: NextPage<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

export default WrappedComponent;
