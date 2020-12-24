import React, { useContext } from 'react';
import {
	Container,
	Grid,
	makeStyles,
	Typography,
	Button,
} from '@material-ui/core';
import { UserContext } from '../../App';
import TasksProgress from './TasksProgress';
import TotalCustomers from './TotalCustomers';
import StatusByCount from './StatusTracker';
import NoData from '../../components/NoData';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
	root: {
		minHeight: '100%',
		paddingBottom: theme.spacing(3),
		paddingTop: theme.spacing(3),
		backgroundColor: 'rgb(244, 246, 248)',
		fontSize: '1.5rem',
		overflow:'hidden',
		'& *': {
			fontSize: 'inherit',
		},
		'& svg': {
			width: '1.3em',
			height: '1.3em',
		},
	},
	center: {
		width: '100%',
		display: 'grid',
		placeItems: 'center',
	},
	flex: {
		display: 'flex !important',
		width: '100% !important',
		margin: '2rem !important',
		'& > div': {
			marginRight: 'inherit !important',
			marginBottom:'1.5rem'
		},
		'@media only screen and (max-width:62.5em)':{
			flexDirection:'column'
		}
	},
}));
//save count to local storage

const Dashboard = () => {
	const classes = useStyles();
	//get the global status count
	const [status] = useContext(UserContext).count;

	return (
		<div className={classes.root} title="Dashboard">
			<div
				style={{
					textAlign: 'right',
					marginBottom: '1.5rem',
					marginRight: '1rem',
				}}
			>
				<Button
					variant="contained"
					color="primary"
					onclick={() => {
						axios.get(
							'http://us-central1-tpwebsyeeee.cloudfunctions.net/app/requestrds/1603702629482'
						);
					}}
				>
					<Typography>Request Readings</Typography>
				</Button>
			</div>

			<Container maxWidth={false}>
				<Grid container spacing={3}>
					<div
						className={classes.flex}
						// style={{ display: 'flex', width: '100%', margin: '2rem'}}
					>
						<Grid item lg={3} sm={6} xl={3} xs={12}>
							<TotalCustomers count={status.customers} />
						</Grid>
						<Grid item lg={3} sm={6} xl={3} xs={12}>
							<TasksProgress count={status} />
						</Grid>
					</div>

					<div className={classes.center}>
						<Grid item lg={4} md={6} xl={3} xs={12}>
							{status.customers === 0 ? (
								<NoData></NoData>
							) : (
								<StatusByCount count={status} />
							)}
						</Grid>
					</div>
				</Grid>
			</Container>
		</div>
	);
};

export default Dashboard;
