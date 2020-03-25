import { makeStyles } from '@material-ui/core/styles';
import { teal, pink } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
	container: {
		flexGrow: 1,
		marginTop: theme.spacing(5),
	},
	paper: {
		marginLeft: 'auto',
		marginRight:'auto',
		padding: theme.spacing(5),
		color:  teal[700],
		backgroundColor: pink[50],
		maxWidth: '65%'
	},
	formTitle: {
		fontSize: '1.5rem',
		fontWeight: 700,
		color: teal[700],
		marginBottom: theme.spacing(3)
	},
	formButton: {
		marginTop: theme.spacing(3),
		marginLeft: 'auto',
		marginRight: 0,
		display: 'block',
	},
	inputTextField: {
		color:  teal[900],
		backgroundColor: pink[50],
	},
	divider: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3)
	}
}));

export default useStyles;