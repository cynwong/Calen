import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import Alert from '../../common/Alert';
import Input from '../../common/Input';

import API from '../../../utils/API';

import './styles.scss';


export default function SignUp(props) {
	const [errors, setErrors] = useState({});
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	/**
	 * Check if lastName exists
	 * @param {string} value 
	 */
	const validateLastName = (value) => {
		if (value && value.trim()) {
			return true;
		}
		setErrors({
			...errors,
			lastName: "Last name is required."
		});
		return false;
	};

	/**
	 * Check if email value is valid email
	 * @param {string} value 
	 */
	const validateEmail = (value) => {
		if( value && value.trim()) {
			return true;
		}
		const emailErrors = [];
		emailErrors.push('Email is required');
		const emailRegEx = new RegExp(/.+@.+\..+/gi);
		if(! emailRegEx.test(value)) {
			emailErrors.push('Valid email is needed.')
		}
		setErrors({
			...errors,
			email: emailErrors
		});
		return false;
	}

	/**
	 * Check password is not empty and within range
	 * @param {string} value 
	 */
	const validatePassword = (value) => {
		const length = value.length;
		const passwordErrors = [];
		if(length < 8 || length > 20){
			passwordErrors.push('Password must be 8-20 characters long.');
		}
		if (passwordErrors.length > 0) {
			setErrors({
				...errors,
				password: passwordErrors
			});
			return false;
		}
		return true;
	}

	const validateConfirmPassword = (value) => {
		if (value === password) {
			return true;
			
		}
		setErrors({
			...errors,
			confirmPassword: 'Passwords must be identical.'
		});
		return false
	}

	const handleFocusOut = (e) => {
		e.preventDefault();
		const { name, value } = e.target;

		switch(name) {
			case 'firstName': 
				setFirstName(value);
				break
			case 'lastName': 
				if (validateLastName(value)) {
					setLastName(value);
				}
				break;
			case 'email':
				if(validateEmail(value)) {
					setEmail(value);
				}
				break;
			case 'password': 
				if(validatePassword(value)) {
					setPassword(value);
				}
				break;
			case 'confirmPassword': 
				if (validateConfirmPassword(value)) {
					return setConfirmPassword(value);
				}
				break;
			default: 
				break;
		}

	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (
			!validateLastName(lastName) ||
			!validateEmail(email) || 
			!validatePassword(password) ||
			!validateConfirmPassword(confirmPassword)
		) {
			return;
		}
		try {
			const result = await API.postSignUp({
				firstName,
				lastName,
				email,
				password
			});
			if(result.status === 200) {
				return props.history.push('/');
			}
		} catch (err) {
			setErrors({
				...errors,
				server: [...err.response.data.errors]
			})
		}
		
	}

	/**
	 * 
	 * @param {any} e - event object
	 * @param {string} target - target for deleting data. 
	 */
	const handleBtnCloseClick = (e, target) => {
		e.preventDefault();
		setErrors({
			...errors,
			[target]: null
		})
	};

	return (
		<div className='signUp'>
			<form>
				<h1>Create your Account</h1>
				<div className='formContentWrapper'>
					<div className="errors">
						{errors.server &&
							errors.server.map((err) => 
								<Alert 
									message={err}
									type='danger' 
									handleCloseBtn = {(e)=> handleBtnCloseClick(e,'server')}
								/>
							)
						}
						{errors.lastName &&
							<Alert 
								message={errors.lastName}
								type='danger' 
								handleCloseBtn = {(e)=> handleBtnCloseClick(e,'lastName')}
							/>
						}
					</div>
					<div className='contentContainer'>
						<Input 
							name="firstName" 
							autoCapitalize='word' 
							placeholder='First name'
							value={firstName}
							onBlur= {handleFocusOut}
						/>
						<Input 
							name="lastName" 
							autoCapitalize='word' 
							placeholder='Last name'
							value={lastName}
							onBlur = {handleFocusOut}
						/>
					</div>
					<div className="errors">
						{errors.email &&
							errors.email.map((err) => 
								<Alert 
									message={err}
									type='danger' 
									handleCloseBtn = {(e)=> handleBtnCloseClick(e,'email')}
								/>
							)
						}
					</div>
					<Input 
							name="email" 
							placeholder='Email'
							value={email}
							onBlur= {handleFocusOut}
					/>
					<div className="errors">
						{errors.password &&
							errors.password.map((err) => 
								<Alert 
									message={err}
									type='danger' 
									handleCloseBtn = {(e)=> handleBtnCloseClick(e,'password')}
								/>
							)
						}
						{errors.confirmPassword &&
							<Alert 
								message={errors.confirmPassword}
								type='danger' 
								handleCloseBtn = {(e)=> handleBtnCloseClick(e,'confirmPassword')}
							/>
						}
					</div>
					<div className="contentContainer">
						<Input 
								type="password" 
								name="password" 
								placeholder='Password'
								value={password}
								onBlur= {handleFocusOut}
						/>
						<Input 
								type="password" 
								name="confirmPassword" 
								placeholder='Confirm password'
								value={confirmPassword}
								onBlur= {handleFocusOut}
						/>
					</div>
					<div className="footer">
						<button className='btnSignUp' onClick={handleSubmit}>Sign Up</button>
					</div>
				</div>
			</form>
		</div>
	)
}
