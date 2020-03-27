import React, { useContext } from 'react';

import { 
	Drawer,
	Hidden,
	Typography
} from '@material-ui/core';

import { useTheme } from '@material-ui/core/styles';

import MenuList from './MenuList/MenuList';

import AppContext from '../../../utils/AppContext';

import { useStyles } from './SideBar.styles';

export default function SideBar({open}) {
	const classes = useStyles();
	const theme = useTheme();
	const { toggleSideBar } = useContext(AppContext);
	
	const toggleDrawer = (e) => {
		if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
		return;
		}
		toggleSideBar();
	};

	return (
		<nav className={classes.drawer}>
			<Hidden implementation="css">
				<Drawer
					variant="temporary"
					anchor={theme.direction === 'rtl' ? 'right' : 'left'}
					open={open}
					onClose={toggleDrawer}
					classes={{
						paper: classes.drawerPaper,
					}}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
				>
					<Typography variant="h3" className={classes.title} gutterBottom>
						Calen
					</Typography>
					<MenuList />
				</Drawer>
			</Hidden>
		</nav>
	);
}
