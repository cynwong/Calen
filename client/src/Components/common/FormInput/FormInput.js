import React from 'react';

import './FormInput.styles.scss';

export default function FormInput(props) {
	const {
		name,
		type,
		autoCapitalize,
		placeholder,
		onBlur,
		onClick,
		onChange
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
				onClick = {onClick}
				onChange = {onChange}
			/>
		</div>
	)
}
