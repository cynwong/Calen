import React from 'react';

import './styles.scss';

export default function CloseButton(props) {
	return (
		<button className="btnClose" onClick={props.onClick}>x</button>
	)
}
