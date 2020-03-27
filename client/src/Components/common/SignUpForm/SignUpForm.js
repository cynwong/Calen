import React, { useContext, useState, useRef } from 'react';

import clsx from 'clsx';

import { 
	Button,
	Divider,
	FormControl,
	FormHelperText,
	IconButton,
	Input,
	InputAdornment,
	InputLabel,
	Link,
	TextField, 
} from '@material-ui/core';

import { Visibility, VisibilityOff } from '@material-ui/icons';

import AlertSection from '../../common/AlertSection/AlertSection';
import AlertComponent from '../../common/AlertSection/AlertComponent/AlertComponent';
import AppContext from '../../../utils/AppContext';


export default function SignUpForm({ submitData, goToLogin}) {
	const { classes } = useContext(AppContext);
	const [values, setValues] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		repeatPassword: '',
		showPassword: false,
		showRepeatPassword: false,
	});
	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		const { id, value } = e.target;
		setValues({ ...values, [id]: value });
	};

	const handleClickShowPassword = prop => () => {
		if(prop === 'password') {
			setValues({ ...values, showPassword: !values.showPassword });
		} else if( prop === 'repeatPassword') {
			setValues({ ...values, showRepeatPassword: !values.showRepeatPassword });
		}
	};

	const handleMouseDownPassword = (e) => {
		e.preventDefault();
	};
	
	const handleFocusOut = (e) => {
		const { id, value } = e.target;
		const trimmedValue = value.trim();
		let localErrors = {...errors};

		if(!trimmedValue) {
			localErrors[id] = true;
		} else {
			delete localErrors[id];
			if (id === 'email') {
				const emailRegEx = new RegExp(/.+@.+\..+/gi);
				if (! emailRegEx.test(value)){
					localErrors.validEmail = true;
				} else {
					let localErrors = {...errors};
					delete localErrors.validEmail;
				}
			}

			if (id === 'password') {
				const length = trimmedValue.length;
				if (length < 8 || length > 16){
					localErrors.passwordLength = true;
				} else {
					delete localErrors.passwordLength;
				}
			}

			if (id === 'repeatPassword'){
				if(trimmedValue !== values.password) {
					localErrors.needSamePassword = true;
				} else {
					delete localErrors.needSamePassword;
				}
			}
		}
		setErrors({
			...localErrors,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if(Object.keys(errors).length !== 0){
			// has errors so cannot proceed
			return;
		}
		submitData({
			firstName: values.firstName,
			lastName: values.lastName,
			email: values.email,
			password: values.password
		});
	};
	return (
		<>
			{
				Object.keys(errors).length !== 0 && (
					<AlertSection alerts={errors} type='error' />
				)
			}
			<form className={classes.form}>
				<TextField
					id="firstName"
					label="First name"
					defaultValue={values.firstName}	
					onChange={handleChange}
					className={clsx(classes.margin, classes.inputTextField, classes.fullWidth)}
					InputProps={{ className: classes.input }}
				/>
				<TextField
					id="lastName"
					label="Last name"
					defaultValue={values.lastName}	
					error={('lastName' in errors) ? true : false}
					onChange={handleChange}
					onBlur={handleFocusOut}
					className={clsx(classes.margin, classes.inputTextField, classes.fullWidth)}
					InputProps={{ className: classes.input }}
				/>
				<TextField
					id="email"
					label="Email"
					defaultValue={values.email}	
					error={('email' in errors) ? true : false}
					onChange={handleChange}
					onBlur={handleFocusOut}
					className={clsx(classes.margin, classes.inputTextField, classes.fullWidth)}
					InputProps={{ className: classes.input }}
				/>
				<FormControl className={clsx(classes.margin, classes.inputTextField, classes.fullWidth)}>
					<InputLabel 
						error={('password' in errors) ? true : false}
						htmlFor="password"
					>
						Password
					</InputLabel>
					<Input
						id="password"
						type={values.showPassword ? 'text' : 'password'}
						value={values.password}	
						error={('password' in errors) ? true : false}
						onChange={handleChange}
						onBlur={handleFocusOut}
						className={ classes.input }
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									onClick={handleClickShowPassword('password')}
									onMouseDown={handleMouseDownPassword}
								>
								{values.showPassword ? <Visibility /> : <VisibilityOff />}
								</IconButton>
							</InputAdornment>
						}
					/>
					<FormHelperText 
						error={('password' in errors) ? true : false}
						id="password-helper-text"
					>
						Password must have 8-16 characters. Required.
					</FormHelperText>
				</FormControl>
				<FormControl className={clsx(classes.margin, classes.inputTextField, classes.fullWidth)}>
					<InputLabel htmlFor="repeatPassword">Confirm password</InputLabel>
					<Input
						id="repeatPassword"
						type={values.showRepeatPassword ? 'text' : 'password'}
						value={values.repeatPassword}
						onChange={handleChange}
						onBlur={handleFocusOut}
						className={ classes.input }
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									onClick={handleClickShowPassword('repeatPassword')}
									onMouseDown={handleMouseDownPassword}
								>
								{values.showRepeatPassword ? <Visibility /> : <VisibilityOff />}
								</IconButton>
							</InputAdornment>
						}
					/>
				</FormControl>
				<footer className={classes.formFooter}>
					<Button 
						variant="outlined"
						color='primary'
						className={classes.formButton}
						onClick={handleSubmit}
					>
						Sign up
					</Button>
				</footer>
			</form>
			<br />
			<Divider  className={classes.divider}/>
			<p>
				Already registered?&nbsp;
				<Link href="#" onClick={goToLogin}>
					Log in
				</Link>
			</p>
		</>
	)
};
