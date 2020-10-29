import React from 'react';
import {
	makeStyles,
	Card,
	CardContent,
	TextField,
	Button,
} from '@material-ui/core';
import Topbar from '../layout/Dashboard/Topbar';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import WarningIcon from '@material-ui/icons/Warning';


const useStyles = makeStyles({
	root: {
		minHeight: '60vh',
		minWidth: '50vw',
	},
	container: {
		display: 'grid',
		placeItems: 'center',
		backgroundColor: '#f4f6f8',
		height: '85vh',
		width: '100%',
	},
	breadcrumb: {
		padding: '2rem',
		fontSize: '1.5rem',
		backgroundColor: 'rgba(0, 99, 123, 0.27)',
		'& *': {
			fontSize: 'inherit',
		},
	},
	warning: {
		color: '#c62828',
		marginTop: '1rem',
		padding: '1rem',
		backgroundColor: '#c628282b',
		borderRadius: '.8rem',
		display: 'flex',
		fontSize: '1.3rem',
		justifyContent: 'center',
		'& *': {
			color: 'inherit',
			fontSize: 'inherit',
		},
		'& svg': {
			width: '2em',
			height: '2em',
			marginRight: '1rem',
		},

		'& > p': {
			display: 'flex',
			alignItems: 'center',
		},
	},
	input: {
		border: 'none',
		width: '100%',
		marginTop: '6rem',
		'& *': {
			border: 'inherit',
		},
		'& input': {
			color: 'rgba(0,0,0,0.5)',
			backgroundColor: 'rgba(0,0,0,0.08)',
			borderRadius: '0.7rem',
		},
	},
	button: {
		marginTop: '2rem',
	},
});

const CustomImport = () => {
	const classes = useStyles();
	return (
		<>
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
					<Link href="/import/customers" color="primary">
						<Typography color="textPrimary">Import Customers</Typography>
					</Link>
				</Breadcrumbs>
			</div>

			<div className={classes.container}>
				<Card className={classes.root}>
					<CardContent>
						<Typography variant="h4">Import CSV</Typography>
						<div className={classes.warning}>
							<Typography align="center">
								<WarningIcon></WarningIcon>
								All CSV files should have headers(name,bill etc)
							</Typography>
						</div>
						<TextField
							variant="outlined"
							type="file"
							className={classes.input}
							inputProps={{ accept: '.csv' }}
							onChange={({ target }) => {
								console.log(target.files[0]);
							}}
						></TextField>
						<div style={{ textAlign: 'right' }}>
							<Button
								variant="contained"
								color="primary"
								className={classes.button}
							>
								<Typography variant="h6">Import</Typography>
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</>
	);
};

export default CustomImport;
