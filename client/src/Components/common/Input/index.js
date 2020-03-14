import React from 'react';

import './styles.scss';

export default function Input(props) {
	const {
		name,
		type,
		autoCapitalize,
		placeholder,
		onBlur,
		onClick,
	} = props;
	return (
		<div className='inputWrapper'>
			<input 
				type={type? type: 'text'} 
				name={name}
				id={name}
				autoCapitalize={autoCapitalize? autoCapitalize : 'off'} 
				placeholder={placeholder}
				onBlur = {onBlur}
			/>
		</div>
	)
}
