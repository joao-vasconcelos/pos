import { SWRConfig } from 'swr';
import fetch from '../libs/fetch.js';

import BrowserConfig from '../components/browserConfig/BrowserConfig';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig value={{ fetcher: fetch, refreshInterval: 1000 }}>
      <BrowserConfig />
      <Component {...pageProps} />;
    </SWRConfig>
  );
}

export default MyApp;
