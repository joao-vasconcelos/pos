import { styled } from '../stitches.config';

export default styled('div', {
  display: 'grid',
  placeItems: 'stretch',
  placeContent: 'stretch',
  gridTemplateColumns: '3fr minmax(35%, 1fr)',
  gap: '$md',
});
