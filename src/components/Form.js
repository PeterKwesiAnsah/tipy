import * as firebase from 'firebase';
import React, { useContext } from 'react';
import logoB from '../img/logoB.png';
import '../Signin.scss';
import TextField from '@material-ui/core/TextField';
import { ReactComponent as Circle } from '../img/circle.svg';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { UserContext } from '../App';
// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyBzSxCofWxvc8_2sQyFelJyraMAwohJrlg",
    authDomain: "tipy-d9238.firebaseapp.com",
    databaseURL: "https://tipy-d9238.firebaseio.com",
    projectId: "tipy-d9238",
    storageBucket: "tipy-d9238.appspot.com",
    messagingSenderId: "129149327590",
    appId: "1:129149327590:web:25ac71c740fd906d14c327",
    measurementId: "G-QBM27EHXEJ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();




const useStyles = makeStyles({
	button: {
		width: '20%',
		borderRadius: '1rem',
		fontSize: '1.15rem',
	},
	root: {
		'& input': {
			fontSize: '1.5rem',
		},
		'& label': {
			fontSize: '1.8rem',
		},
	},
});

const Form = () => {
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
				 await firebase.auth().signInWithEmailAndPassword(user.email, user.password);

				 //Welcome User
			} catch (error) {

				//Bounce User
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				// [START_EXCLUDE]
				if (errorCode === 'auth/wrong-password') {
					alert('Wrong password.');
				} else {
					alert(errorMessage);
				}
				console.log(error);
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
			<form className="form" noValidate autoComplete="off">
				<TextField
					label="Email"
					type="email"
					autoFocus
					className={classes.root}
					value={user.email}
					onChange={handleChange}
					required
				/>
				<TextField
					label="Password"
					type="password"
					className={classes.root}
					value={user.password}
					onChange={handleChange}
					required
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
		</>
	);
};

export default Form;
