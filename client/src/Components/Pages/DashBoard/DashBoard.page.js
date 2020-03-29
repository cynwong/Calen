import React, { useContext, useState } from 'react';
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
	Typography,
	TextField
} from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

import FullCalendarComponent from '../../common/FullCalendar/FullCalendar';

import AppContext from '../../../utils/AppContext';
import { defaultSettings } from '../../../constants';

export default function DashBoard() {
	const { classes, user: { events }, deleteEvent, saveEvent } = useContext(AppContext);
	const history = useHistory();
	const [showInput, setShowInput] = useState(false);

	let calendarEvents = events
		.filter((e) => e.type !== 3)
		.map((e) => {
			let newEvent = {...e};
			switch(newEvent.type) {
				case 1: 
					newEvent.color = defaultSettings.diaryColour;
					break;
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
	};

	const keyDownHandler = (e) => {
		const hideInputBox = (e) => {
			e.target.value = ''
			setShowInput(false);
		}
		if(e.keyCode ===  13) {
			saveEvent({
				type: 3,
				allDay: true,
				start: new Date(),
				title: e.target.value
			});
			hideInputBox(e);
			return;
		}
		if (e.key === "Escape") {
			hideInputBox(e)
			return;
		}
		
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
						<Link 
							onClick={e =>{e.preventDefault(); history.push('/new');}}
							className={classes.addNewButton}
						>
							<AddCircleOutlineOutlinedIcon fontSize='small'/>
						</Link>
					</Paper>
				</Grid>
				<Grid item xs={12} sm={4}>
					<Paper className={classes.memo}>
						<Typography 
							variant="h6" 
							className={classes.h6} 
							gutterBottom
						>
							Tasks
						</Typography>
						<List dense={true}>
						{
							[...events]
								.filter((e) => e.type === 3)
								.map((e, index) => {
									return (
										<ListItem key={index}>
											<Link href="#" onClick={goToPage(e.id)} color="inherit">
												<ListItemText primary={e.title} />
											</Link>
											<ListItemSecondaryAction>
												<IconButton edge="end" onClick={()=>deleteEvent(e.id)}>
													<CheckBoxOutlineBlankIcon />
												</IconButton>
											</ListItemSecondaryAction>
											
										</ListItem>
									)
								})
						}
							{
								showInput ? (
									<ListItem>
										<TextField 
											id="task"
											name='task'
											variant="outlined"
											fullWidth
											className={classes.inputTextField}
											InputProps = {{
												className:classes.input
											}}
											onKeyDown={keyDownHandler}
										/>
									</ListItem>
								) : (
									<ListItem>
										<Link onClick={()=>setShowInput(true)} className={classes.addNewButton}>
												<AddCircleOutlineOutlinedIcon fontSize='small'/>
										</Link>
									</ListItem>
								)
							}
						</List>
					</Paper>
				</Grid>
			</Grid>
		</Container>
	)
}
