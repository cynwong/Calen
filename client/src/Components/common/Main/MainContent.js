import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Header from '../../NavBar/Header/Header';
import SideBar from '../../NavBar/SideBar/SideBar';

import Calendar from '../../Pages/Calendar/Calendar.page';
import DashBoard from '../../Pages/DashBoard/DashBoard.page';
import Event from '../../Pages/Event/Event.page';
// import ForgotPassword from '../../Pages/ForgotPassword/ForgotPassword.page';
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
								<Route exact path='/calendar' key='calendar' component={Calendar} />,
								<Route exact path='/events/new' key='newEvent'  component={NewEvent} />,
								<Route exact path='/events/:id' key='event' component={Event} />,
							]
						) : (
							[
								<Route exact path='/signup' key='signup' component={SignUp} />,
								<Route exact path='/login' key='login' component={Login} />,
								// <Route exact path='/forgotpassword' key='forgotPassword' component={ForgotPassword} />,
								<Route path="*" key="nomatch">
									<Redirect to='/login' />
								</Route>
								
							]
						)
					}
					
				</Switch>
			</main>
		</Router>
	);
}