import React, { useState, useContext, useEffect } from 'react';
// import { makeStyles } from '@material-ui/core';
import Toolbar from './Toolbar';
import Results from './Results';
import getCustom from '../../helpers/getCustom';
import { UserContext } from '../../App';
import columns from '../../helpers/column';
import useAutoFetch from '../../hooks/useAutoFetch';
import getCount from '../../helpers/getCount';
// import useLocalStorage from '../../hooks/useLocalStorage';

// const useStyles = makeStyles((theme) => ({
// 	root: {
// 		backgroundColor: '',
// 	},
// }));

const Customers = () => {
	// const classes = useStyles();

	// const [autoFetch, setautoFetch] = useState(false);

	//customers data state from firebase based on the current user
	const [data, setData, autoFetch] = useAutoFetch();

	//search string
	const [search, setSearch] = useState('');

	//Get the Global firebase  objects
	const { firebase } = useContext(UserContext).firebase;

	//Get the LLW id of the current user
	const [id] = useContext(UserContext).user;

	//
	const [status, setStatus] = useContext(UserContext).count;

	useEffect(() => {
		//determines if the component is mounted or not
		let mount = true;
		if (mount) {
			//update state only if the component is mounted
			setStatus({
				customers: data.length,
				pending: getCount('pending', data),
				read: getCount('read', data),
				failed: getCount('failed', data),
			});
			//update the local storage too
			localStorage.setItem(
				'count',
				JSON.stringify({
					customers: data.length,
					pending: getCount('pending', data),
					read: getCount('read', data),
					failed: getCount('failed', data),
				})
			);
			//add to local storage here too
		}

		return () => {
			mount = false;
		};
	}, [data]);

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
			<Toolbar
				search={{ search, setSearch }}
				data={data}
				status={status}
			></Toolbar>
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
