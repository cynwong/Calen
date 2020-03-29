import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { Cookies } from 'react-cookie';

import { initDB, useIndexedDB } from 'react-indexed-db';
import { indexDBConfig } from './config/indexDBConfig';

import MainContent from './Components/common/Main/MainContent'

import AppContext from './utils/AppContext';
import API from './utils/API';

import './App.scss';
import theme from './App.theme';
import useStyles from './App.styles';

initDB(indexDBConfig);

function App() {
	const [userInfo, setUserInfo] = useState({
		username: null,
		firstName: null,
		lastName: null,
		events: [],
		settings:{}
	});
	const [showSideBar, setShowSideBar] = useState(false);
	const [offlineNoData, setOfflineNoData] = useState(false);
	
	const classes = useStyles(theme);
	
	// for offline
	const cookies = instanceOf(Cookies).isRequired;
	const { getAll, add } = useIndexedDB('calen');

	// set user info to state
	const setUserData = (data) => {
		setUserInfo(data);
		cookies.set('calen88', JSON.stringify(data), { path: '/' });
	}
	
	useEffect(() => {
		// check if user still have valid session.
		API.isLogin()
			.then(({data}) => {
				if("data" in data) {
					const { user } = data.data;
					if (user !== undefined) {
						setUserData({...user});
					}
				}
				// check if indexDB has data
				getAll()
					.then(data => {
						const promises = data.map(({action, d}) => {
							const parsedData = JSON.parse(d);
							if (action === 'push') {
								return API.postNewEvent(parsedData);
							} else if (action === 'delete') {
								return API.deleteEvent(parsedData.id);
							} 
							return API.putEvent(parsedData);
						});
						Promise.all(promises)
							.then(() => {
								API.getAllEvents()
									.then(({data: {events}}) => {
										setUserData({
											...userInfo,
											events,
										});
									});
							});
					});

			})
			.catch((err) => {
				// check if we have data in cookie
				const userInCookie = cookies.get('calen88');
				if (userInCookie === undefined) {
					setOfflineNoData(true);
				} else {
					setUserInfo({ ...userInCookie });
				}
			});
	}, []);

	const fnLogin = async (username, password) => {
		try {
			const { data: { success, user } } = await API.login(username, password);
			if(success) {
				setUserData({
					username: user.username,
					firstName: user.firstName,
					lastName: user.lastName,
					events: user.events ? user.events: []
				});
			}
		} catch (err) {
			throw err;
			setOfflineNoData(true);
		}
	}
	const fnLogOut = async () => {
		try {
			const { data: { success } } = await API.logOut();
			if (success) {
				setUserData({
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
				await setUserData({
					...userInfo,
					events: [...userInfo.events, data]
				});
				return;
			} else {
				const { data } = await API.putEvent(updatingEvent);
				const localEvents = [...userInfo.events].filter((event) => event.id !== data.id);
				await setUserData({
					...userInfo,
					events: [...localEvents, data]
				});
			}
		} catch (err) {
			console.error(err);
			// throw err;
			let action= updatingEvent.id ? 'put' : 'push';
			await add({action, data: JSON.stringify(updatingEvent)});
		}
	};
	
	const deleteEvent = async (id) => {
		try{
			await API.deleteEvent(id);
			await setUserData({
				...userInfo,
				events: [...userInfo.events].filter((event) => event.id !== id)
			});
		} catch (err) {
			console.error(err);
			// throw err;
			await add({action:'delete', data: JSON.stringify(updatingEvent)});
		}
	};


	const toggleSideBar = () => setShowSideBar(!showSideBar);
	
	const updateSettings = async (settings) => {
		try {
			if(!settings._id) {
				const { data } = await API.postSettings(settings);
				await setUserData({
					...userInfo,
					settings: { ...data }
				});
				return;
			} else {
				const { data } = await API.putSettings(settings);
				await setUserData({
					...userInfo,
					settings: { ...data }
				});
			}
		} catch (err) {
			console.error(err);
			throw err;
		}
	}

	const continueOffline = () => setOfflineNoData(false);

	const appContextValues = {
		user: userInfo,
		showSideBar,
		offlineNoData,
		classes,
		fnLogin,
		fnLogOut,
		toggleSideBar,
		saveEvent,
		deleteEvent,
		updateSettings,
		continueOffline
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
