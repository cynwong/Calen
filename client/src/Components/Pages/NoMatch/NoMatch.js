import React from 'react';

import {
	Container, 
	Paper,
} from '@material-ui/core';

import AlertComponent from '../../common/AlertComponent/AlertComponent';
import AppContext from '../../../utils/AppContext';
export default function NoMatch() {
	const { classes} = useContext(AppContext);
	return (
		<Container className={classes.container} >
			<Paper className={classes.paper}>
				<AlertComponent text="No resource found." />
			</Paper>
		</Container>
	)
}
