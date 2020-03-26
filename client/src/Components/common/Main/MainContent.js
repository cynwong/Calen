import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from '../../NavBar/Header/Header';
import SideBar from '../../NavBar/SideBar/SideBar';
import DashBoard from '../../Pages/DashBoard/DashBoard.page';
import Home from '../../Pages/Home/Home.page';
import Login from '../../Pages/Login/Login.page';
import NewEvent from '../../Pages/NewEvent/NewEvent.page';
import SignUp from '../../Pages/SignUp/SignUp.page';

import AppContext from '../../../utils/AppContext';

export default function MainContent() {
	const { user, showSideBar } = useContext(AppContext);
	
	return (
		<Router>
			<Header />
			<SideBar open={showSideBar}/>
			<main>
				<Switch>
					<Route exact path='/' component={Home} />
					{
						user.username ? (
							[
								<Route exact path='/dashboard' key='dashboard' component={DashBoard} />,
							]
						) : (
							[
								<Route exact path='/signup' component={SignUp} />,
								<Route exact path='/login' component={Login} />,
								<Route exact path='/events/new' component={NewEvent} />
							]
						)
					}
					
				</Switch>
			</main>
		</Router>
	);
}