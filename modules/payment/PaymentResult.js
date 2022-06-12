import { styled } from '@stitches/react';
import Pannel from '../../components/Pannel';
import Button from '../../components/Button';
import { useContext, useEffect } from 'react';
import { GlobalContext } from '../../services/context';
import ButtonBar from '../../components/ButtonBar';

/* * */
/* PAYMENT RESULT */
/* Explanation needed. */
/* * */

/* */
/* STYLES */

const Container = styled('div', {
  margin: '0 -$md',
  padding: '30px',
  paddingTop: '$md',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$md',
  minWidth: '400px',
  minHeight: '200px',
});

const Text = styled('div', {
  color: '$gray10',
  variants: {
    color: {
      success: {
        color: '$success5',
      },
      danger: {
        color: '$danger5',
      },
    },
  },
});

const Title = styled(Text, {
  fontSize: '60px',
  fontWeight: '$bold',
});

const Subtitle = styled(Text, {
  fontSize: '15px',
  fontWeight: '$medium',
  textTransform: 'uppercase',
});

/* */
/* LOGIC */

export default function PaymentResult({ color, title, subtitle }) {
  //

  const { overlay } = useContext(GlobalContext);

  useEffect(() => {
    if (color == 'success') {
      setTimeout(() => overlay.setComponent(), 1000);
    }
  }, [color, overlay]);

  return (
    <Pannel>
      <Container>
        <Title color={color}>{title}</Title>
        <Subtitle color={color}>{subtitle}</Subtitle>
        {color == 'danger' && <Subtitle>Ou entre em contacto com o suporte</Subtitle>}
      </Container>
      {color == 'danger' && (
        <ButtonBar cols={1}>
          <Button color={'secondary'} onClick={() => overlay.setComponent()}>
            OK
          </Button>
        </ButtonBar>
      )}
    </Pannel>
  );
}
