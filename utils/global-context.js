import React from 'react';

const GlobalContext = React.createContext({
  posData: 0,
  update: (data) => {},
});

export default GlobalContext;
