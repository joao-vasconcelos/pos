import { styled } from '@stitches/react';

import Pannel from '../../components/Pannel';
import Button from '../../components/Button';

import { useContext, useState } from 'react';
import { Appstate } from '../../context/Appstate';
import { CurrentOrder } from '../../context/CurrentOrder';
import PaymentOption from './PaymentOption';
import PaymentStart from './PaymentStart';
import SelectCheckingAccount from './SelectCheckingAccount';

import { BsCreditCardFill, BsCashCoin, BsBookmarkCheckFill } from 'react-icons/bs';
import ButtonBar from '../../components/ButtonBar';

/* * */
/* PAYMENT */
/* Explanation needed. */
/* * */

/* */
/* STYLES */

const OrderTotal = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '60px',
  color: '$primary5',
  fontWeight: '$bold',
  margin: '0 -$md',
  padding: '$lg',
  paddingTop: '$md',
  borderBottomWidth: '2px',
  borderBottomStyle: 'solid',
  borderBottomColor: '$gray7',
});

const PaymentOptionsContainer = styled('div', {
  display: 'grid',
  gap: '$md',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gridTemplateRows: '180px',
  minWidth: '750px',
  margin: '$md 0',
});

/* */
/* LOGIC */

export default function Payment() {
  //

  const appstate = useContext(Appstate);
  const currentOrder = useContext(CurrentOrder);

  const [selectedPaymentOption, setSelectedPaymentOption] = useState();

  function handleSelect(payment) {
    setSelectedPaymentOption(payment);
  }

  function handleInitiatePayment() {
    switch (selectedPaymentOption.method_value) {
      case 'card':
      case 'cash':
        currentOrder.setPayment(selectedPaymentOption);
        appstate.setOverlay(<PaymentStart />);
        break;
      case 'checking_account':
        currentOrder.setPayment(selectedPaymentOption);
        appstate.setOverlay(<SelectCheckingAccount />);
        break;
      default:
        break;
    }
  }

  return (
    <Pannel title={'Total Final'}>
      <OrderTotal>{currentOrder.totals.total.toFixed(2) + '€'}</OrderTotal>
      <PaymentOptionsContainer>
        <PaymentOption
          value={'card'}
          label={'Multibanco'}
          icon={<BsCreditCardFill />}
          selectedPaymentOption={selectedPaymentOption}
          onSelect={handleSelect}
        />
        <PaymentOption
          value={'cash'}
          label={'Numerário'}
          icon={<BsCashCoin />}
          selectedPaymentOption={selectedPaymentOption}
          onSelect={handleSelect}
        />
        <PaymentOption
          value={'checking_account'}
          label={'Conta Corrente'}
          icon={<BsBookmarkCheckFill />}
          selectedPaymentOption={selectedPaymentOption}
          onSelect={handleSelect}
        />
      </PaymentOptionsContainer>
      <ButtonBar cols={1}>
        <Button disabled={!selectedPaymentOption} onClick={handleInitiatePayment}>
          {selectedPaymentOption?.method_value == 'checking_account' ? 'Selecionar Conta' : 'Finalizar Pagamento'}
        </Button>
      </ButtonBar>
    </Pannel>
  );
}
