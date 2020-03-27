import React from 'react';

import Alert from '@material-ui/lab/Alert';

export default function AlertComponent({type='error', identifier, text=''}) {
	let label = text;

	if( text === '' || typeof(text) !== 'string') {
		// if no label, then look for the default labels.
		switch (identifier) {
			case 'entry': 
			label = 'Email is required.';
			break;
			case 'email': 
				label = 'Email is required.';
				break;
			case 'validEmail': 
				label = 'Valid email is needed.';
				break;
			case 'lastName': 
				label = 'Last name is required.';
				break;
			case 'password': 
				label = 'Password is required.';
				break;
			case 'repeatPassword': 
				label = 'Confirm password is required.';
				break;
			case 'needSamePassword':
				label = 'Passwords must be identical.';
				break;
			case 'passwordLength': 
				label = 'Password must be 8-20 characters long.';
				break;
			case 'server': 
				label = 'Something went wrong. Try again later';
				break;
			default:
				label = 'Something went wrong. Try again later';
				break;
		}
	}
	return (
		<Alert severity={type}>{label}</Alert>
	)
}
