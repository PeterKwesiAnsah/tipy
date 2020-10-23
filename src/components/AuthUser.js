import * as firebase from 'firebase';
import React, { useContext } from 'react';
import logoB from '../img/logoB.png';
import '../Signin.scss';
import TextField from '@material-ui/core/TextField';
import { ReactComponent as Circle } from '../img/circle.svg';
import { Button, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { UserContext } from '../App';
import {Link} from 'react-router-dom'
import classnames from 'classnames'

//IF SIGIN IS NULL THE USER HASN'T TRIED LOGGING IN ELSE FAILED /SUCCESS

const useStyles = makeStyles({
	button: {
		width: '20%',
		borderRadius: '1rem',
		fontSize: '1.15rem',
	},
	root: {
		'&:hover': {},
		'& input': {
			fontSize: '1.5rem',
		},
		'& label': {
			fontSize: '1.8rem',
		},
		'& .MuiFormHelperText-root': {
			fontSize: '1.5rem',
		},

		'& a:visited':{
		color:'#32CD32'

		},
		'& a':{
			color:'#32CD32'
			}
	},
	text: {
		alignSelf: 'self-start',
		fontSize:'1.5rem',
		fontWeight:'400',
	},
});

const AuthUser = () => {
	const classes = useStyles();

	//using useContext to get Global UserState
	const { user, setUser } = useContext(UserContext);

	//handles userinputs
	const handleChange = ({ target }) => {
		if (target.type === 'email') {
			setUser({ ...user, email: target.value });
		} else {
			setUser({ ...user, password: target.value });
		}
	};
	//performes authentication
	const signin = async ({ target }) => {
		if (user.password || user.email) {
			try {
				await firebase
					.auth()
					.signInWithEmailAndPassword(user.email, user.password);
				setUser({ ...user, signin: 'success' });
				alert('Welcome');
				//Welcome User
			} catch (error) {
				setUser({ ...user, password: '', signin: 'failed' });
			}
		}
	};

	return (
		<>
			<Circle></Circle>
			<div className="signin__welcome">
				<span className="signin__text">Welcome to</span>
				<img
					src={logoB}
					alt="Tipy................Location-Errand Technology"
					className="signin__img"
				></img>
			</div>
			<form className="form" autoComplete="off">
				<TextField
					label="Email"
					type="email"
					autoFocus
					className={classes.root}
					value={user.email}
					onChange={handleChange}
					required
					error={user.signin === 'failed'}
				/>
				<TextField
					label="Password"
					type="password"
					className={classes.root}
					value={user.password}
					onChange={handleChange}
					required
					error={user.signin === 'failed'}
					helperText={
						user.signin === 'failed' && 'Incorrect Email/Password.'
					}
				/>
				<Button
					className={classes.button}
					variant="contained"
					color="primary"
					size="medium"
					onClick={signin}
				>
					Login
				</Button>
			</form>
			<Typography variant="h6" className={classnames(classes.text,classes.root)} color="primary">
				Don't have an Account?...<Link to='signUp'>SignUp</Link> Here.
			</Typography>
		</>
	);
};

export default AuthUser;
