import { createMuiTheme } from '@material-ui/core/styles';
import { teal } from '@material-ui/core/colors';

const theme = createMuiTheme({
	typography: {
		fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif"
	},
	palette: {
		primary: {
			light: teal[200],
			main: teal[500],
			dark: teal[900],
			contrastText: '#1f1f1f',
		},
		secondary: {
			light: '#f381a7',
			main: '#f06292',
			dark: '#a84466',
			contrastText: '#fcfcfc',
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