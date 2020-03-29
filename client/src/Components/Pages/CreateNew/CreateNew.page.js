import React, { useContext, useState } from 'react';

import {
	Container,
	Paper, 
	Typography,
	Button
} from '@material-ui/core';


import DiaryForm from '../../common/DiaryForm/DiaryForm';
import EventForm from '../../common/EventForm/EventForm';
import TaskForm from '../../common/TaskForm/TaskForm';

import AppContext from '../../../utils/AppContext';

export default function CreateNewPage() {
	const [type, setType] = useState(9999);
	const { classes } = useContext(AppContext);
	
	const displayForm = () => {
		const now = new Date();
		const event = {
			start: now,
			end: now, 
			allDay: true
		};
		switch(type) {
			case 0: 
			return <EventForm event={event} from='/dashboard'/>;
			case 1: 
			return <DiaryForm event={event} from='/dashboard'/>;
			case 3: 
				return <TaskForm event={event} from='/dashboard'/>;
			default:
				return (
					<>
						<Typography variant="h6" gutterBottom>
							Which type of event do you want to create?
						</Typography>
						<Button
							color="primary"
							onClick={() => setType(0)}
							className={classes.formButton}
						>
							Calendar Event
						</Button>
						<Button
							color="primary"
							onClick={() => setType(1)}
							className={classes.formButton}
						>
							Diary Entry
						</Button>
						<Button
							color="primary"
							onClick={() => setType(3)}
							className={classes.formButton}
						>
							Todo / Task
						</Button>
					</>
				);
		}
		
	}


	return (
		<Container className={classes.container}>
			<Paper className={classes.paper}>
				{ displayForm()}
			</Paper>
		</Container>
	)
}
