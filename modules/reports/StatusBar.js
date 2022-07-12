import { styled } from '@stitches/react';
import { useContext, useState } from 'react';
import { GoLinkExternal, GoRadioTower, GoSync, GoAlert } from 'react-icons/go';
import { Appstate } from '../../context/Appstate';
import SalesReport from './SalesReport';

/* * */
/* POINT OF SALE */
/* Explanation needed. */
/* * */

/* */
/* STYLES */

const Container = styled('div', {
  width: '100%',
  padding: '$sm',
  backgroundColor: '$gray0',
  borderRadius: '$md',
  boxShadow: '$md',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'stretch',
  justifyContent: 'stretch',
  gap: '$sm',
  cursor: 'pointer',
  '&:active': {
    backgroundColor: '$gray6',
  },
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

const StatusWrapper = styled(Wrapper, {
  gap: '$md',
});

const Label = styled('div', {
  textTransform: 'uppercase',
  fontSize: '12px',
  fontWeight: '$medium',
});

const LocationLabel = styled(Label, {
  color: '$success5',
});

const IconWrapper = styled('div', {
  display: 'flex',
  variants: {
    status: {
      ok: {
        color: '$success5',
      },
      error: {
        color: '$danger5',
      },
    },
  },
  defaultVariants: {
    status: 'ok',
  },
});

export default function StatusBar() {
  //

  const appstate = useContext(Appstate);

  const [isConnectionError, setIsConnectionError] = useState(false);
  const [isSyncError, setIsSyncError] = useState(false);

  function handleOpenReport() {
    appstate.setOverlay(<SalesReport />);
  }

  /* */
  /* RENDER */

  return (
    <Container onClick={handleOpenReport}>
      <Wrapper halign={'left'}>
        <GoLinkExternal />
        <Label>Abrir Relatório do Dia</Label>
      </Wrapper>
      <StatusWrapper halign={'right'}>
        <LocationLabel>{appstate.device?.location?.title}</LocationLabel>

        {isConnectionError ? (
          <IconWrapper status={'error'}>
            <GoRadioTower />
          </IconWrapper>
        ) : (
          <IconWrapper status={'ok'}>
            <GoRadioTower />
          </IconWrapper>
        )}

        {isSyncError ? (
          <IconWrapper status={'error'}>
            <GoSync />
          </IconWrapper>
        ) : (
          <IconWrapper status={'ok'}>
            <GoSync />
          </IconWrapper>
        )}
      </StatusWrapper>
    </Container>
  );
}
