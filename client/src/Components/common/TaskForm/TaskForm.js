import React, { useState, useContext } from 'react';

import { useHistory } from 'react-router-dom';

import moment from 'moment';
import clsx from 'clsx';

import { 
	Button,
	Container,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import { formatDateString, parseDateString } from '../../../constants';
import AppContext from '../../../utils/AppContext';

import { useStyles } from './TaskForm.styles';

export default function TaskForm({event}) {
	const { 
		saveEvent,
		deleteEvent,
		classes,
	} = useContext(AppContext);
	const localClasses = useStyles();
	const [errors, setErrors] = useState({});

	const formatDateTime = (m) => m.format(formatDateString);
	const parseDateFormat = (dateTime) => moment(dateTime, parseDateString);

	const fnClose = () => history.push('/tasks');

	const allDay = 'true'.localeCompare(event.allDay) === 0 ;
	const [updatingEvent, setUpdatingEvent] = useState({
		...event,
		allDay: allDay,
		start: formatDateTime(parseDateFormat(new Date())),
		end: event.end ? formatDateTime(parseDateFormat(event.end)) : '',
	});
	const history = useHistory();
	

	const handleSaveBtnClick = async (e) => {
		e.preventDefault();
		if(!updatingEvent.title || (updatingEvent.title && !updatingEvent.title.trim())) {
			return setErrors({
				...errors,
				title: true
			});
		}
		try {
			await saveEvent(updatingEvent);
			fnClose();
		} catch (err) {
			setErrors({
				...errors,
				server: true
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
		if(id === 'title') {
			// check if required data are there
			if(!value.trim()){
				return setErrors({
					...errors,
					[id]: true
				});
			}
		}
		if(id === 'end') {
			setUpdatingEvent({
				...updatingEvent,
				[id]: formatDateTime(parseDateFormat(value))
			})
			return;
		}

		// save data
		if(id === 'notes'){
			setUpdatingEvent({
				...updatingEvent,
				[id]: value.split(/\r?\n/)
			})
			return;
		}
		setUpdatingEvent({
			...updatingEvent,
			[id]: typeof value === 'string' ?  value.trim() : value
		});
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
					InputLabelProps = {{
						className: classes.input
					}}
					FormHelperTextProps= {{
						className: classes.input
					}}
					defaultValue={updatingEvent.title}
					onBlur={handleFocusOut}
				/>
				<br/>
				<FormControl className={clsx(localClasses.formControl, classes.inputTextField)} >
					<InputLabel id="category-label" className={classes.input}>Category</InputLabel>
					<Select
						labelId="category-label"
						id="category"
						value={updatingEvent.category}
						defaultValue={0}
						onChange={handleFocusOut}
						className={clsx(localClasses.selectEmpty, classes.inputTextField)} 
						InputLabelProps = {{
							className: classes.input
						}}
					>
						<MenuItem value={0} className={classes.input}>Uncategorized</MenuItem>
						<MenuItem value={1} className={classes.input}>ToDo</MenuItem>
						<MenuItem value={2} className={classes.input}>Bucket list</MenuItem>
						<MenuItem value={3} className={classes.input}>Goal</MenuItem>
						<MenuItem value={4} className={classes.input}>Schedule</MenuItem>
					</Select>
				</FormControl>
				<br/>
				{
					updatingEvent.category === 4 && (
						<>
							<TextField
								id="Start"
								label="Start"
								type="datetime-local"
								defaultValue={updatingEvent.start}
								fullWidth
								className={classes.inputTextField}
								InputLabelProps={{
									shrink: true,
									className: classes.input
								}}
								InputProps = {{
									className:classes.input
								}}
								onBlur={handleFocusOut}
							/>
							<br />
						</>
					)
				}
				<TextField
					id="end"
					label="Due"
					type="datetime-local"
					defaultValue={updatingEvent.end}
					fullWidth
					className={classes.inputTextField}
					InputLabelProps={{
						shrink: true,
						className: classes.input
					}}
					InputProps = {{
						className:classes.input
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
					InputLabelProps = {{
						className: classes.input
					}}
					InputProps = {{
						className:classes.input
					}}
					className={classes.inputTextField}
					onBlur={handleFocusOut}
				/>	
				<br/>
				<footer className={classes.formFooter}>
					{
						updatingEvent.id && 
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
