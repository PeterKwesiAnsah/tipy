import React,{useContext} from 'react';
import { Container, Grid, makeStyles,Typography } from '@material-ui/core';
import { UserContext } from '../../App';
import TasksProgress from './TasksProgress';
import TotalCustomers from './TotalCustomers';
import StatusByCount from './StatusTracker';
import NoData from '../../components/NoData'


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
//save count to local storage 

const Dashboard = () => {
	const classes = useStyles();
	//get the global status count
	const [status]=useContext(UserContext).count

	return (
		<div className={classes.root} title="Dashboard">
			<Container maxWidth={false}>
				<Grid container spacing={3}>
		
					<Grid item lg={3} sm={6} xl={3} xs={12}>
						<TotalCustomers count={status.customers}/>
					</Grid>
					<Grid item lg={3} sm={6} xl={3} xs={12}>
						<TasksProgress count={status} />
					</Grid>
					<div className={classes.center}>
						<Grid item lg={4} md={6} xl={3} xs={12}>
						{status.customers ===0 ?<NoData></NoData>: <StatusByCount  count={status}/>}	
						</Grid>
					</div>
				</Grid>
			</Container>
		</div>
	);
};

export default Dashboard;
