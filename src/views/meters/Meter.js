import React, { useContext, useEffect, useState } from 'react';
import Toolbar from './Toolbar';
import { UserContext } from '../../App';
import getReadings from '../../helpers/getReadings';
import Results from '../customers/Results';
import columns from '../../helpers/column';
import useAutoFetch from '../../hooks/useAutoFetch'
const Meter = () => {
	//Get the Global firebase  objects
	const { firebase } = useContext(UserContext).firebase;

	//Get the LLW id of the current user
	const [id] = useContext(UserContext).user;
	const [readings, setReadings,autoFetch] = useAutoFetch();
	// const [autoFetch, setautoFetch] = useState(false);

	//search string state
	const [search, setSearch] = useState('');


	//write a function to auto check
	useEffect(() => {
		//determines if the component is mounted or not
		let mount = true;
		//get readings and update readings
		if (mount) getReadings(firebase, id, setReadings);

		return () => {
			mount = false;
		};
	}, [autoFetch]);
	return (
		<div>
			<Toolbar search={{ search, setSearch }}></Toolbar>
			<Results
				data={readings}
				search={search}
				columns={columns.meters}
				type={'meters'}
			></Results>
		</div>
	);
};

export default Meter;
