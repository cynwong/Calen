import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Header from '../../NavBar/Header/Header';
import SideBar from '../../NavBar/SideBar/SideBar';

import Home from '../../Pages/Home/Home.page';
import Login from '../../Pages/Login/Login.page';
import SignUp from '../../Pages/SignUp/SignUp.page';

import DashBoard from '../../Pages/DashBoard/DashBoard.page';

import CalendarPage from '../../Pages/Calendar/Calendar.page';
import CalendarForm from '../../Pages/CalendarForm/CalendarForm.page';

import DiaryPage from '../../Pages/Diary/Diary.page';
import DiaryForm from '../../Pages/DiaryForm/DiaryForm.page';

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
								<Route exact path='/calendar' key='calendar' component={CalendarPage} />,
								<Route exact path='/calendar/:id' key='calendarForm' component={CalendarForm} />,
								<Route exact path='/diary' key='diary' component={DiaryPage} />,
								<Route exact path='/diary/:id' key='diaryForm' component={DiaryForm} />,
							]
						) : (
							[
								<Route exact path='/signup' key='signup' component={SignUp} />,
								<Route exact path='/login' key='login' component={Login} />,
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