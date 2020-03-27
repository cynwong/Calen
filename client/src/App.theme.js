import { createMuiTheme } from '@material-ui/core/styles';
import { teal, pink } from '@material-ui/core/colors';

const theme = createMuiTheme({
	typography: {
		fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif"
	},
	palette: {
		primary: {
			light: teal[500],
			main: teal[700],
			dark: teal[900],
			contrastText: pink[100],
		},
		secondary: {
			pale: pink[50],
			light: pink[100],
			main: pink[200],
			dark:pink[500],
			contrastText: teal[900],
		},
		error: {
			light: "#e57373",
			main: "#f44336",
			dark: "#d32f2f",
			contrastText: "#fff",
		}
	},
	status: {
		danger: 'orange',
	},
});

export default theme;