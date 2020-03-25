import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
		fontFamily: 'Playball, Lobster, Fredoka One, cursive',
		fontSize: '1.5rem'
	},
	button: {
		color: theme.palette.secondary.pale
	},
	username: {
		fontSize: '1rem'
	}
}));

export default useStyles;