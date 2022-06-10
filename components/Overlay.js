import { styled } from '@stitches/react';
import { useContext } from 'react';
import { GlobalContext } from '../services/context';

/* * */
/* OVERLAY */
/* Explanation needed. */
/* * */

export default function Overlay() {
  //

  /* */
  /* STYLES */

  const Container = styled('div', {
    position: 'fixed',
    top: '0',
    left: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    padding: '50px',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 100,
  });

  /* */
  /* LOGIC */

  const { overlay } = useContext(GlobalContext);

  /* */
  /* RENDER */

  return overlay.component ? <Container>{overlay.component}</Container> : null;
}
