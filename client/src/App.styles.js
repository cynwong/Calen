import { makeStyles } from '@material-ui/core/styles';
import { teal, pink } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
	container: {
		flexGrow: 1,
		marginTop: theme.spacing(5),
	},
	bigPaper: {
		marginLeft: 'auto',
		marginRight:'auto',
		padding: theme.spacing(5),
		color:  teal[700],
		backgroundColor: pink[50],
		maxWidth: '90%'
	},
	paper: {
		marginLeft: 'auto',
		marginRight:'auto',
		padding: theme.spacing(5),
		color:  teal[700],
		backgroundColor: pink[50],
	},
	form: {
		width: '100%',
		padding: theme.spacing(2)
	},
	formTitle: {
		fontSize: '1.5rem',
		fontWeight: 700,
		color: teal[700],
		marginBottom: theme.spacing(3)
	},
	formFooter: {
		marginTop: theme.spacing(3),
		marginLeft: 'auto',
		marginRight: 0,
		display: 'flex',
		justifyContent: 'flex-end',
		alignContent: 'center'
	},
	formButton: {
		display:'block',
		margin: theme.spacing(1),
	},
	inputTextField: {
		color:  teal[900],
		backgroundColor: pink[50],
	},
	input: {
		color:  teal[900],
	},
	divider: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3)
	},
	margin: {
		margin: theme.spacing(1),
	},
	fullWidth: {
		width: '100%'
	}
}));

export default useStyles;