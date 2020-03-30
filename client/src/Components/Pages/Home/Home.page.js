import React, { useState, useContext } from 'react';
import clsx from 'clsx';

import PropTypes from 'prop-types';
import { 
	Box,
	Container,
	Fab,
	Paper,
	Typography,
	useTheme,
	Card,
	CardActionArea,
	CardMedia,
	CardContent,
	CardActions,
	Button,
} from '@material-ui/core';

import SwipeableViews from 'react-swipeable-views';

import AppContext from '../../../utils/AppContext';
import { useStyles } from './Home.styles';

import imgStep0 from './images/step-0.jpg';
import imgStep1 from './images/step-1.jpg';
import imgStep2 from './images/step-2.jpg';
import { useHistory } from 'react-router-dom';

function TabPanel(props) {
	const { children, value, index, ...other } = props;
	const show = value === index; 
	return (
		<Typography
			component="div"
			id={`action-tabpa
			nel-${index}`}
			{...other}
		>
			{show && (
				<Box p={3}>
					{children}
				</Box>
			)}
		</Typography>
	);
}
	
TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};
	
export default function HomePage() {
	const { classes } = useContext(AppContext);
	const history = useHistory();
	const localClasses = useStyles();
	
	const theme = useTheme();
	
	const [activeStep, setActiveStep] = useState(0);
	
	// steps to rotate
	const minStep = 0;
	const maxStep = 2;
	const handleNext = () => setActiveStep((prevActiveStep) => {
		let step = prevActiveStep + 1;
		if (step > maxStep) {
			step = minStep;
		}
		return step;
	});
	const handlePrev = () => setActiveStep((prevActiveStep) => {
		let step = prevActiveStep - 1;
		if(step < minStep) {
			step = maxStep;
		}
		return step;
	});
	const handleChangeIndex = (index) => setActiveStep(index);
	return (
		<Container className={classes.container}>
		<Paper className={classes.bigPaper}>
		<Fab 
			className={clsx(localClasses.fab, localClasses.fabLeft)} 
			color='secondary'
			onClick={handlePrev}
		>
            &lt;
		</Fab>
		<SwipeableViews
			axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
			index={activeStep}
			enableMouseEvents
			onChangeIndex={handleChangeIndex}
		>
			<TabPanel index={0} value={activeStep} className={localClasses.step0} dir={theme.direction}>
				<Card className={localClasses.card}>
					<CardMedia
						component="img"
						alt="Calen"
						image={imgStep0}
						title="Calen"
						height='150'
						width='300'
					/>
					<CardContent>
						<Typography gutterBottom variant="h5" component="h2" className={localClasses.cardTitle}>
							Calen
						</Typography>
						<Typography variant="body2" color="primary" component="p">
							Calen is a multi-purpose online organizer aiming to aid for better productivity and time management.
						</Typography>
					</CardContent>
					<CardActions className={classes.formFooter}>
						<Button 
							size="small" 
							color="primary"
							variant="outlined"
							onClick={()=> history.push('/signup')}
							className={classes.formButton}
						>
							Sign up today
						</Button>
					</CardActions>
				</Card>
			</TabPanel>
			<TabPanel index={1} value={activeStep} dir={theme.direction}>
				<Card className={localClasses.card}>
					<CardMedia
						component="img"
						alt="Calen"
						image={imgStep1}
						title="Calen"
						height='150'
						width='300'
					/>
					<CardContent>
						<Typography gutterBottom variant="h5" component="h2" className={localClasses.cardTitle}>
							Ready for action?
						</Typography>
						<Typography variant="body2" color="primary" component="p">
							Got a Calen account and ready? Log in now. 
						</Typography>
					</CardContent>
					<CardActions className={classes.formFooter}>
						<Button 
							size="small" 
							color="primary"
							variant="outlined"
							onClick={()=> history.push('/login')}
							className={classes.formButton}
						>
							Login
						</Button>
					</CardActions>
				</Card>
			</TabPanel>
			<TabPanel index={2} value={activeStep} dir={theme.direction}>
				<Card className={localClasses.card}>
					<CardMedia
						component="img"
						alt="Calen"
						image={imgStep2}
						title="Calen"
						height='150'
						width='300'
					/>
					<CardContent>
						<Typography gutterBottom variant="h5" component="h2" className={localClasses.cardTitle}>
							Get more done
						</Typography>
						<Typography variant="body2" color="primary" component="p">
							Now more easier to use and better to organize.
						</Typography>
					</CardContent>
					<CardActions className={classes.formFooter}>
						<Button 
							size="small" 
							color="primary"
							variant="outlined"
							onClick={()=> history.push('/signup')}
							className={classes.formButton}
						>
							Sign up today
						</Button>
					</CardActions>
				</Card>
			</TabPanel>
		</SwipeableViews>
		<Fab 
			className={clsx(localClasses.fab, localClasses.fabRight)}
			size='medium'
			onClick={handleNext}
		>
            &gt;
		</Fab>
		</Paper>
		</Container>
	);
}
	
		