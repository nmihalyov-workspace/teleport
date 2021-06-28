// Config for React Router routes
import React from 'react';

import MainPage from './pages/main.jsx';
import SignupClientPage from './pages/signup-client.jsx';
import SignupAgentPage from './pages/signup-agent.jsx';
import ProfilePage from './pages/profile.jsx';
import ClientsPage from './pages/clients.jsx';
import RequestPage from './pages/requests.jsx';
import EditRequestPage from './pages/editRequest.jsx';

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
	},
	{
		path: '/personal/clients',
    exact: true,
    personal: true,
		page() {
			return (
				<ClientsPage/>
			);
		}
	},
	{
		path: '/personal/requests',
    exact: true,
    personal: true,
		page() {
			return (
				<RequestPage/>
			);
		}
	},
	{
		path: '/personal/requests/edit',
    exact: true,
    personal: true,
		page() {
			return (
				<EditRequestPage/>
			);
		}
	}
];

export default routes;