import { makeStyles } from "@material-ui/core";
import { pink, teal } from "@material-ui/core/colors";


export const useStyles = makeStyles((theme) => ({
	root: {
		background: pink[50],
		width: '100%',
		position: 'relative',
		minHeight: 500,
	},
	fab: {
		display:'block',
		position: 'fixed',
		top: '50vh',
		backgroundColor: "rgba(252, 228, 236,0.1)",
		color: teal[800],

		'&:hover':{
			backgroundColor: "rgba(252, 228, 236,0.4)"
		},
	},
	fabRight: {
		right: theme.spacing(4)
	},
	fabLeft: {
		left: theme.spacing(4)
	},
	cardTitle: {
		fontFamily: 'Playball, Lobster, Fredoka One, cursive',
		fontSize: '2rem',
		fontWeight: 700,
		marginTop: theme.spacing(1),
		color: teal[700]
	},
	card: {
		width: '100%',
		minHeight: 400,
		color: teal[700],
	}
}));