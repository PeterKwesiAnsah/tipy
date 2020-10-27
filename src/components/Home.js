import React from 'react';
import Topbar from '../layout/Dashboard/Topbar';
import LeftPane from '../layout/Main/LeftPane.js';
import { makeStyles } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';
import Customers from '../views/customers/Customers';

const useStyles = makeStyles({
	main: {
		display: 'flex',
		height: '100vh',
	},
});

const Home = () => {
	const classes = useStyles();

	// //get the current pathname
	// const { pathname } = useLocation();

	return (
		<div>
			<Topbar></Topbar>
			<main className={classes.main}>
				<LeftPane></LeftPane>
				<Switch>
					<div style={{ width: '80vw', backgroundColor: '#F4F6F8' }}>
						<Route path="/home/customers">
							<Customers></Customers>
						</Route>
					</div>
				</Switch>
			</main>
		</div>
	);
};

export default Home;
