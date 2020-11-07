import React from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';

import Budget from './Budget';

import TasksProgress from './TasksProgress';
import TotalCustomers from './TotalCustomers';
import TotalProfit from '../meters/PendMeters';
import TrafficByDevice from './StatusTracker';

const useStyles = makeStyles((theme) => ({
	root: {
		minHeight: '100%',
		paddingBottom: theme.spacing(3),
		paddingTop: theme.spacing(3),
		backgroundColor: 'rgb(244, 246, 248)',
		fontSize: '1.5rem',
		'& *': {
			fontSize: 'inherit',
		},
		'& svg': {
			width: '1.3em',
			height: '1.3em',
		},
	},
	center:{
		width:'100%',
		display:'grid',
		placeItems:'center',
	


	}
}));

const Dashboard = () => {
	const classes = useStyles();

	return (
		<div className={classes.root} title="Dashboard">
			<Container maxWidth={false}>
				<Grid container spacing={3}>
					{/* <Grid item lg={3} sm={6} xl={3} xs={12}>
						<Budget />
					</Grid> */}
					<Grid item lg={3} sm={6} xl={3} xs={12}>
						<TotalCustomers />
					</Grid>
					<Grid item lg={3} sm={6} xl={3} xs={12}>
						<TasksProgress />
					</Grid>
					{/* <Grid item lg={3} sm={6} xl={3} xs={12}>
						<TotalProfit />
					</Grid> */}
					<div className={classes.center}>
						<Grid item lg={4} md={6} xl={3} xs={12}>
							<TrafficByDevice />
						</Grid>
					</div>
				</Grid>
			</Container>
		</div>
	);
};

export default Dashboard;
