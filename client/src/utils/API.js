import axios from 'axios';

export default {
	// Post Sign Up data
	postSignUp: (postData) => {
		return axios.post(
			'/api/signup',
			postData
		);
	},
	// login 
	login: (username, password) => {
		return axios.post(
			'/api/login',
			{ username, password }
		);
	},
	// logOut 
	logOut: () => {
		return axios.get(
			'/api/logout',
		);
	},

}