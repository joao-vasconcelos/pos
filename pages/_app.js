import { SWRConfig } from 'swr';
import fetch from '../libs/fetch.js';

import BrowserConfig from '../components/browserConfig/BrowserConfig';

import '../styles/globals.css';

import GlobalProvider from '../utils/global-context';

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig value={{ fetcher: fetch, refreshInterval: 1000 }}>
      <GlobalProvider>
        <BrowserConfig />
        <Component {...pageProps} />;
      </GlobalProvider>
    </SWRConfig>
  );
}

export default MyApp;
