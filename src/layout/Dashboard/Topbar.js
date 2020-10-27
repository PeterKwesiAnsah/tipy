import React from 'react';
import logoW from './../../img/logoW.png';
import { makeStyles, IconButton } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import InputIcon from '@material-ui/icons/Input';

const useStyles = makeStyles({
	root: {
		height: '10vh',
		display: 'flex',
		alignItems: 'center',
		color: '#fff',
		justifyContent: 'space-between',
		padding: '2.5rem',
		'& .MuiSvgIcon-fontSizeLarge': {
			fontSize: '2.6rem',
		},
	},
	img: {
		width: '7%',
		objectFit: 'scale-down',
		height: '3rem',
	},
});

const Topbar = () => {
	const classes = useStyles();

	return (
		<div
			className={classes.root}
			style={{ backgroundColor: `${useTheme().palette.primary.main}` }}
		>
			<img
				src={logoW}
				alt="Tippy......Errand Location Technology"
				className={classes.img}
			></img>
			<IconButton color="inherit">
				<InputIcon fontSize="large" />
			</IconButton>
		</div>
	);
};

export default Topbar;
