import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { 
	CssBaseline,
	List,
	Divider,
	ListItem,
	ListItemIcon,
	ListItemText,
} from '@material-ui/core';

import AppContext from '../../../../utils/AppContext';

import { useStyles } from './MenuList.styles';

export default function MenuList() {
	const { user, toggleSideBar } = useContext(AppContext);
	const classes = useStyles();

	return (
		<>
			<CssBaseline />
			<div
				className={classes.list}
				role="presentation"
				onClick={toggleSideBar}
				onKeyDown={toggleSideBar}
			>
				{/* <List>
					
					{['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
						<ListItem button key={text}>
						<ListItemText primary={text} />
					</ListItem>
					))}
				</List>
				<Divider />
				<List>
					{['All mail', 'Trash', 'Spam'].map((text, index) => (
					<ListItem button key={text}>
						<ListItemText primary={text} />
					</ListItem>
					))}
				</List> */}
			</div>
		</>
	);
}
