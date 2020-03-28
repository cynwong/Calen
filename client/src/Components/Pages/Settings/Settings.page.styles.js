import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	pickerContainer: {
		display: "flex",
		alignItems: "center",
		margin: 9,
	},
	pickerLabel: {
		display: 'inline-block',
		marginRight: 10
	},
	picker: {
		width: 20,
		height: 20,
	}
}));

export default useStyles;