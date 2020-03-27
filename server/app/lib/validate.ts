
export const validateEmail = (email:string):string[]=> {
	const errors = [];
	if (!email) {
		errors.push('Email is required');
	}
	if (!new RegExp(/.+@.+\..+/g).test(email)) {
		errors.push('Email is not valid');
	}
	return errors;
}

export const validatePassword = (password:string):string[]=> {
	const errors = [];
	if (!password) {
		errors.push('Password is required');
	}
	const passwordLength = password.length;
	if (passwordLength < 8 || passwordLength > 20) {
		errors.push('Password must be 8-20 characters long.')
	}

	// if ( 
	// 	new RegExp(/([A-Z])/g).test(password) &&
	// 	new RegExp(/([a-z])/g).test(password) &&
	// 	new RegExp(/([0-9])/g).test(password) &&

	// )

	return errors;
}