import React, { useRef, useContext } from 'react';

import Input from '../../../common/Input';
import Button from '../../../common/Button';

import AppContext from '../../../../utils/AppContext';
import { useHistory } from 'react-router-dom';

export default function Login() {
	const { user, fnLogin, fnLogOut } = useContext(AppContext);
	const usernameEl = useRef();
	const passwordEl = useRef();
	const history= useHistory();

	const handleLoginClick = async (e) => {
		e.preventDefault();
		const username = usernameEl.current.value;
		const password = passwordEl.current.value;
		await fnLogin(username,password);
		history.push('/dashboard');
	}

	const handleLogoutClick = (e) => {
		e.preventDefault();
		fnLogOut();
	}


	return (
		<div className='login-container'>
			{user.firstName ? (
				<div>
					<p>Welcome, {user.firstName}.</p>
					<Button 
						name='btn-logout'
						label="Logout"
						onClick ={handleLogoutClick}
					/>
				</div>
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
