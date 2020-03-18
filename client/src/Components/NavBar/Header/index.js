import React from 'react';

import SiteTitle from './SiteTitle';
import Login from './Login';

import './styles.scss';

export default function Header() {
	return (
		<header className='header'>
			<SiteTitle />
			<Login />
		</header>
	);
}
