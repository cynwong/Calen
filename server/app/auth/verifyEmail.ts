import axios from 'axios';

export default async function verifyEmail (email: string) {
	const quickEmailUri = `http://api.quickemailverification.com/v1/verify?email=${email}&apikey=${process.env.QUICK_EMAIL_VERIFICATION_KEY}`;
	try {
		const {data} = await axios.get(quickEmailUri);
		return data.result === 'valid';
	} catch (err) {
		return false;
	}
};