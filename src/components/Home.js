import React, { useState } from 'react';
import Topbar from '../layout/Dashboard/Topbar';
import LeftPane from '../layout/Main/LeftPane.js';
import NavPane from '../layout/Main/NavPane.js'
import { makeStyles } from '@material-ui/core';
import { Route, useHistory } from 'react-router-dom';
import Customers from '../views/customers/Customers';
import Dashboard from '../views/dashboard/Dashboard';
import Account from '../views/account/Account'
import Meter from '../views/meters/Meter';
import Bill from '../views/bill/Bill';
import Backdrop from '@material-ui/core/Backdrop';

const useStyles = makeStyles((theme) => ({
	main: {
		display: 'flex',
	},
	home: {
		width: '80vw',
		backgroundColor: '#F4F6F8',
		height: '100vh',
		'@media only screen and (max-width:62.5em)': {
			width: '100vw',
		},
	},

	backdrop: {
		zIndex: theme.zIndex.drawer + 8,
		position: 'fixed',
		width: '100vw',
		height: '100vh',
		color:'#fff',
		justifyContent:'end'
	},
}));

const Home = ({ firebase ,id}) => {
	//nav bar state
	const [showNav, setShowNav] = useState(false);

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
			<Topbar logout={logout} Navbar={{ setShowNav, showNav }}></Topbar>
			<main className={classes.main}>
				<LeftPane></LeftPane>
				<div className={classes.home}>
					<Route path="/home/customers">
						<Customers></Customers>
					</Route>
					<Route path="/home/dashboard">
						<Dashboard></Dashboard>
					</Route>
					<Route path="/home/meters">
						<Meter></Meter>
					</Route>
					<Route path="/home/bill">
						<Bill></Bill>
					</Route>
					<Route path="/home/account">
						<Account firebase={firebase} id={id}></Account>
					</Route>
				</div>
			</main>
			<Backdrop
				className={classes.backdrop}
				open={showNav}
				onClick={() => setShowNav(false)}
			>
				<NavPane></NavPane>
			</Backdrop>
		</div>
	);
};

export default Home;
