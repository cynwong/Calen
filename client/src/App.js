import React, { useState } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Header from './Components/NavBar/Header';
import Home from './Components/Pages/Home';
import SignUp from './Components/Pages/SignUp';
import DashBoard from './Components/Pages/DashBoard/DashBoard';

import AppContext from './utils/AppContext';
import API from './utils/API';

import './App.scss';

function App() {
	const [userInfo, setUserInfo] = useState({
		username: null,
		firstName: null,
		lastName: null,
	});
	
	// const [error, setError] = useState('');
	const fnLogin = async (username, password) => {
		try {
			const { data: { success, user } } = await API.login(username, password);
			if(success) {
				setUserInfo({
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
			const { data: { success } } = await API.logOut();
			if (success) {
				setUserInfo({
					username: null,
					firstName: null,
					lastName: null,
				});
				
			}
		} catch (error) {
			console.log(error);
		}
	}
	const appContextValues = {
		user: userInfo,
		fnLogin,
		fnLogOut
	};
	return (
		<AppContext.Provider value={appContextValues} >
			<div className="wrapper">
				<Router>
					<Header />
					<main>
						<Switch>
							<Route exact path='/' component={Home} />
							{/* Access after user login */}
							{userInfo.username && <Route exact path='/dashboard' component={DashBoard} />}
							{/* Access if no user */}
							{!userInfo.username && <Route exact path='/signup' component={SignUp} />}
							{!userInfo.username && 
								<Redirect 
									from="/dashboard" 
									to={{
										pathname: "/",
										state: { userInfo }
									}}
									push
									exact
								/>}
						</Switch>
					</main>
				</Router>
			</div>
		</AppContext.Provider>
	);
}

export default App;
