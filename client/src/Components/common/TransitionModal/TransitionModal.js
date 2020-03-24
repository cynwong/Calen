import React from 'react';

import { Modal, Backdrop, Fade } from '@material-ui/core';

import EventForm from '../EventForm/EventForm';

import useStyles from './TransitionModel.styles';

export default function TransitionsModal({open, event, closeModal}) {
	const classes = useStyles();

	return (
		<Modal
			className={classes.modal}
			open={open}
			onClose={closeModal}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}
		>
			<Fade in={true}>
				<div className={classes.paper}>
					<h2 id="transition-modal-title" className={classes.modalTitle}>
						{event.isNew ? (
							"Add new event"
						) : (
							"Edit event"
						)

						}
					</h2>
					<EventForm event={event} closeModal={closeModal}/>
				</div>
			</Fade>
		</Modal>
	);
}
