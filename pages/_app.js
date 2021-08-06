import { Provider } from 'react-redux';
import store from '../store';

import '../styles/globals.css'
import '../static/sass/_base.sass'

const Teleport = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default Teleport;