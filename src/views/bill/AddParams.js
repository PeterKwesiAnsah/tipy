import React,{useState} from 'react';
import { Formik, Form, Field } from 'formik';
import {
	Button,
	LinearProgress,
	makeStyles,
	InputAdornment,
} from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import upperCase from '../../helpers/UpperCase';
import axios from 'axios'

const useStyles = makeStyles((theme)=>({
	root: {
		fontSize: '1.4rem',
		width: '100%',
		height: '100%',
		display: 'grid',
		placeItems: 'center',
		gap: '2rem',
		'& *': {
			fontSize: 'inherit',
		},

		'& > *': {
			marginBottom: '2rem',
		},
		' & .MuiTextField-root': {
			marginBottom: '2rem',
		},

		'& button':{
			marginRight:'4rem'
		}

	},
	wrapper: {
		backgroundColor: 'white',
		padding: '5rem 15rem',
		borderRadius: '1rem',
	},
}));

const AddParams = ({userKey,database}) => {
	const classes = useStyles();
	const [hideUpdate,sethideUpdate]=useState(true)
	const [disInput,setDisInput]=useState(false)


	return (
		<div className={classes.root}>
			<div className={classes.wrapper}>
				<Formik
					initialValues={{
						tariff: '',
						fee: '',
						expansion: '',
					}}
					// validate={(values, isSubmitting) => {
					// 	const errors = {};
					// 	if (typeof values.tariff !== 'number' && isSubmitting) {
					// 		errors.tariff = 'Please Enter a Number.';
					// 	} else if (typeof values.fee !== 'number' && isSubmitting) {
					// 		errors.fee = 'Please Enter a Number.';
					// 	} else if (typeof values.expansion !== 'number' && isSubmitting) {
					// 		errors.expansion = 'Please Enter a Number.';
					// 	}
					// 	return errors;
					// }}
					onSubmit={async(values,{ setSubmitting}) => {
						//save into firebase
						try{
							sethideUpdate(false)
							// await database.ref('users/LLW/'+upperCase(userKey)).update(values)
							const test= (await axios.post('http://us-central1-tpwebsyeeee.cloudfunctions.net/app/web-bill-params/1603702629482',values)).data
							console.log(test)
							setSubmitting(false)
							
						}
						catch(err){
							console.log(err)
						}

						

					}}
				>
					{({ submitForm, isSubmitting, values }) => (
						<Form>
				
							<Field
								component={TextField}
								name="tariff"
								type="text"
								label="tariff per Meter"
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<strong>
												Ghc/m<sup>3</sup>
											</strong>
										</InputAdornment>
									),
								}}
								variant="outlined"
								placeholder="0.5"
							/>

							<br />
							<Field
								component={TextField}
								type="text"
								label="Meter Fee"
								name="fee"
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<strong>Ghc</strong>
										</InputAdornment>
									),
								}}
								variant="outlined"
								placeholder="15.5"
							/>
							<br />
							<Field
								component={TextField}
								type="text"
								label="Expansion Rate"
								name="expansion"
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<strong>%</strong>
										</InputAdornment>
									),
								}}
								variant="outlined"
								placeholder="5"
								
							/>
							{isSubmitting && <LinearProgress />}
							<br />
							<Button
								variant="contained"
								color="primary"
								// disabled={isSubmitting || values.fee !== '' || values.expansion !=='' || values.tariff !=='' }
								onClick={submitForm}
							>
								save
							</Button>
							<Button variant="contained" color="primary" disabled={hideUpdate}>
								Update
							</Button>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default AddParams;
