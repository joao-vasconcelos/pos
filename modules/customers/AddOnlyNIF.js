import { styled } from '@stitches/react';
import { useContext } from 'react';
import { GlobalContext } from '../../services/context';
import Pannel from '../../components/Pannel';
import Button from '../../components/Button';

/* * */
/* ADD ONLY NIF */
/* Explanation needed. */
/* * */

export default function AddOnlyNIF() {
  //

  /* */
  /* STYLES */

  const Container = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '$md',
  });

  const NifInputContainer = styled('div', {
    display: 'grid',
    gridTemplateColumns: '150px 500px',
  });

  const Input = styled('input', {
    padding: '15px',
    paddingLeft: '30px',
    fontSize: '50px',
    fontWeight: '$bold',
    backgroundColor: '$gray4',
    borderWidth: '$md',
    borderStyle: 'solid',
    borderColor: '$gray7',
    outline: 'none',
    textAlign: 'center',
    letterSpacing: '15px',
    textTransform: 'uppercase',
    borderSpacing: '0',
    margin: '0',
    borderRadius: '$md',
    '&:focus': {
      '&::placeholder': {
        color: 'transparent',
      },
    },
    '&::placeholder': {
      color: '$gray10',
    },
  });

  const NifCountryInput = styled(Input, {
    borderRightWidth: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    '&::placeholder': {
      color: '$gray12',
    },
  });

  const NifNumberInput = styled(Input, {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  });

  /* */
  /* LOGIC */

  const { currentOrder, overlay } = useContext(GlobalContext);

  function handleAddNif(event) {
    event.preventDefault();

    const nifCountry = event.target.nifCountry;
    const nifNumber = event.target.nifNumber;

    if (nifCountry.value.length > 0 && nifCountry.value.length < nifCountry.maxLength) return;
    if (nifNumber.value.length != nifNumber.maxLength) return;

    currentOrder.setCustomer({
      onlyNif: true,
      tax: {
        country: nifCountry.value || 'PT',
        number: nifNumber.value,
      },
    });

    overlay.setComponent();
  }

  function handleRemoveNif() {
    currentOrder.setCustomer();
    overlay.setComponent();
  }

  /* */
  /* RENDER */

  return (
    <Pannel title={'Add Only NIF'}>
      <form onSubmit={handleAddNif}>
        <Container>
          <NifInputContainer>
            <NifCountryInput
              name={'nifCountry'}
              type={'text'}
              minLength={2}
              maxLength={2}
              defaultValue={currentOrder.customer ? currentOrder.customer.tax.country : ''}
              placeholder={'PT'}
              onChange={({ target }) => {
                const regexResult = target.value.match(/^[A-Za-z]+$/);
                target.value = regexResult && regexResult[0] ? regexResult : '';
              }}
            />
            <NifNumberInput
              name={'nifNumber'}
              type={'number'}
              maxLength={9}
              placeholder={'_________'}
              required
              defaultValue={currentOrder.customer ? currentOrder.customer.tax.number : ''}
              onChange={({ target }) => (target.value = target.value.slice(0, target.maxLength))}
            />
          </NifInputContainer>
          {currentOrder.customer ? (
            <Container>
              <Button color={'secondary'}>Atualizar NIF</Button>
              <Button color={'danger'} onClick={handleRemoveNif}>
                Remover
              </Button>
            </Container>
          ) : (
            <Button>Adicionar NIF</Button>
          )}
        </Container>
      </form>
    </Pannel>
  );
}
