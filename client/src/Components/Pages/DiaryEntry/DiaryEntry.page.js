import React, { useContext }  from 'react';

import { useParams } from 'react-router-dom';

import { 
	Container,
	Paper,
	Typography
} from '@material-ui/core';

import DiaryForm from '../../common/DiaryForm/DiaryForm';

import AppContext from '../../../utils/AppContext';

export default function DiaryEntry() {
	const { classes, user: { events } } = useContext(AppContext);
	const { id } = useParams();
	const event = events.filter((e)=> e.id === id)[0];

	return (
		<Container className={classes.container}>
			<Paper className={classes.paper}>
				<DiaryForm event={event}/>
			</Paper>
		</Container>
	)
}
