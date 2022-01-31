import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Register</title>
        <meta name='apple-mobile-web-app-title' content='Register' />
        <meta name='application-name' content='Register' />
        <meta name='description' content='CHEF POINT Register Terminal' />
        <meta name='msapplication-TileColor' content='#ffffff' />
        <meta name='theme-color' content='#ffffff' />
        <link rel='icon' href='/favicon.ico' />
        <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
        <link rel='manifest' href='/site.webmanifest' />
        <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#ff0000' />
      </Head>

      <main className={styles.main}>
        <div className={styles.grid}>
          <Link href='/pos'>
            <a className={styles.card}>
              <h2>Register Home &rarr;</h2>
              <p>Find in-depth information about Next.js features and API.</p>
            </a>
          </Link>
        </div>
      </main>
    </div>
  );
}
