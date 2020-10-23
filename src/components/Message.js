import React from 'react';
import { ReactComponent as Happy } from '../img/happy.svg';
import { Button, Typography, makeStyles } from '@material-ui/core';
import logoB from '../img/logoB.png';

const useStyles = makeStyles({
	root: {
		display: 'grid',
		justifyItems: 'center',
		padding: '2rem',
		gap: '1rem',
		height: '100vh',

		'& a': {
			padding: '1.2rem 4rem',
			borderRadius: '4rem',
		},
	},
	img: {
		width: '7%',
		objectFit: 'scale-down',
		height: '3rem',
        justifySelf: 'normal',
        cursor:'pointer'
	},
});

const Success = () => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<img
				src={logoB}
				alt="Location Errand Technology"
				className={classes.img}
			></img>

			<Happy></Happy>
			<Typography variant="h3" color="secondary">
				You've Successfully created your account!!
			</Typography>
			<Button href="/" variant="contained" color="primary">
				<Typography variant="h5">Login</Typography>
			</Button>
		</div>
	);
};

export default Success;
