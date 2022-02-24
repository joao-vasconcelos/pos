import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Kiosk() {
  return (
    <div className={styles.container}>
      <Link href='/pos'>
        <a>Point of Sale</a>
      </Link>
      <br />
      <br />
      <Link href='/dashboard'>
        <a>Dashboard</a>
      </Link>
    </div>
  );
}
