import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import moment from 'moment';

import { Button, TextField, Typography } from '@material-ui/core';

// text editor
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

// local component
import AlertComponent from '../AlertComponent/AlertComponent';

import AppContext from '../../../utils/AppContext';

import { formatDateString, parseDateString } from '../../../constants';

// styles
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './diaryForm.styles.scss'


export default function DiaryForm({event}) {
	const { classes, saveEvent, deleteEvent } = useContext(AppContext);

	// convert to event so that we can pass it to database and full calendar
	const formatDateTime = (m) => m.format(formatDateString);
	const parseDateTime = (dateTime) => moment(dateTime,parseDateString);
	const startTime = parseDateTime(event.start);

	const [serverError, setServerError] = useState(false);
	
	const history = useHistory();
	const fnClose = () => history.push('/diary');
	
	// set up editorState
	const html = event.entry ? event.entry: '';
	const contentBlock = htmlToDraft(html);
	const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
	const initialEditorState = EditorState.createWithContent(contentState);
	const [editorState,setEditorState] = useState(initialEditorState);

	const handleSaveBtnClick = async (e) => {
		e.preventDefault();
		// convert to html for saving
		const entry = draftToHtml(convertToRaw(editorState.getCurrentContent()));
		try {
			const updatingEvent = {
				...event,
				type:1,
				title: 'entry',
				entry,
				allDay: true,
				start: formatDateTime(startTime.startOf('day')),
				end: formatDateTime(startTime.endOf('day')),
			};
			await saveEvent(updatingEvent);
			fnClose();
		} catch (err) {
			setServerError(true);
		}
	}

	const handleDeleteBtnClick = (e) => {
		e.preventDefault();
		try {
			deleteEvent(event.id);
			fnClose();
		} catch (err) {
			setServerError(true);
		}
	}

	return (
		<>
			<Typography variant="h2" className={classes.formTitle} gutterBottom>
				{moment(event.start).format('DD MMMM, YYYY')}
			</Typography>
			<form className={classes.form} noValidate>
				{
					serverError && 
						<AlertComponent type='error' identifier='server' text='' />
				}
				<TextField
					label="Date"
					type="date"
					defaultValue={moment(event.start).format('YYYY-MM-DD')}
					className={classes.inputTextField}
					InputProps={{
						readOnly: true,
						className: classes.input
					}}
					InputLabelProps={{
						shrink: true,
					}}
				/>
				
				<Editor
					toolbar={{options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'emoji',]	}}
					editorState={editorState}
					initialContentState={{}}
					toolbarClassName="editor-toolbar"
					wrapperClassName="editor-wrapper"
					editorClassName="editor"
					onEditorStateChange={(newState) => setEditorState(newState)}
				/>
				<footer className={classes.formFooter}>
					{
						event.id && 
							<Button
								variant="outlined"
								color="primary"
								className={classes.formButton}
								onClick={handleDeleteBtnClick}
							>
								Delete
							</Button>
					}
					<Button 
						variant="outlined"
						color='primary'
						className={classes.formButton}
						onClick={handleSaveBtnClick}
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
		</>
	)
}
