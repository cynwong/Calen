import React, { useState, useContext } from 'react';

import { useHistory } from 'react-router-dom';

import moment from 'moment';

import { 
	Button,
	Container,
	FormControlLabel,
	Switch,
	TextField,
	Typography
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import AppContext from '../../../utils/AppContext';

import { formatDateString, parseDateString } from '../../../constants';

export default function EventForm({event, from='/calendar'}) {
	const { 
		saveEvent,
		deleteEvent,
		classes,
	} = useContext(AppContext);
	const [errors, setErrors] = useState({});

	const formatDateTime = (m) => m.format(formatDateString);

	const fnClose = () => history.push(from);

	const allDay = 'true'.localeCompare(event.allDay) === 0 ;
	const [updatingEvent, setUpdatingEvent] = useState({
		...event,
		allDay: allDay,
		start: allDay ? formatDateTime(moment(event.start, parseDateString).startOf('day')) : formatDateTime(moment(event.start, parseDateString)),
		end: allDay ? formatDateTime(moment(event.start, parseDateString).endOf('day')) : formatDateTime(moment(event.end, parseDateString)),
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
				[id]: formatDateTime(moment(value))
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
			{
				event.id ? (
					<Typography variant="h2" className={classes.formTitle} gutterBottom>
						Edit event
					</Typography>
				) :(
					<Typography variant="h2" className={classes.formTitle} gutterBottom>
						Add new event
					</Typography>
				)
			}
			<form className={classes.form}>
				<TextField 
					id="title"
					label="Title"
					variant="standard"
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
				<FormControlLabel
						id='allDay'
						value={updatingEvent.allDay ? 'on': 'off'}
						control={<Switch checked={updatingEvent.allDay} color="primary" />}
						label="All Day Event"
						labelPlacement="start"
						onChange={handleAllDayChange}
				/>
				<br />
				<TextField
					id="start"
					label="Start time"
					type="datetime-local"
					helperText="Required"
					error={errors.start}
					defaultValue={updatingEvent.start}
					className={classes.inputTextField}
					InputLabelProps={{
						shrink: true,
					}}
					InputProps = {{
						className: classes.input
					}}
					fullWidth
					onBlur={handleFocusOut}
				/>
				<br/>
				{
					(!updatingEvent.allDay) && (
						<>
							<TextField
								id="end"
								label="End time"
								type="datetime-local"
								defaultValue={updatingEvent.end}
								fullWidth
								className={classes.inputTextField}
								InputLabelProps={{
									className: classes.input,
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
					defaultValue={(updatingEvent.desc && updatingEvent.desc.length > 0) ? updatingEvent.desc.join("\n") : ''}
					multiline
					className={classes.inputTextField}
					InputProps = {{
						className: classes.input
					}}
					onBlur={handleFocusOut}
				/>
				<br/>
				<TextField 
					id="location"
					label="Location"
					variant="standard"
					defaultValue={updatingEvent.location}
					fullWidth
					className={classes.inputTextField}
					InputProps = {{
						className: classes.input
					}}
					onBlur={handleFocusOut}
				/>	
				<br/>
				<TextField 
					id="notes"
					label="Notes"
					variant="standard"
					defaultValue={(updatingEvent.notes && updatingEvent.notes.length > 0) ? updatingEvent.notes.join("\n") : ''}
					fullWidth
					multiline
					className={classes.inputTextField}
					InputProps = {{
						className: classes.input
					}}
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
