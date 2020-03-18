import React from 'react';

import './styles.scss';

export default function FormInput(props) {
	const {
		name,
		type,
		autoCapitalize,
		placeholder,
		onBlur,
		onClick
	} = props;
	return (
		<input 
			className='input'
			type={type ? type: 'text'} 
			name={name}
			id={name}
			autoCapitalize={autoCapitalize? autoCapitalize : 'off'} 
			placeholder={placeholder ? placeholder : ''}
			onBlur = {onBlur ? onBlur : null}
			onClick = {onClick ? onClick : null}
		/>
	)
}
