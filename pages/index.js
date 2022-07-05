import { styled } from '@stitches/react';

/* * */
/* IS ERROR */
/* Displays when no 'device_code' is present. */
/* * */

/* */
/* STYLES */

const Container = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  gap: '$lg',
  height: '100vh',
});

const Title = styled('p', {
  fontSize: '30px',
  fontWeight: '$bold',
  textTransform: 'uppercase',
});

const Subtitle = styled('p', {
  fontSize: '20px',
  fontWeight: '$medium',
  textTransform: 'uppercase',
});

/* * */
/* LOGIC */

export default function IsError() {
  return (
    <Container>
      <Title>Invalid Code</Title>
      <Subtitle>Shake your device to fix</Subtitle>
    </Container>
  );
}
