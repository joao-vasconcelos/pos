import useSWR from 'swr';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { GlobalContext } from '../services/context';
import { styled } from '@stitches/react';
import pjson from '../package.json';

const AppVersion = styled('div', {
  position: 'fixed',
  bottom: '0',
  width: '100%',
  textAlign: 'center',
  padding: '$lg',
  color: '$gray10',
  fontSize: '12px',
  fontWeight: '$medium',
  textTransform: 'uppercase',
});

export default function Refresh() {
  const router = useRouter();
  const { data: version } = useSWR('/api/version');
  const { currentOrder } = useContext(GlobalContext);

  if (version) {
    if (version.latest != pjson.version) {
      if (!currentOrder.items.length) {
        router.reload();
      }
    }
  }

  return <AppVersion>Version {version ? version.latest : 'loading'}</AppVersion>;
}
