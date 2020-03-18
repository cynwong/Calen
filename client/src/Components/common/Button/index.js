import React from 'react';

import './styles.scss';

export default function CloseButton(props) {
	const {
		name,
		label,
		onClick
	} = props;
	return (
		<button 
			className="btn" 
			name={name}
			onClick={onClick}
		>
			{label}
		</button>
	)
}
