import React, {useContext} from 'react'

import './styles.scss';

import AppContext from '../../../utils/AppContext';
import { useHistory } from 'react-router-dom';

export default function Home() {
	const {user} = useContext(AppContext);
	console.log(user);
	const history= useHistory();
	if(user.username){
		history.push('/dashboard');
	}
	return (
		<div className='home'>
			
		</div>
	)
}
