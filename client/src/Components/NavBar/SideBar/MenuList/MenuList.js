import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { 
	List,
	ListItem,
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
					<ListItem button onClick={()=>history.push('/dashboard')}>
						<ListItemText primary='Home' />
					</ListItem>
					<ListItem button onClick={()=>history.push('/calendar')}>
						<ListItemText primary='Schedule' />
					</ListItem>
					<ListItem button onClick={()=>history.push('/diary')}>
						<ListItemText primary='Diary' />
					</ListItem>
					<ListItem button onClick={()=>history.push('/tasks')}>
						<ListItemText primary='Tasks' />
					</ListItem>
					{/* <ListItem button onClick={()=>history.push('/mealplanner')}> 
						<ListItemText primary='Meal Planner' />
					</ListItem> */}
				</List>
			</div>
		</>
	);
}
