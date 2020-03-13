import React from 'react'

export default function SignUp() {
	return (
		<div className='signUp'>
			<form>
				<h1>Create your Account</h1>
				<div className='formContentWrapper'>
					<div className='nameHolder'>
						<div className='firstNameHolder'>
							<input type="text" name="firstName" id="firstName" autoCapitalize='word' value='' placeholder='First name'/>
						</div>
						<div className='lastNameHolder'>
							<input type="text" name="lastName" id="lastName" autoCapitalize='word' value='' placeholder='Last name'/>
						</div>
					</div>
					<div className="emailHolder">
						<input type="text" name="email" id="email" autoCapitalize='off' value='' placeholder='Email'/>
					</div>
					<div className="passwordContainer">
						<div className='passwordHolder'>
							<input type="password" name="password" id="password" placeholder='Password'/>
						</div>
						<div className='confirmPasswordHolder'>
							<input type="text" name="confirmPassword" id="confirmPassword" placeholder='Confirm password'/>
						</div>
					</div>
				</div>
			</form>
		</div>
	)
}
