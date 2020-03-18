import React, { useRef, useContext } from 'react';

import Input from '../../../common/Input';
import Button from '../../../common/Button';

import AppContext from '../../../../utils/AppContext';

export default function Login() {
	const { fullName, fnLogin } = useContext(AppContext);
	const usernameEl = useRef();
	const passwordEl = useRef();

	const handleLoginClick = (e) => {
		e.preventDefault();
		console.log(usernameEl.current.value);
	}


	return (
		<div className='login-container'>
			{fullName ? (
				<p>Welcome, {fullName}.</p>
			) : (
				<form >
					<Input 
						name='login-username' 
						type='text' 
						placeholder='Username'
						ref={usernameEl}
					/>
					<Input 
						name='login-password'
						type='password'
						placeholder='Password'
						ref={passwordEl}
					/>
					<Button 
						name='btn-login'
						label="LogIn"
						onClick ={handleLoginClick}
					/>
				</form>
			)}
			
		</div>
	)
}
