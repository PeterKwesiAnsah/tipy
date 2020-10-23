import React, { useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, Typography } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { makeStyles } from '@material-ui/core';
import { UserContext } from '../App';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
	root: {
		'& input': {
			fontSize: '1.5rem',
		},
		'& label': {
			fontSize: '1.5rem',
		},
		'& .MuiFormHelperText-root': {
			fontSize: '1.3rem',
		},

		'& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
			transform: 'translate(12px, -13px) scale(0.75)',
		},

		//   .MuiInputLabel-outlined.MuiInputLabel-shrink {
		//     transform: translate(12px, -9px) scale(0.75);
		// }
	},
	form: {
		display: 'grid',
		gridTemplateColumns: 'repeat(2,1fr)',
		gap: '2.5rem',
	},
	button: {
		borderRadius: '3rem',
	},
});

const AddUserData = () => {
	const classes = useStyles();

	//Creating a useHistory Object
	let history = useHistory();

	//Get the Global firebase  objects
	const { firebase, database } = useContext(UserContext).firebase;

	return (
		<Formik
			initialValues={{
				email: '',
				password: '',
				confirm: '',
				token: '',
				name: '',
			}}
			validate={(values, isSubmitting) => {
				const errors = {};
				if (!values.email && isSubmitting) {
					errors.email = 'Required';
					// errors.password='Required';
					// errors.token='Required'
				}
				if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
					errors.email = 'Invalid email address';
				}
				if (values.confirm && values.confirm !== values.password) {
					errors.password = 'Passwords not match';
				}

				return errors;
			}}
			onSubmit={(values, { setSubmitting }) => {
				//Deconstructuring to get the user data
				const { email, token, name, password } = values;

				//Create the user reference for the user signing up

				const userRef = database.ref(
					`users/${atob(token)}/` + email.split('@')[0]
				);

				//function adds user and inserts data if Token is right
				if (atob(token) === 'LLW' || atob(token) === 'CWSA') {
					const addUser = async () => {
						await firebase
							.auth()
							.createUserWithEmailAndPassword(email, password);

						//After the user credentials for auth is created
						//UserData is added lastly

						addUserData();
					};

					const addUserData = async () => {
						await userRef.set({
							id: Date.now(),
							name: name,
							email: email,
							token: token,
						});

						setSubmitting(false);
						console.log('Data is submitted');
						history.push('/success');
					};
					addUser();
				}
			}}
		>
			{({ values, submitForm, isSubmitting }) => (
				<Form autoComplete="off" className={classes.form}>
					<Field
						component={TextField}
						name="name"
						type="text"
						label="Organization's Name"
						required
						variant="outlined"
						className={classes.root}
					/>
					<Field
						component={TextField}
						name="email"
						type="email"
						label="Email"
						required
						variant="outlined"
						className={classes.root}
					/>

					<Field
						component={TextField}
						type="password"
						label="Password"
						name="password"
						required
						variant="outlined"
						className={classes.root}
					/>
					<Field
						component={TextField}
						type="password"
						label="Confirm Password"
						name="confirm"
						variant="outlined"
						className={classes.root}
					/>
					<Field
						component={TextField}
						type="text"
						label="Token"
						name="token"
						required
						variant="outlined"
						className={classes.root}
					/>

					{isSubmitting}

					<Button
						variant="contained"
						color="secondary"
						disabled={!isSubmitting && !values.token}
						onClick={submitForm}
						className={classes.button}
					>
						<Typography variant="h6">Sign Up</Typography>
					</Button>
				</Form>
			)}
		</Formik>
	);
};
export default AddUserData;
