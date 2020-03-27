import React, { useContext, useState } from 'react';

import { useHistory } from 'react-router-dom';
import { 
	Container,
	Paper,
	Typography,
	Button,
} from '@material-ui/core';

import SignUpForm from '../../common/SignUpForm/SignUpForm';
import AlertComponent from '../../common/AlertComponent/AlertComponent';
import AlertSection from '../../common/AlertSection/AlertSection';

import AppContext from '../../../utils/AppContext';
import API from '../../../utils/API';


export default function SignUp() {
	const { classes } = useContext(AppContext);
	const [success, setSuccess] = useState(false);
	const [errors, setErrors] = useState([]);
	const history = useHistory();

	const submitData = async (data) => {
		try {
			const result = await API.postSignUp(data);
			if(result.status === 200) {
				return setSuccess(true)
			}
		} catch (err) {
			if(err.response && err.response.data && err.response.data.errors) {
				setErrors([...err.response.data.errors]);
			} else {
				setErrors(['Something went wrong. Try again later.']);
			}
		}
	};

	const goToLogin = () => history.push('/login');

	const ErrorSection = () => {
		if(errors.length !== 0) {
			return (
				<>
					{
						errors.map((error, index) => 
							<AlertComponent key={index} type='error' identifier='server' text={error} />
						)
					}
				</>
			);
		}
		return (<></>);
	}

	return (
		<Container className={classes.container} maxWidth="sm">
			<Paper className={classes.paper}>
				<Typography variant="h2" className={classes.formTitle} gutterBottom>
					Sign up
				</Typography>
				{
					success ? (
						<>
							<AlertSection type='success' alerts={{success: 'Successfully signed up.'}} />
							<Button 
								variant="outlined"
								color='primary'
								className={classes.formButton}
								onClick={goToLogin}
							>
								Log in
							</Button>
						</>
					) : (
						<>
							<ErrorSection />
							<SignUpForm submitData={submitData} goToLogin={goToLogin}/>
						</>
					)
				}
			</Paper>
		</Container>
	);
}
