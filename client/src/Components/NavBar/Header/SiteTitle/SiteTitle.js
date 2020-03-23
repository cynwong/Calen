import React from 'react';
import { NavLink } from 'react-router-dom';

import './SiteTitle.styles.scss';

export default function SiteTitle() {
	return (
		<div className='siteTitle'>
			<NavLink to='/'>
				<h1>Calen</h1>
			</NavLink>
		</div>
	)
}
