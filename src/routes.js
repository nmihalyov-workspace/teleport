// Config for React Router routes
import React from 'react';

import MainPage from './pages/main.jsx';
import SignupClientPage from './pages/signup-client.jsx';
import SignupAgentPage from './pages/signup-agent.jsx';
import ProfilePage from './pages/profile.jsx';

const routes = [
	{
		path: '/',
    personal: false,
    exact: true,
		page() {
			return (
				<MainPage/>
			);
		}
	},
	{
		path: '/signup',
    personal: false,
    exact: true,
		page() {
			return (
				<SignupClientPage/>
			);
		}
	},
	{
		path: '/signup/agent',
    personal: false,
    exact: true,
		page() {
			return (
				<SignupAgentPage/>
			);
		}
	},
	{
		path: '/personal',
    exact: true,
    personal: true,
		page() {
			return (
				<ProfilePage/>
			);
		}
	}
];

export default routes;