import { SWRConfig } from 'swr';
import AppstateProvider from '../context/Appstate';
import CurrentOrderProvider from '../context/CurrentOrder';
import BrowserConfig from '../components/BrowserConfig';
import Refresh from '../components/Refresh.js';

/* * */
/* KIOSK */
/* The app starting point. */
/* * */

/* * */
/* STYLES */

import '../styles/reset.css';

/* * */
/* LOGIC */

export default function Kiosk({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: async (...args) => {
          const res = await fetch(...args);
          return res.json();
        },
        refreshInterval: 5000,
      }}
    >
      <AppstateProvider>
        <CurrentOrderProvider>
          <Refresh />
          <BrowserConfig />
          <Component {...pageProps} />
        </CurrentOrderProvider>
      </AppstateProvider>
    </SWRConfig>
  );
}
