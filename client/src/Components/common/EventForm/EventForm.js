import React, { useState, useContext } from 'react';
import { 
	TextField,
	Button,
	Switch,
	FormControlLabel,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

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
		if(id === 'title' || id === 'start') {
			// check if required data are there
			if(!value.trim()){
				return setErrors({
					...errors,
					[id]: true
				});
			}
		}
		// save data
		if(id === 'desc' || id === 'notes'){
			setUpdatingEvent({
				...updatingEvent,
				[id]: value.split(/\r?\n/)
			})
			return;
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
			<div className="errorContainer">
				{ errors.title && <Alert severity="error">Title is required.</Alert> }
				{ errors.start && <Alert severity="error">Start date time is required.</Alert> }
			</div>
			<form className={classes.form}>
				<TextField 
					id="title"
					label="Title"
					variant="standard"
					error={errors.title}
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
					error={errors.start}
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
					// error={errors.allDay}
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
								// error={errors.end}
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
					// error={errors.desc}
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
					// error={errors.location}
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
					// error={errors.notes}
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
