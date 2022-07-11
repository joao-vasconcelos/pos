import { styled } from '@stitches/react';
import { GoChevronUp } from 'react-icons/go';

/* * */
/* POINT OF SALE */
/* Explanation needed. */
/* * */

/* */
/* STYLES */

const Container = styled('div', {
  width: '100%',
  height: '40px',
  padding: '$sm',
  backgroundColor: '$gray0',
  boxShadow: '$lg',
  borderTopLeftRadius: '$lg',
  borderTopRightRadius: '$lg',
  borderStyle: 'solid',
  borderWidth: '$md',
  borderColor: '$gray0',
  borderBottomWidth: '0',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'stretch',
  justifyContent: 'stretch',
  gap: '$sm',
  cursor: 'pointer',
});

const Wrapper = styled('div', {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '$xs',
  color: '$gray9',
  variants: {
    halign: {
      left: {
        justifyContent: 'left',
      },
      right: {
        justifyContent: 'right',
      },
    },
  },
});

const OpenLabel = styled('div', {
  textTransform: 'uppercase',
  fontSize: '12px',
  fontWeight: '$medium',
});

export default function StatusBar() {
  //

  /* */
  /* RENDER */

  return (
    <Container>
      <Wrapper halign={'left'}>
        <GoChevronUp />
        <OpenLabel>Abrir Visão Geral</OpenLabel>
      </Wrapper>
      <Wrapper halign={'right'}>Icons</Wrapper>
    </Container>
  );
}
