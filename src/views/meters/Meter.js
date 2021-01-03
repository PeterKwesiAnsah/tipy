import React, { useContext, useEffect, useState } from 'react';
import Toolbar from './Toolbar';
import { UserContext } from '../../App';
import getReadings from '../../helpers/getReadings';
import Results from '../customers/Results';
import columns from '../../helpers/column';
import useAutoFetch from '../../hooks/useAutoFetch';
import prevCurrent from '../../helpers/prevCurrent';
import NoData from '../../components/NoData'
import {Button,Typography,Snackbar} from '@material-ui/core'
// import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios'
const Meter = () => {
	//Get the Global firebase  objects
	const { firebase } = useContext(UserContext).firebase;

	//Get the LLW llwid of the current user
	const [llwid] = useContext(UserContext).user;
	const [readings, setReadings, autoFetch] = useAutoFetch();
	const [fetch, setFetch] = useState(false);

	//search string state
	const [search, setSearch] = useState('');
	//database ref to the readings node with status read
	// const readingsRef = firebase
	// 	.database()
	// 	.ref(`readings2/${id}/${prevCurrent()[1]}`);
	// 	console.log(readingsRef)

	//write a function to auto check
	useEffect(() => {
		//determines if the component is mounted or not
		let mount = true;

		//get readings and update readings if readings exist
		if (mount && !fetch) getReadings(firebase, llwid, setReadings);

		return () => {
			mount = false;
		};
	}, [autoFetch,fetch]);

	useEffect(() => {
		const checkFetch = async () => {
			const readingsRef = firebase
				.database()
				.ref(`readings2/${llwid}/122020`);
			//check if there are readings 
			const readingSnapshot = await readingsRef.once('value');

			if(readingSnapshot.val()){
				setFetch(true)
			}
		};

		checkFetch();
	});
	console.log(new Date().toJSON())

	return (
		<div>
			{fetch ? (
				<>
					<Toolbar search={{ search, setSearch }}></Toolbar>
					<Results
						data={readings}
						search={search}
						columns={columns.meters}
						type={'meters'}
					></Results>
				</>
			) : <NoData button={<Button
				variant="contained"
				color="primary"
				onClick={() => {
					axios.get(
						'http://us-central1-tpwebsyeeee.cloudfunctions.net/app/requestrds/1603702629482'
					);
				}}
			>
				<Typography style={{color:'#fff',marginTop:'0'}}>Request Readings</Typography>
			</Button>}><p>No Readings Found for January</p></NoData>}
		</div>
	);
};

export default Meter;
