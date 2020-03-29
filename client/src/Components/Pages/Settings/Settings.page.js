import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
	Container,
	Paper, 
	Typography, 
	Divider,
	List,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
	IconButton,
	TextField,
	Button
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import InputColor from 'react-input-color';
// import ColorPicker from "material-ui-color-picker";

import AppContext from '../../../utils/AppContext';

import { defaultSettings } from '../../../config/constants';

import useStyle from './Settings.page.styles';

export default function SettingsPage() {
	const { classes, user: { settings }, updateSettings } = useContext(AppContext);
	const localClasses = useStyle();
	const history = useHistory();
	const [values, setValues] = useState(settings || defaultSettings);
	const deleteCalendar = (id) => (e) => {
		e.preventDefault();
		setValues({
			...values,
			googleCalendarIds: [...values.googleCalendarIds].filter((value) => value !== id)
		});
	}

	const handleKeyDown = (e) => {
		if(e.keyCode === 13) {
			const { value } = e.target;
			if(value.trim()) {
				setValues({
					...values,
					googleCalendarIds: [...values.googleCalendarIds, value]
				});
			}
		}
	}

	return (
		<Container className={classes.container} maxWidth='sm'>
			<Paper className={classes.paper}>
				<Typography variant="h6" gutterBottom>
					Colour settings
				</Typography>
				<div className={localClasses.pickerContainer}>
					<span className={localClasses.pickerLabel}>Calendar:</span>
					<InputColor 
						id='calendarColor'
						style={{ width: 20, height: 20}}
						initialHexColor={values.calendarColour}
						onChange={(color)=>setValues({...values, calendarColour: color.hex})}
					/>
				</div>
				<div className={localClasses.pickerContainer}>
					<span className={localClasses.pickerLabel}>Diary:</span>
					<InputColor 
						id='diaryColour'
						style={{ width: 20, height: 20}}
						initialHexColor={values.diaryColour}
						onChange={(color)=>setValues({...values, diaryColour: color.hex})}
					/>
				</div>
				<div className={localClasses.pickerContainer}>
					<span className={localClasses.pickerLabel}>Menu:</span>
					<InputColor 
						id='mealPlanColour'
						style={{ width: 20, height: 20}}
						initialHexColor={values.mealPlanColour}
						onChange={(color)=>setValues({...values, mealPlanColour: color.hex})}
					/>
				</div>
				<div className={localClasses.pickerContainer}>
					<span className={localClasses.pickerLabel}>Task:</span>
					<InputColor 
						id='taskColour'
						style={{ width: 20, height: 20}}
						initialHexColor={values.taskColour}
						onChange={(color)=>setValues({...values, taskColour: color.hex})}
					/>
				</div>
				<Divider className={classes.divider} />
				<Typography variant="h6" gutterBottom>
					Add google calendar ids
				</Typography>
				<div>
					<List>
						{
							values.googleCalendarIds && 
							values.googleCalendarIds.length > 0 &&
							values.googleCalendarIds.map((id) =>
								<ListItem key='id'>
									<ListItemText
										primary={id}
									/>
									<ListItemSecondaryAction>
										<IconButton edge="end" onClick={deleteCalendar(id)}>
										<DeleteIcon />
										</IconButton>
									</ListItemSecondaryAction>
								</ListItem>
							)
						}
					</List>
					<TextField 
						id="addNew" 
						label="Add calendar" 
						InputProps={{
							className: classes.inputTextField
						}}
						className={classes.inputTextField}
						fullWidth
						onKeyDown={handleKeyDown}
					/>
				</div>
				<footer className={classes.formFooter}>
					<Button 
						variant="outlined"
						onClick={()=>{updateSettings(values); history.push('/dashboard')}}
						color='primary'
						className={classes.formButton}
					>
						Save
					</Button>
					<Button 
						variant="outlined"
						onClick={()=> history.push('/dashboard')}
						color='primary'
						className={classes.formButton}
					>
						Cancel
					</Button>
				</footer>
			</Paper>
		</Container>
	)
}
