import { makeStyles } from '@material-ui/core/styles';
import { pink } from '@material-ui/core/colors';


export const useStyles = makeStyles((theme)  => ({
	formControl: {
		width: '100%'
	},
	selectEmpty: {
		backgroundColor: pink[50],
		marginTop: theme.spacing(2),
	},
	menuItem: {
		backgroundColor: pink[50]
	},
}));
