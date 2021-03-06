import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import Header from '../../NavBar/Header/Header';
import SideBar from '../../NavBar/SideBar/SideBar';

import Home from '../../Pages/Home/Home.page';
import Login from '../../Pages/Login/Login.page';
import SignUp from '../../Pages/SignUp/SignUp.page';

import DashBoard from '../../Pages/DashBoard/DashBoard.page';
import SettingsPage from '../../Pages/Settings/Settings.page';

import CalendarPage from '../../Pages/Calendar/Calendar.page';
import CalendarFormPage from '../../Pages/CalendarForm/CalendarForm.page';

import DiaryPage from '../../Pages/Diary/Diary.page';
import DiaryFormPage from '../../Pages/DiaryForm/DiaryForm.page';

import TasksPage from '../../Pages/Tasks/Tasks.page';
import TasksFormPage from '../../Pages/TasksForm/TasksForm.page';

import SwitchRoute from '../../common/SwitchRoute/SwitchRoute';
import CreateNewPage from '../../Pages/CreateNew/CreateNew.page'

import AppContext from '../../../utils/AppContext';

export default function MainContent() {
	const { user, showSideBar, offlineNoData } = useContext(AppContext);
	
	return (
		<Router>
			<Header />
			<SideBar open={showSideBar}/>
			{
				offlineNoData && (
					<Alert severity='error'>
						<Typography align='center' display='block' variant='body'>
							<strong>No internet connection detected.</strong>
						</Typography>
					</Alert>
				)
			}	
			<main>
				<Switch>
					<Route exact path='/' component={Home} />
					{
						user.username ? (
							[
								<Route exact path='/dashboard' key='dashboard' component={DashBoard} />,
								<Route exact path='/calendar' key='calendar' component={CalendarPage} />,
								<Route exact path='/calendar/:id' key='calendarForm' component={CalendarFormPage} />,
								<Route exact path='/diary' key='diary' component={DiaryPage} />,
								<Route exact path='/diary/:id' key='diaryForm' component={DiaryFormPage} />,
								<Route exact path='/tasks' key='tasks' component={TasksPage} />,
								<Route exact path='/tasks/:id' key='tasksForm' component={TasksFormPage} />,
								// <Route exact path='/mealplanner' key='mealplanner' component={MealPlannerPage} />,
								// <Route exact path='/mealplanner/:id' key='tasksForm' component={TasksFormPage} />,
								<Route exact path='/settings' key='settings' component={SettingsPage} />,
								<Route exact path='/new' key='createNew' component={CreateNewPage} />,
								<Route exact path='/view/:id' key='view' component={SwitchRoute} />,
								<Route path="*" key="nomatch">
									<Redirect to='/dashboard' />
								</Route>
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