import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius:10
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		width:'80%',
		height: '85%',
		borderRadius:10,
		outline: 0
	},
	modalTitle: {
		fontSize: "2rem",
		fontWeight: "bold",
		textAlign: "center",
		color: theme.palette.primary.dark,
		margin: "1rem",
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
	},
}));

export default useStyles;
