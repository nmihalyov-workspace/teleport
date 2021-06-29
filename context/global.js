import React from 'react';

const globalContext = React.createContext({
  user: {},
  setUser: () => {}
});

export default globalContext;