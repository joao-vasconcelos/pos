import { SWRConfig } from 'swr';
import fetch from '../libs/fetch.js';
import GlobalProvider from '../utils/global-context';
import BrowserConfig from '../utils/BrowserConfig';
import Refresh from '../utils/Refresh.js';

// Styles
import '../styles/globals.css';
import '../styles/icons.css';

export default function Register({ Component, pageProps }) {
  return (
    <SWRConfig value={{ fetcher: fetch, refreshInterval: 1000 }}>
      <GlobalProvider>
        <BrowserConfig />
        <Refresh />
        <Component {...pageProps} />
      </GlobalProvider>
    </SWRConfig>
  );
}
