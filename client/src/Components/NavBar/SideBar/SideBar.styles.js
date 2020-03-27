import { makeStyles } from '@material-ui/core/styles';


const drawerWidth = 300;

export const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
	},
	drawer: {
		[theme.breakpoints.up('sm')]: {
			width: drawerWidth,
			flexShrink: 0,
		},
	},
	drawerPaper: {
		width: drawerWidth,
		backgroundColor: theme.palette.secondary.light,
		paddingTop: theme.spacing(5),
		paddingLeft: 'auto',
		paddingRight: 'auto',
	},
	title: {
		fontFamily: 'Playball, Lobster, Fredoka One, cursive',
		display:'block',
		marginLeft: 'auto',
		marginRight: 'auto',
		color: theme.palette.primary.main
	},
}));