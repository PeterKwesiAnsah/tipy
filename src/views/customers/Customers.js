import React, { useState, useContext, useEffect } from 'react';
// import { makeStyles } from '@material-ui/core';
import Toolbar from './Toolbar';
import Results from './Results';
import getCustom from '../../helpers/getCustom';
import { UserContext } from '../../App';
import columns from '../../helpers/column';

// const useStyles = makeStyles((theme) => ({
// 	root: {
// 		backgroundColor: '',
// 	},
// }));

const Customers = () => {
	// const classes = useStyles();

	const [autoFetch, setautoFetch] = useState(false);

	//customers data state from firebase based on the current user
	const [data, setData] = useState([]);

	//search string
	const [search, setSearch] = useState('');

	//Get the Global firebase  objects
	const { firebase } = useContext(UserContext).firebase;

	//Get the LLW id of the current user
	const [id] = useContext(UserContext).user;

	useEffect(() => {
		setTimeout(() => {
			//after 10s if the data stae hasn't updated force updates
			if (data.length === 0) {
				setautoFetch(true);
			}
		}, 8000);
		//cleaning up
		return () => {
			clearTimeout();
		};
	});

	//get data from firebase based on the current User
	useEffect(() => {
		//determines if the component is mounted or not
		let mount = true;

		getCustom(firebase, id).then((data) => {
			//update state only if the component is mounted
			if (mount) setData(data);
		});

		return () => {
			mount = false;
		};
	}, [autoFetch]);

	return (
		<div>
			<Toolbar search={{ search, setSearch }} data={data}></Toolbar>
			<Results
				data={data}
				search={search}
				columns={columns.customers}
				type={'customers'}
			></Results>
		</div>
	);
};

export default Customers;
