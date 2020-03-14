import React from 'react';

import SiteTitle from './SiteTitle';

import './styles.scss';

export default function Header() {
	return (
		<header className='header'>
			<SiteTitle />
		</header>
	);
}
