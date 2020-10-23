import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Button, Typography } from '@material-ui/core';
import logoB from '../img/logoB.png';
import { ReactComponent as SignSVG } from '../img/signin.svg';
import AddUserData from './AddUserData';

const useStyles = makeStyles({
	root: {
		height: '100vh',
	},
	header: {
		height: '10vh',
		padding: '3rem',
		display: 'flex',
		justifyContent: 'space-between',
	},
	img: {
		width: '7%',
		objectFit: 'scale-down',
		height: '3rem',
	},
	main: {
		display: 'grid',
		gridTemplateColumns: 'repeat(2,1fr)',
        padding: '6rem',
        paddingRight:'3rem',
		height: '90vh',
		alignContent: 'center',
		gap: '5rem',
    },
    heading:{
        marginBottom:'8rem',
        fontWeight:'400'
      }
});

const SignUp = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<header className={classes.header}>
				<img
					src={logoB}
					alt="Location Errand Technology"
					className={classes.img}
				></img>
				<div>
					<Typography variant="h5">
						Do you have an Account?{' '}
						<Button
							variant="outlined"
							color="primary"
							size="large"
							href="/"
							style={{ marginLeft: '1.5rem' }}
						>
							Login
						</Button>
					</Typography>
				</div>
			</header>
			<main className={classes.main}>
				<div>
					<Typography variant="h2" className={classes.heading}>
						Create Account
					</Typography>
					<AddUserData></AddUserData>
				</div>
				<SignSVG></SignSVG>
			</main>
		</div>
	);
};

export default SignUp;
