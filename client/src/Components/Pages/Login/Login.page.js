import React, { useRef, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { 
	Button,
	TextField, 
	Container,
	Paper,
	Divider,
	Link,
	Typography,
	FormControl,
	InputLabel,
	Input,
	InputAdornment,
	IconButton,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import Alert from '@material-ui/lab/Alert';

import AppContext from '../../../utils/AppContext';

export default function LoginForm() {
	const { classes, fnLogin } = useContext(AppContext);
	const [hasError, setHasError] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [disableButton, setDisableButton] = useState(true);

	const usernameEl = useRef();
	const passwordEl = useRef();

	const history= useHistory();
	
	const hasBothValues = () => {
		if(passwordEl.current.value.trim() && usernameEl.current.value.trim()) {
			setDisableButton(false);
		}
	}

	const handleLoginClick = async (e) => {
		e.preventDefault();
		const username = usernameEl.current.value;
		const password = passwordEl.current.value;
		try {
			await fnLogin(username,password);
			history.push('/dashboard');
		} catch (error) {
			setHasError(true);
		}
		
	};
	
	const goToPage = (e,location) => {
		e.preventDefault();
		history.push(location);
	};

	return (
		<Container className={classes.container} maxWidth='sm'>
			<Paper className={classes.paper}>
				<Typography variant="h2" className={classes.formTitle} gutterBottom>
					Log in
				</Typography>
				{
					hasError && 
					<Alert severity="error">Incorrect username or password</Alert>
				}
				<form onSubmit={handleLoginClick}>
					<TextField 
						id="username" 
						label="Username"
						className={classes.inputTextField}
						InputProps={{
							className: classes.inputTextField
						}}
						fullWidth
						inputRef={usernameEl}
						onKeyDown={hasBothValues}
					/>
					<br />
					<FormControl className={clsx(classes.margin, classes.inputTextField, classes.fullWidth)}>
						<InputLabel htmlFor="password" >Password</InputLabel>
						<Input
							id="password"
							inputRef={passwordEl}
							type={showPassword ? 'text' : 'password'}
							className={ classes.input }
							onKeyDown={hasBothValues}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										onClick={()=> setShowPassword(!showPassword)}
										onMouseDown={(e) => e.preventDefault()}
									>
									{showPassword ? <Visibility /> : <VisibilityOff />}
									</IconButton>
								</InputAdornment>
							}
						/>
					</FormControl>
					<br />
					<footer className={classes.formFooter}>
						<Button 
							variant="outlined"
							disabled={disableButton}
							onClick={handleLoginClick}
							color='primary'
							className={classes.formButton}
						>
							Login
						</Button>
					</footer>
				</form>
				<br />
				<Divider  className={classes.divider}/>
				{/* <p>
					<Link href="#" onClick={(e)=>goToPage(e,'/forgotpassword')}>
						Forgot password
					</Link>
				</p> */}
				<p>
					Don't have an account?&nbsp;
					<Link href="#" onClick={(e)=>goToPage(e,'/signup')}>
						Sign up
					</Link>
				</p>
			</Paper>
		</Container>
	);
}
