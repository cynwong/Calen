import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import MainContent from './Components/common/Main/MainContent'

import AppContext from './utils/AppContext';
import API from './utils/API';

import './App.scss';
import theme from './App.theme';
import useStyles from './App.styles';

function App() {
	const [userInfo, setUserInfo] = useState({
		username: null,
		firstName: null,
		lastName: null,
		events: [],
		settings:{}
	});
	const [showSideBar, setShowSideBar] = useState(false);
	
	const classes = useStyles(theme);

	useEffect(() => {
		// check if user still have valid session.
		API.isLogin()
			.then(({ data: { data: { user } } }) => {
				if (user !== undefined) {
					setUserInfo({...user});
				}
			});
	}, []);

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
			}
		} catch (err) {
			throw err;
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
				const { data } = await API.postNewEvent(updatingEvent);
				await setUserInfo({
					...userInfo,
					events: [...userInfo.events, data]
				});
				return;
			} else {
				const { data } = await API.putEvent(updatingEvent);
				const localEvents = [...userInfo.events].filter((event) => event.id !== data.id);
				await setUserInfo({
					...userInfo,
					events: [...localEvents, data]
				});
			}
		} catch (err) {
			console.error(err);
			throw err;
		}
	};
	
	const deleteEvent = async (id) => {
		try{
			await API.deleteEvent(id);
			await setUserInfo({
				...userInfo,
				events: [...userInfo.events].filter((event) => event.id !== id)
			});
		} catch (err) {
			console.error(err);
			throw err;
		}
	};


	const toggleSideBar = () => setShowSideBar(!showSideBar);
	
	const updateSettings = async (settings) => {
		try {
			if(!settings._id) {
				const { data } = await API.postSettings(settings);
				await setUserInfo({
					...userInfo,
					settings: { ...data }
				});
				return;
			} else {
				const { data } = await API.putSettings(settings);
				await setUserInfo({
					...userInfo,
					settings: { ...data }
				});
			}
		} catch (err) {
			console.error(err);
			throw err;
		}
	}

	const appContextValues = {
		user: userInfo,
		showSideBar,
		classes,
		fnLogin,
		fnLogOut,
		toggleSideBar,
		saveEvent,
		deleteEvent,
		updateSettings
	};

	return (
		<ThemeProvider theme={theme}>
		<AppContext.Provider value={appContextValues} >
			<CssBaseline />
			<div className="wrapper">
				<MainContent />
			</div>
		</AppContext.Provider>
		</ThemeProvider>
	);
}

export default App;
