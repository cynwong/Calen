import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap',
		fontFamily: "Arial, Helvetica Neue, Helvetica, sans-serif",
		fontSize: 7,
		margin: "1em auto",
		padding: "1.5rem 2rem",
		borderRadius: 10,
		width: '90%'

	},
	form: {
		width:'100%',
	},
	textField: {
		margin: theme.spacing(1),
		marginBottom: theme.spacing(2),
	},
}));
export default useStyles;