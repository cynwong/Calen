import React from 'react';

import AlertComponent from './AlertComponent/AlertComponent';
export default function AlertSection({alerts, type}) {
	console.log(alerts)
	return (
		<div>
			{
				Object.entries(alerts).map(([id, value]) => 
					<AlertComponent key={id} type={type} identifier={id} text={value} />
				)
			}
		</div>
	)
}
