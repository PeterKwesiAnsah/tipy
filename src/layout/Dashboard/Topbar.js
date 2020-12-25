import React from 'react';
import logoW from './../../img/logoW.png';
import { makeStyles, IconButton } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import InputIcon from '@material-ui/icons/Input';
import DehazeIcon from '@material-ui/icons/Dehaze';
import useMediaQuery from '@material-ui/core/useMediaQuery';

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
		'@media only screen and (max-width:62.5em)':{
			display:'none'
		}
	},
});



const Topbar = ({ logout,Navbar }) => {
	const mediaQuery=useMediaQuery('@media only screen and (max-width:62.5em)')
	const classes = useStyles();

	//get navbar states
	const {setShowNav,showNav}=Navbar

	return (
		<div
			className={classes.root}
			style={{ backgroundColor: `${useTheme().palette.primary.main}`}}
		>{
			mediaQuery ? <IconButton onClick={()=>setShowNav(!showNav)} color="inherit">
			<DehazeIcon fontSize="large" />
		</IconButton> : <img
				src={logoW}
				alt="Tippy......Errand Location Technology"
				className={classes.img}
			></img>
		}
			
			<IconButton color="inherit" onClick={logout}>
				<InputIcon fontSize="large" />
			</IconButton>
		</div>
	);
};

export default Topbar;
