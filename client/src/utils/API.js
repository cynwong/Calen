import axios from 'axios';

export default {
	// Post Sign Up data
	postSignUp: function(postData) {
		return axios.post(
			'/api/signup',
			postData
		);
	},
}