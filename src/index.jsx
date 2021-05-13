// Renders whole application
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

import './index.sass';

import store from './store';

import App from './components/App';

ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.querySelector('.root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
serviceWorker.unregister();