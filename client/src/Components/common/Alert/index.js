import React from 'react';

import CloseButton from '../CloseButton';

import './styles.scss';

export default function index(props) {
	
	const { type, message, handleCloseBtn } = props;
	const classNames = type ? `alert ${type}` : 'alert';
	return (
		<div className={classNames}>
			{message}
			<CloseButton onClick={handleCloseBtn} /> 
		</div>
	)
}
