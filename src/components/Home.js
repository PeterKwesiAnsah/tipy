import React from 'react';
import Topbar from '../layout/Dashboard/Topbar';
import LeftPane from '../layout/Main/LeftPane.js';
import { makeStyles } from '@material-ui/core';
import { Route,useHistory } from 'react-router-dom';
import Customers from '../views/customers/Customers';
import Dashboard from '../views/dashboard/Dashboard';
import Meter from '../views/meters/Meter';

const useStyles = makeStyles({
	main: {
		display: 'flex',
	},
});

const Home = ({ firebase }) => {
	const classes = useStyles();

	const history = useHistory();

	//allows user to logout from his account
	const logout = () => {
		firebase
			.auth()
			.signOut()
			.then(() => {
				history.push('/');
			})
			.catch(function (error) {
				// An error happened.
			});
	};

	return (
		<div>
			<Topbar logout={logout}></Topbar>
			<main className={classes.main}>
				<LeftPane></LeftPane>
					<div style={{ width: '80vw', backgroundColor: '#F4F6F8' }}>
						<Route path="/home/customers">
							<Customers></Customers>
						</Route>
						<Route path="/home/dashboard">
							<Dashboard></Dashboard>
						</Route>
						<Route path="/home/meters">
							<Meter></Meter>
						</Route>
					</div>
			
			</main>
		</div>
	);
};

export default Home;
