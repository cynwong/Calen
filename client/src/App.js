import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';

import Header from './Components/NavBar/Header/Header';
import Home from './Components/Pages/Home/Home.page';
import SignUp from './Components/Pages/SignUp/SignUp.page';
import DashBoard from './Components/Pages/DashBoard/DashBoard.page';

import AppContext from './utils/AppContext';
import API from './utils/API';

import './App.scss';
import theme from './App.theme';

function App() {
	const [userInfo, setUserInfo] = useState({
		username: null,
		firstName: null,
		lastName: null,
		events: [],
	});
	
	const fnLogin = async (username, password) => {
		try {
			const { data: { success, user } } = await API.login(username, password);
			if(success) {
				setUserInfo({
					username: user.username,
					firstName: user.firstName,
					lastName: user.lastName,
					events: user.events ? user.events: []
				});
				return;
			}
		} catch (err) {
			console.error(err); //TODO
			return err;
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
				return;
			}
		} catch (err) {
			console.error(err);
			return err;
		}
	}

	const saveEvent = async (updatingEvent) => {
		try {
			if(!updatingEvent._id) {
				const newEvent = await API.postNewEvent(updatingEvent);
				setUserInfo({
					...userInfo,
					events: [...userInfo.events, newEvent]
				});
				return;
			} else {
				console.log("updating"); // TODO
				// delete updatingEvent.isNew; 
				// const event = await API.putEvent(updatingEvent);

			}
		} catch (err) {
			console.error(err);
			return err;
		}
	};

	const appContextValues = {
		user: userInfo,
		saveEvent,
		fnLogin,
		fnLogOut,
	};
	return (
		<ThemeProvider theme={theme}>
		<AppContext.Provider value={appContextValues} >
			<div className="wrapper">
				<Router>
					<Header />
					<main>
						<Switch>
							<Route exact path='/' component={Home} />
							{
								userInfo.username ? (
									[
										<Route exact path='/dashboard' key='dashboard' component={DashBoard} />,
									]
								) : (
									<Route exact path='/signup' component={SignUp} />
								)
							}
							
						</Switch>
					</main>
				</Router>
			</div>
		</AppContext.Provider>
		</ThemeProvider>
	);
}

export default App;
