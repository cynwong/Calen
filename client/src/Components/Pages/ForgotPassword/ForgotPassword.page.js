import React, { useContext, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

import {
	Button,
	Container, 
	Paper, 
	TextField,
	Typography
} from '@material-ui/core';

import AppContext from '../../../utils/AppContext';
import API from '../../../utils/API';

export default function ForgotPassword() {
	const { classes } = useContext(AppContext);
	const { success, setSuccess } = useState(false);
	const emailEl = useRef();

	const history = useHistory();

	const handleSubmit = async (e) => {
		const email = emailEl.current.value;
		try {
			const {data} = API.forgotPassword(email);
			console.log(data);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Container maxWidth='sm' className={classes.container}>
			{ 
				success ? (
					<Paper className={classes.paper}>
						<Typography variant="body" gutterBottom>
							An email with the new password was sent to your email address.
						</Typography>
						<Button 
								variant="outlined"
								color='primary'
								className={classes.formButton}
								onClick={() => history.push('/login')}
						>
							Log in
						</Button>
					</Paper>
				) : (
					<Paper className={classes.paper}>
						<Typography variant="h2" className={classes.formTitle} gutterBottom>
							Forgot password?
						</Typography>
						<Typography variant="body" gutterBottom>
							Please enter your registered email address
						</Typography>
						<TextField 
							id="email" 
							label="Email" 
							fullWidth
							inputRef = {emailEl}
						/>
						<footer className={classes.formFooter}>
							<Button 
									variant="outlined"
									color='primary'
									className={classes.formButton}
									onClick={handleSubmit}
							>
								Reset password
							</Button>
						</footer>
					</Paper>
				)
			}
		</Container>
	)
}
