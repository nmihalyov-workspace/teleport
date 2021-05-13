// Config for React Router routes
import React from 'react';

import MainPage from './pages/main.jsx';

const routes = [
	{
		path: '/',
		exact: true,
		page() {
			return (
				<MainPage/>
			);
		}
	}
];

export default routes;