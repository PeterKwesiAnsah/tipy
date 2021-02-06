import React, { useContext, useEffect, useState } from 'react';
import Toolbar from './Toolbar';
import { UserContext } from '../../App';
import getReadings from '../../helpers/getReadings';
import Results from '../customers/Results';
import columns from '../../helpers/column';
import useAutoFetch from '../../hooks/useAutoFetch';
import prevCurrent from '../../helpers/prevCurrent';
import NoData from '../../components/NoData';
import {
	Button,
	Typography,
	Snackbar,
	FormControl,
	InputLabel,
	Select,
	makeStyles,
} from '@material-ui/core';
// import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';

//months of the year
const months = {
	January: '01',
	Febuary: '02',
	March: '03',
	April: '04',
	May: '05',
	June: '06',
	July: '07',
	August: '08',
	September: '09',
	October: '10',
	November: '11',
	December: '12',
};
const useStyle = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,

		'& *': {
			fontSize: '1.5rem',
		},
	},
}));
const Meter = () => {
	const classes = useStyle();
	//Get the Global firebase  objects
	const { firebase } = useContext(UserContext).firebase;

	//Get the LLW llwid of the current user
	const [llwid] = useContext(UserContext).user;
	const [readings, setReadings, autoFetch] = useAutoFetch();
	const [fetch, setFetch] = useState(false);

	//current month
	const [curMonth, setCurrent] = useState('122020');

	//search string state
	const [search, setSearch] = useState('');
	//database ref to the readings node with status read
	// const readingsRef = firebase
	// 	.database()
	// 	.ref(`readings2/${id}/${prevCurrent()[1]}`);
	// 	console.log(readingsRef)

	const handleChange = ({ target }) => {
		setCurrent(target.value);
		console.log('fuvk')
		console.log(target.value)
	};

	//write a function to auto check
	useEffect(() => {
		//determines if the component is mounted or not
		let mount = true;

		//get readings and update readings if readings exist
		if (mount && !fetch) getReadings(firebase, llwid, setReadings, curMonth);

		return () => {
			mount = false;
		};
	}, [autoFetch, fetch]);
	
	console.log(readings)

	useEffect(() => {
		const checkFetch = async () => {
			const readingsRef = firebase
				.database()
				.ref(`readings2/${llwid}/${curMonth}`);
			//check if there are readings
			const readingSnapshot = await readingsRef.once('value');

			if (readingSnapshot.val()) {
				setFetch(true);
			}
			else{
				setReadings([])
			}
		};

		checkFetch();
	},[curMonth]);
	// console.log(new Date().toJSON())

	return (
		<div>
			{
				<>
					<Toolbar search={{ search, setSearch }}></Toolbar>
					<Results
						data={readings}
						search={search}
						columns={columns.meters}
						type={'meters'}
						NoData={fetch}
						changeMonth={setCurrent}
					>
						<FormControl variant="outlined" className={classes.formControl}>
							<InputLabel htmlFor="outlined-age-native-simple">
								Month Readings
							</InputLabel>
							<Select
								native
								value={curMonth}
								onChange={handleChange}
								label="Show Monthly Readings"
							>
								{Object.entries(months).map(([key, value]) => (
									<option value={value + '2020'}>{key}</option>
								))}
							</Select>
						</FormControl>
					</Results>
				</>
				// ) : (
				// 	<NoData
				// 		button={
				// 			<Button
				// 				variant="contained"
				// 				color="primary"
				// 				onClick={() => {
				// 					axios.get(
				// 						'http://us-central1-tpwebsyeeee.cloudfunctions.net/app/requestrds/1603702629482'
				// 					);
				// 				}}
				// 			>
				// 				<Typography style={{ color: '#fff', marginTop: '0' }}>
				// 					Request Readings
				// 				</Typography>
				// 			</Button>
				// 		}
				// 	>
				// 		<p>No Readings Found for January</p>
				// 	</NoData>
			}
		</div>
	);
};

export default Meter;
