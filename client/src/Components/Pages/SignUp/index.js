import React from 'react';

import './styles.scss';

export default function SignUp() {
	return (
		<div className='signUp'>
			<form>
				<h1>Create your Account</h1>
				<div className='formContentWrapper'>
					<div className='contentContainer'>
						<div className='inputWrapper'>
							<input type="text" name="firstName" id="firstName" autoCapitalize='word' placeholder='First name'/>
						</div>
						<div className='inputWrapper'>
							<input type="text" name="lastName" id="lastName" autoCapitalize='word' placeholder='Last name'/>
						</div>
					</div>
					<div className="inputWrapper">
						<input type="text" name="email" id="email" autoCapitalize='off' placeholder='Email'/>
					</div>
					<div className="contentContainer">
						<div className='inputWrapper'>
							<input type="password" name="password" id="password" placeholder='Password'/>
						</div>
						<div className='inputWrapper'>
							<input type="text" name="confirmPassword" id="confirmPassword" placeholder='Confirm password'/>
						</div>
					</div>
					<div className="footer">
						<button className='btnSignUp'>Sign Up</button>
					</div>
				</div>
			</form>
		</div>
	)
}
