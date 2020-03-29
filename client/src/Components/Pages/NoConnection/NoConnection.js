import React from 'react'
import { Container, Paper, Typography } from '@material-ui/core'
import AppContext from '../../../utils/AppContext'

export default function NoConnection() {
	const { classes } = useContext(AppContext);

	return (
		<Container className={classes.container}>
			<Paper className={classes.name}>
				<Alert severity='error'>
					<Typography variant='h6'>
						No internet connection found. Try again later.
					</Typography>
				</Alert>
			</Paper>
		</Container>
	)
}
