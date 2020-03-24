import React, { useState, useContext } from 'react';
import { TextField, Button, Switch, FormControlLabel } from '@material-ui/core';

import AppContext from '../../../utils/AppContext';

import useStyles from './EventForm.styles.js';



export default function EventForm({event, closeModal}) {
	const { saveEvent } = useContext(AppContext);
	const classes = useStyles();
	const [errors, setErrors] = useState({});
	const [updatingEvent, setUpdatingEvent] = useState({...event});
	console.log(updatingEvent)

	const handleSaveBtnClick = async (e) => {
		e.preventDefault();
		await saveEvent(updatingEvent);
		closeModal();
	}

	const handleFocusOut = (e) => {
		e.preventDefault();
		const { id, value } = e.currentTarget;
		if(!value.trim()){
			return setErrors({
				...errors,
				[id]: true
			});
		}
		setUpdatingEvent({
			...updatingEvent,
			[id]: value.trim()
		})
	};

	const handleAllDayChange = (e) => {
		e.preventDefault();
		const { value } = e.currentTarget;
		if(value === 'on') {
			e.currentTarget.value= 'off';
		} else {
			e.currentTarget.value= 'on';
		}
		setUpdatingEvent({
			...updatingEvent,
			allDay: !updatingEvent.allDay
		})
	};
	return (
		<div className={classes.container}>
			<form className={classes.form}>
				<TextField 
					id="title"
					label="Title"
					variant="standard"
					helperText="Required"
					fullWidth
					className={classes.textField}
					defaultValue={updatingEvent.title}
					onBlur={handleFocusOut}
				/>
				<br/>
				<TextField
					id="start"
					label="Start time"
					type="datetime-local"
					helperText="Required"
					defaultValue={updatingEvent.start}
					className={classes.textField}
					fullWidth
					InputLabelProps={{
						shrink: true,
					}}
					onBlur={handleFocusOut}
				/>
				<br/>
				<FormControlLabel
					id='allDay'
					value={updatingEvent.allDay ? 'on': 'off'}
					checked={updatingEvent.allDay}
					control={<Switch color="primary" />}
					label="All Day Event"
					labelPlacement="start"
					onChange={handleAllDayChange}
				/>
				<br />
				{
					(!updatingEvent.allDay) && (
						<>
							<TextField
								id="end"
								label="End time"
								type="datetime-local"
								defaultValue={updatingEvent.end}
								className={classes.textField}
								fullWidth
								InputLabelProps={{
									shrink: true,
								}}
								onBlur={handleFocusOut}
							/>
							<br />
						</>
					)
				}
				
				<TextField 
					id="desc"
					label="Description"
					variant="standard"
					fullWidth
					defaultValue={updatingEvent.desc}
					multiline
					className={classes.textField}
					onBlur={handleFocusOut}
				/>
				<br/>
				<TextField 
					id="location"
					label="Location"
					variant="standard"
					defaultValue={updatingEvent.location}
					fullWidth
					className={classes.textField}
					onBlur={handleFocusOut}
				/>	
				<br/>
				<TextField 
					id="notes"
					label="Notes"
					variant="standard"
					defaultValue={updatingEvent.notes}
					fullWidth
					multiline
					className={classes.textField}
					onBlur={handleFocusOut}
				/>	
				<br/>
				<Button
					variant="contained"
					color="primary"
					size="large"
					className={classes.button}
					onClick={handleSaveBtnClick}
				>
					Save
				</Button>
				<Button
					variant="contained"
					color="primary"
					size="large"
					className={classes.button}
				>
					Cancel
				</Button>
			</form>
		</div>
	)
}
