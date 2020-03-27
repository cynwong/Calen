import React, { useState, useContext } from 'react';

import { useHistory } from 'react-router-dom';

import moment from 'moment';

import { 
	Button,
	Container,
	FormControlLabel,
	Switch,
	TextField,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import AppContext from '../../../utils/AppContext';

export default function TaskForm({event}) {
	const { 
		saveEvent,
		deleteEvent,
		classes,
		formatDateString,
		parseDateString 
	} = useContext(AppContext);
	const [errors, setErrors] = useState({});

	const formatDateTime = (m) => m.format(formatDateString);
	const parseDateFormat = (dateTime) => moment(dateTime, parseDateString);

	const fnClose = () => history.push('/tasks');

	const allDay = 'true'.localeCompare(event.allDay) === 0 ;
	const [updatingEvent, setUpdatingEvent] = useState({
		...event,
		allDay: allDay,
		start: formatDateTime(parseDateFormat(event.start)),
		end: event.end ? formatDateTime(parseDateFormat(event.end)) : '',
	});
	const history = useHistory();
	

	const handleSaveBtnClick = async (e) => {
		e.preventDefault();
		if(!updatingEvent.title || (updatingEvent.title && !updatingEvent.title.trim())) {
			return setErrors({
				...errors,
				title:true
			});
		}
		if(!updatingEvent.start || (updatingEvent.start && !updatingEvent.start.trim())) {
			return setErrors({
				...errors,
				start:true
			});
		}
		try {
			await saveEvent(updatingEvent);
			fnClose();
		} catch (err) {
			setErrors({
				...errors,
				server:true
			})
		}
	}

	const handleDeleteBtnClick = async (e) => {
		e.preventDefault();
		try {
			deleteEvent(event.id);
			fnClose();
		} catch (err) {
			setErrors({
				...errors,
				server:true
			})
		}
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
		if(id === 'start' || id === 'end') {
			setUpdatingEvent({
				...updatingEvent,
				[id]: formatDateTime(value)
			})
			return;
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
		let start = updatingEvent.start;
		let end = updatingEvent.end;
		if(value === 'on') {
			e.currentTarget.value= 'off';
		} else {
			e.currentTarget.value= 'on';
			start = formatDateTime(moment(start).startOf('day'));
			end = formatDateTime(moment(start).endOf('day'));
		}
		setUpdatingEvent({
			...updatingEvent,
			allDay: !updatingEvent.allDay,
			start,
			end
		})
	};
	return (
		<Container>
			<div className="errorContainer">
				{ errors.server && <Alert severity="error">Something went wrong with the connection. Try again later.</Alert> }
				{ errors.title && <Alert severity="error">Title is required.</Alert> }
				{ errors.start && <Alert severity="error">Start date time is required.</Alert> }
			</div>
			<form className={classes.form}>
				<TextField 
					id="title"
					label="Task"
					error={errors.title}
					helperText="Required"
					fullWidth
					className={classes.inputTextField}
					InputProps = {{
						className:classes.input
					}}
					defaultValue={updatingEvent.title}
					onBlur={handleFocusOut}
				/>
				<br/>
				
				<TextField
					id="end"
					label="Due"
					type="datetime-local"
					defaultValue={updatingEvent.end}
					fullWidth
					className={classes.inputTextField}
					InputLabelProps={{
						shrink: true,
					}}
					onBlur={handleFocusOut}
				/>
				<br />
				<TextField 
					id="notes"
					label="Notes"
					variant="standard"
					defaultValue={updatingEvent.notes}
					fullWidth
					multiline
					className={classes.inputTextField}
					onBlur={handleFocusOut}
				/>	
				<br/>
				<footer className={classes.formFooter}>
					{
						event.id && 
							<Button
								variant="outlined"
								color="primary"
								onClick={handleDeleteBtnClick}
								className={classes.formButton}
							>
								Delete
							</Button>
					}
					<Button
						variant="outlined"
						color="primary"
						onClick={handleSaveBtnClick}
						className={classes.formButton}
					>
						Save
					</Button>
					<Button
						variant="outlined"
						color="primary"
						onClick={fnClose}
						className={classes.formButton}
					>
						Cancel
					</Button>
				</footer>
				
			</form>
		</Container>
	)
}
