import React, { useState, useEffect } from 'react';
import Topbar from '../layout/Dashboard/Topbar';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import filters from '../helpers/filters';
import getReadings from '../helpers/getReadings';
import useAutoFetch from '../hooks/useAutoFetch';
import { makeStyles, Button } from '@material-ui/core';
import { CSVLink } from 'react-csv';
import exportData from '../helpers/exportData'
import getDate from '../helpers/dateGen'
const useStyles = makeStyles({
	breadcrumb: {
		padding: '2rem',
		fontSize: '1.5rem',
		backgroundColor: 'rgba(0, 99, 123, 0.27)',
		'& *': {
			fontSize: 'inherit',
		},
	},
	container: {
		fontSize: '1.35rem',
		display: 'grid',
		placeItems: 'center',
		// backgroundColor: '#f4f6f8',
		width: '100%',
		gridTemplateColumns: 'repeat(2,1fr)',
		marginTop: '4rem',
		gap: '4rem',
		'& *': {
			fontSize: 'inherit',
		},
	},
	formControl: {
		justifySelf: 'self-end',
	},

	button: {
		justifySelf: 'self-start',
	},
});
const Export = ({ firebase, id }) => {
	const classes = useStyles();
	//hides or show the export button
	const [hideBtn, setHideBtn] = useState(true);

	//A state for the monthly data
	const [monthData, setMonthData] = useState({ month: '', data: [] });

	//Hook provides readings states of the customer
	const [readings, setReadings, autoFetch] = useAutoFetch();

	useEffect(() => {
		//determines if the component is mounted or not
		let mount = true;
		//get readings and update readings
		if (mount) 
		// eslint-disable-next-line
		getReadings(firebase, id, setReadings);

		return () => {
			mount = false;
		};
	}, [autoFetch]);

	const handleChange = ({ target }) => {
		//update the monthdata state with the month selected by the user and it's data
		setMonthData({
			month: target.value,
			data: filters.meters(target.value, readings),
		});

		//Allow user to export the data selected
        setHideBtn(false);
        
        if(target.value === ""){
            //if nothing is selected ..setHideBtn to true
            setHideBtn(true); 
        }
	};
	return (
		<div>
			<Topbar></Topbar>
			<div className={classes.breadcrumb}>
				<Breadcrumbs
					aria-label="breadcrumb"
					separator={<NavigateNextIcon fontSize="small" />}
				>
					<Link color="inherit" href="/home/dashboard">
						<Typography>Dashboard</Typography>
					</Link>
					<Link color="inherit" href="/home/customers">
						<Typography>Customers</Typography>
					</Link>
				</Breadcrumbs>
			</div>
			<div className={classes.container}>
				<FormControl variant="outlined" className={classes.formControl}>
					<InputLabel htmlFor="outlined-age-native-simple">Month</InputLabel>
					<Select
						native
						value={monthData.month}
						onChange={handleChange}
						label="Month"
					>
						<option aria-label="None" value="" />
						<option value={'january'}>January</option>
						<option value={'febuary'}>Febuary</option>
						<option value={'march'}>March</option>
						<option value={'april'}>April</option>
						<option value={'may'}>May</option>
						<option value={'june'}>June</option>
						<option value={'july'}>July</option>
						<option value={'august'}>August</option>
						<option value={'september'}>September</option>
						<option value={'november'}>November</option>
						<option value={'october'}>October</option>
						<option value={'december'}>December</option>
					</Select>
				</FormControl>
				<CSVLink data={exportData(monthData.data)}
				filename={`MetersExport${getDate()}.csv`}>
				<Button
					variant="contained"
					color="primary"
					disabled={hideBtn}
					className={classes.button}
				>
					<Typography>Export</Typography>
				</Button>
				</CSVLink>
				
			</div>
		</div>
	);
};

export default Export;

/*


Topbar logout should be part of the component


*/
