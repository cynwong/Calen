import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		marginTop: theme.spacing(5),
	},
	paper: {
		marginLeft: 'auto',
		marginRight:'auto',
		padding: theme.spacing(5),
		color:  theme.palette.primary.main,
		backgroundColor: theme.palette.secondary.pale,
		maxWidth: '65%'
	},
	title: {
		fontSize: '1.5rem',
		fontWeight: 700,
		color: theme.palette.primary.main,
		marginBottom: theme.spacing(3)
	},
	button: {
		marginTop: theme.spacing(3),
		marginLeft: 'auto',
		marginRight: 0,
		display: 'block',
	},
	input: {
		color:  theme.palette.primary.dark,
		backgroundColor: theme.palette.secondary.pale,
	},
	divider: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3)
	}

}));

export default useStyles;