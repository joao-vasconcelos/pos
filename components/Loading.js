import { styled } from '@stitches/react';
import Animation from './Animation';

/* * */
/* LOADING */
/* Explanation needed. */
/* * */

export default function Loading() {
  //

  /* */
  /* STYLES */

  const Container = styled('div', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  });

  /* */
  /* RENDER */

  return (
    <Container>
      <Animation name={'loading-dots'} />
    </Container>
  );
}
