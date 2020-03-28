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
					<ListItem button>
						<ListItemText primary='Home' onClick={()=>history.push('/dashboard')} />
					</ListItem>
					<ListItem button>
						<ListItemText primary='Calendar' onClick={()=>history.push('/calendar')} />
					</ListItem>
					<ListItem button>
						<ListItemText primary='Diary' onClick={()=>history.push('/diary')} />
					</ListItem>
					<ListItem button>
						<ListItemText primary='Tasks' onClick={()=>history.push('/tasks')} />
					</ListItem>
					<ListItem button>
						<ListItemText primary='Meal Planner' onClick={()=>history.push('/mealplanner')} />
					</ListItem>
				</List>
			</div>
		</>
	);
}
