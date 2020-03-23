import React from 'react';

import SiteTitle from './SiteTitle/SiteTitle';
import Login from './Login/Login';

import './Header.styles.scss';

export default function Header() {
	return (
		<header className='header'>
			<SiteTitle />
			<Login />
		</header>
	);
}
