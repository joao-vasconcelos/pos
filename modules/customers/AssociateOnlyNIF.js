import { styled } from '@stitches/react';
import { useContext, useState } from 'react';
import { Appstate } from '../../context/Appstate';
import { CurrentOrder } from '../../context/CurrentOrder';
import Pannel from '../../components/Pannel';
import TextField from '../../components/TextField';
import Button from '../../components/Button';

/* * */
/* ASSOCIATE ONLY NIF */
/* Explanation needed. */
/* * */

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

const Input = styled(TextField, {
  paddingLeft: '30px',
  fontSize: '50px',
  fontWeight: '$bold',
  textAlign: 'center',
  letterSpacing: '15px',
  textTransform: 'uppercase',
});

const NifCountryInput = styled(Input, {
  borderRightWidth: 0,
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
  '&::placeholder': {
    color: '$gray12',
  },
  '&:focus': {
    '&::placeholder': {
      color: 'transparent',
    },
  },
});

const NifNumberInput = styled(Input, {
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
});

/* */
/* LOGIC */

export default function AssociateOnlyNIF() {
  //

  const appstate = useContext(Appstate);
  const currentOrder = useContext(CurrentOrder);

  const [isValidNifCountry, setIsValidNifCountry] = useState(false);
  const [nifCountry, setNifCountry] = useState(currentOrder.customer?.tax_country || '');

  const [isValidNifNumber, setIsValidNifNumber] = useState(false);
  const [nifNumber, setNifNumber] = useState(currentOrder.customer?.tax_number || '');

  function handleAddNif() {
    currentOrder.setCustomer({
      isOnlyNif: true,
      tax_country: nifCountry || 'PT',
      tax_number: nifNumber,
    });
    appstate.setOverlay();
  }

  function handleRemoveNif() {
    currentOrder.setCustomer();
    appstate.setOverlay();
  }

  function handleNifCountryChange({ target }) {
    const regexResult = target.value.match(/^[A-Za-z]+$/); // Only alphabet letters
    target.value = regexResult && regexResult[0] ? regexResult : '';
    target.value = target.value.slice(0, target.maxLength);
    setNifCountry(target.value);
    validateNifCountry(target);
  }

  function validateNifCountry(target) {
    // Checks
    const length = target.value.length == target.maxLength;
    const hasChanged = target.value != currentOrder.customer?.tax_country;
    // Result
    setIsValidNifCountry(length && hasChanged);
  }

  function handleNifNumberChange({ target }) {
    const regexResult = target.value.match(/^[0-9]*$/); // Only numbers
    target.value = regexResult && regexResult[0] ? regexResult : '';
    target.value = target.value.slice(0, target.maxLength);
    setNifNumber(target.value);
    validateNifNumber(target);
  }

  function validateNifNumber(target) {
    // Checks
    const length = target.value.length == target.maxLength;
    const hasChanged = target.value != currentOrder.customer?.tax_number;
    // Result
    setIsValidNifNumber(length && hasChanged);
  }

  /* */
  /* RENDER */

  return (
    <Pannel title={'Add Only NIF'}>
      <Container>
        <NifInputContainer>
          <NifCountryInput
            name={'nifCountry'}
            type={'text'}
            minLength={2}
            maxLength={2}
            placeholder={'PT'}
            value={nifCountry}
            onChange={handleNifCountryChange}
          />
          <NifNumberInput
            name={'nifNumber'}
            type={'number'}
            maxLength={9}
            placeholder={'_________'}
            value={nifNumber}
            onChange={handleNifNumberChange}
          />
        </NifInputContainer>
        {/* <CustomerDetailInput label={'Email'} value={'yushiau'} type={'email'} onChange={({ target }) => console.log(target.value)} editMode={true} /> */}
        {currentOrder.hasCustomer ? (
          <Container>
            <Button onClick={handleAddNif} disabled={!isValidNifCountry && !isValidNifNumber}>
              Atualizar NIF
            </Button>
            <Button color={'danger'} onClick={handleRemoveNif}>
              Remover
            </Button>
          </Container>
        ) : (
          <Button onClick={handleAddNif} disabled={!isValidNifCountry && !isValidNifNumber}>
            Adicionar NIF
          </Button>
        )}
      </Container>
    </Pannel>
  );
}
