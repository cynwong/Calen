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
		maxWidth: '90%',
		minHeight:350
	},
	paper: {
		marginLeft: 'auto',
		marginRight:'auto',
		padding: theme.spacing(5),
		color:  teal[700],
		backgroundColor: pink[50],
	},
	memo: {
		padding: theme.spacing(1),
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2),
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
		marginTop: theme.spacing(1.5)
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
	},
	taskListItem : {
		color: teal[700],
		textDecoration:'none',
		cursor: 'pointer'
	},
	addNewButton: {
		border: '1px dashed rgba(0, 0, 0, 0.12)',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: theme.spacing(3),
		width: '100%',
		cursor: 'pointer',
		marginTop: theme.spacing(2),
		padding: theme.spacing(2),
		borderRadius: 5,

		'&:hover': {
			background: "rgba(0, 0, 0, 0.04)",
		},
	}, 
	textAlignRight: {
		width: '100%',
		textAlign:'right'
	},
	h6: {
		color: teal[700],
		fontSize: '1.3em',
		fontWeight:700,
		margin: theme.spacing(1)
	}
}));

export default useStyles;