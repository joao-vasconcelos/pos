import { useContext } from 'react';
import { GlobalContext } from './global-context';

export default function addToCurrentOrder(currentOrder, product) {
  console.log('orderManager');

  const temp = Array.from(currentOrder);
  temp.push({ id: Math.random, productTitle: product.title, unitPrice: 18, qty: 2, variationTitle: 'iuhdsiu' });
  return temp;
}
