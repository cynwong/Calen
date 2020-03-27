import React, { useContext }  from 'react';

import { useLocation } from 'react-router-dom';

import { 
	Container,
	Paper,
	Typography
} from '@material-ui/core';

import DiaryForm from '../../common/DiaryForm/DiaryForm';

import AppContext from '../../../utils/AppContext';

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

export default function NewEvent() {
	const { classes } = useContext(AppContext);

	// get data from uri query string
	const uriQuery = useQuery();
	const date = uriQuery.get('start');

	const event = { 
		title: 'Diary',
		start: date,
		end: date,
		allDay: true
	};

	return (
		<Container className={classes.container}>
			<Paper className={classes.paper}>
				<Typography variant="h2" className={classes.formTitle} gutterBottom>
					Add new diary entry
				</Typography>
				<DiaryForm event={event}/>
			</Paper>
		</Container>
	)
}
