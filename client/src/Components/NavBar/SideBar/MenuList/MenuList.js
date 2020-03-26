import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import { 
	List,
	Divider,
	ListItem,
	ListItemIcon,
	ListItemText,
} from '@material-ui/core';

import AppContext from '../../../../utils/AppContext';

import { useStyles } from './MenuList.styles';

export default function MenuList() {
	const { toggleSideBar } = useContext(AppContext);
	const classes = useStyles();
	const history = useHistory();

	return (
		<>
			<div
				className={classes.list}
				role="presentation"
				onClick={toggleSideBar}
				onKeyDown={toggleSideBar}
			>
				<List>
					<ListItem button>
						<ListItemText primary='Home' onClick={()=>history.push('/dashboard')} />
					</ListItem>
					<ListItem button>
						<ListItemText primary='Calendar' onClick={()=>history.push('/calendar')} />
					</ListItem>
				</List>
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
