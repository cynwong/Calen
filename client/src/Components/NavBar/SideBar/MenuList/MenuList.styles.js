import { makeStyles } from '@material-ui/core/styles';
import theme from '../../../../App.theme';


export const useStyles = makeStyles({
	list: {
		minWidth: 250,
		width: '25%',
		display: 'block',
		marginLeft: 'auto',
		marginRight: 'auto',
		color: theme.palette.primary.main
	},
});