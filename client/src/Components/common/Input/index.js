import React, { forwardRef } from 'react';

import './styles.scss';

const Input = forwardRef((props, ref) => {
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
			ref={ref}
			autoCapitalize={autoCapitalize? autoCapitalize : 'off'} 
			placeholder={placeholder ? placeholder : ''}
			onBlur = {onBlur ? onBlur : null}
			onClick = {onClick ? onClick : null}
		/>
	)
});


export default Input;