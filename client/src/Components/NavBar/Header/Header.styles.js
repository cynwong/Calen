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
}));

export default useStyles;