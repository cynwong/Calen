import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './Components/NavBar/Header';
import Home from './Components/Pages/Home';
import SignUp from './Components/Pages/SignUp';

import AppContext from './utils/AppContext';
import API from './utils/API';

import './App.scss';

function App() {
	const [login, setLogin] = useState({
		username: undefined,
		firstName: undefined,
		lastName: undefined,
		token: undefined
	});
	// const [error, setError] = useState('');
	const fnLogin = async (username, password) => {
		try {
			const { data: { success, user } } = await API.login(username, password);
			if(success) {
				setLogin({
					username: user.username,
					firstName: user.firstName,
					lastName: user.lastName
				});
			}
		} catch (err) {
			console.error(err); //TODO
		}
	}
	const fnLogOut = async () => {
		try {
			console.log('log out')
			const { data: { success } } = await API.logOut();
			if (success) {
				setLogin({
					username: undefined,
					firstName: undefined,
					lastName: undefined,
					token: undefined
				});
			}
		} catch (error) {
			console.log(error);
		}
	}
	const appContextValues = {
		user: login,
		fnLogin,
		fnLogOut
	};
	return (
		<AppContext.Provider value={appContextValues} >
			<div className="wrapper">
				<Router>
					<Header />
					<main>
						<Route exact path='/' component={Home} />
						<Route exact path='/signup' component={SignUp} />
					</main>
				</Router>
			</div>
		</AppContext.Provider>
	);
}

export default App;
