import axios from 'axios';

export default {
	// Post Sign Up data
	postSignUp: function(postData) {
		return axios.post(
			'/api/signup',
			postData
		);
	},
	// login 
	login: function(username, password) {
		return axios.post(
			'/api/login',
			{ username, password }
		);
	},
	// logOut 
	logOut: function() {
		console.log('logout function')
		return axios.get(
			'/api/logout',
		);
	},
}