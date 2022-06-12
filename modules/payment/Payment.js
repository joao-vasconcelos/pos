import { styled } from '@stitches/react';

import Pannel from '../../components/Pannel';
import Button from '../../components/Button';

import { useContext, useState } from 'react';
import { GlobalContext } from '../../services/context';
import PaymentOption from './PaymentOption';
import PaidByCash from './methods/cash/PaidByCash';
import PayByCard from './PayByCard';
import PaidByAccount from './methods/account/PaidByAccount';

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

  const { currentOrder, overlay } = useContext(GlobalContext);

  const [selectedPaymentOption, setSelectedPaymentOption] = useState();
  const [selectedOption, setSelectedOption] = useState();

  function handleSelect(value) {
    setSelectedPaymentOption(value);
    setSelectedOption(value);
  }

  function handleInitiatePayment() {
    switch (selectedPaymentOption) {
      case 'card':
        overlay.setComponent(<PayByCard />);
        break;
      case 'cash':
        overlay.setComponent(<PaidByCash />);
        break;
      case 'checking_account':
        overlay.setComponent(<PaidByAccount />);
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
          icon={<BsCreditCardFill />}
          label={'Multibanco'}
          selectedPaymentOption={selectedPaymentOption}
          onSelect={handleSelect}
        />
        <PaymentOption
          value={'cash'}
          icon={<BsCashCoin />}
          label={'Numerário'}
          selectedPaymentOption={selectedPaymentOption}
          onSelect={handleSelect}
        />
        <PaymentOption
          value={'checking_account'}
          icon={<BsBookmarkCheckFill />}
          label={'Conta Corrente'}
          selectedPaymentOption={selectedPaymentOption}
          onSelect={handleSelect}
        />
      </PaymentOptionsContainer>
      <ButtonBar cols={1}>
        <Button disabled={!selectedPaymentOption} onClick={handleInitiatePayment}>
          Finalizar Pagamento
        </Button>
      </ButtonBar>
    </Pannel>
  );
}
