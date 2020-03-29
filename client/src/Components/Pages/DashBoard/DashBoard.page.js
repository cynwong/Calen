import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import {
	Container,
	Grid,
	Paper, 
	List,
	ListItem,
	ListItemText,
	ListItemSecondaryAction, 
	IconButton,
	Link,
} from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import DeleteIcon from '@material-ui/icons/Delete';

import FullCalendarComponent from '../../common/FullCalendar/FullCalendar';

import AppContext from '../../../utils/AppContext';
import { defaultSettings } from '../../../constants';

export default function DashBoard() {
	const { classes, user: { events } } = useContext(AppContext);
	const history = useHistory();

	let calendarEvents = events.map((e) => {
		let newEvent = {...e};
		switch(newEvent.type) {
			case 1: 
				newEvent.color = defaultSettings.diaryColour;
				break;
			// case 2: 
			// 	newEvent.color = settings.calendarColour || defaultSettings.calendarColour;
			// 	// newEvent.color='#3f3f3f';
			// 	break;
			case 3: 
				newEvent.color = defaultSettings.taskColour;
				break;
			default: 
				newEvent.color = defaultSettings.calendarColour;
		}
		return newEvent;
	});
	const calendarEventsClick = ({event}) => history.push(`/view/${event.id}`);

	const goToPage = (id) => (e) => {
		e.preventDefault();
		history.push(`/tasks/${id}`);
	}
	const addNewTask = (e) => {
		e.preventDefault();
		history.push(`/tasks/new?start=${new Date()}&end=&allDay=true`)
	}
	const addNew = (e) => {
		e.preventDefault();
		history.push(`/new`)
	}
	return (
		<Container className={classes.container}>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={8}>
					<Paper className={classes.paper}>
						<FullCalendarComponent
							events={calendarEvents}
							header={{
								left: 'today',
								center: 'prev,title,next',
								right: ''// 'listDay,dayGridMonth,dayGridWeek,dayGridDay'
							}}
							view='listDay'
							eventLimit={false}
							eventClick={calendarEventsClick}
							selectDates={calendarEventsClick}
						/>
						<Link onClick={addNew} className={classes.addNewButton}>
								<AddCircleOutlineOutlinedIcon fontSize='small'/>
						</Link>
					</Paper>
				</Grid>
				<Grid item xs={12} sm={4}>
					<Paper className={classes.memo}>
						<List dense={true}>
						{
							[...events]
								//.filter((e) => e.type === 3)
								.map((e, index) => {
									if(e.type !== 3) {
										return;
									}
									return (
										<ListItem>
											<Link href="#" onClick={goToPage(e.id)} color="inherit">
												<ListItemText primary={e.title} />
											</Link>
											<ListItemSecondaryAction>
												<IconButton edge="end" aria-label="delete">
													<DeleteIcon />
												</IconButton>
											</ListItemSecondaryAction>
											
										</ListItem>
									)
								})
						}
							<ListItem>
								<Link onClick={addNewTask} className={classes.addNewButton}>
										<AddCircleOutlineOutlinedIcon fontSize='small'/>
								</Link>
							</ListItem>
						</List>
						{/* <FullCalendarComponent
							events={}
							header={{
								left: '',
								center: 'title',
								right: ''
							}}
							view='listDay'
							eventClick={todayEventClick}
							selectDates={todayEventClick}
						/> */}
					</Paper>
				</Grid>
			</Grid>
		</Container>
	)
}
