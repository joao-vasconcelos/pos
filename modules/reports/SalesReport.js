import { styled } from '@stitches/react';
import Pannel from '../../components/Pannel';
import { Tabs } from '@mantine/core';

/* * */
/* SALES REPORT */
/* Explanation needed. */
/* * */

/* */
/* STYLES */

const Explanation = styled('div', {
  fontSize: '12px',
});

/* */
/* LOGIC */

export default function SalesReport() {
  return (
    <Pannel title={'Relatório de Vendas'}>
      <Tabs color='dark' variant='pills'>
        <Tabs.Tab label='Gallery'>Gallery tab content</Tabs.Tab>
        <Tabs.Tab label='Messages'>Messages tab content</Tabs.Tab>
        <Tabs.Tab label='Settings'>Settings tab content</Tabs.Tab>
      </Tabs>
    </Pannel>
  );
}
