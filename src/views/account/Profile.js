import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import LinearProgress from '@material-ui/core/LinearProgress';
// import moment from 'moment';
import {
	Avatar,
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Divider,
	Typography,
	makeStyles,
} from '@material-ui/core';

const user = {
	avatar: '/static/images/avatars/avatar_6.png',
	city: 'Los Angeles',
	country: 'USA',
	jobTitle: 'Senior Developer',
	name: 'Katarina Smith',
	timezone: 'GTM-7',
};

const useStyles = makeStyles(() => ({
	root: {
		fontSize: '1.4rem',
		'& *': {
			fontSize: 'inherit',
		},
	},
	avatar: {
		height: 80,
		width: 80,
	},
	inputImage: {
		visibility: 'none',
		opacity: '0',
		width: '0',
		// display:'none'
	},
}));

const Profile = ({ className, firebase, ...rest }) => {
	const classes = useStyles();

	const User = firebase.auth().currentUser;
	const [updating, setUpdating] = useState(false);

	//image file input
	const imageInputRef = useRef();

	const trigger = () => {
		//trigger a click event on the input file
		imageInputRef.current.click();
	};

	const upLoadImage = async ({ target }) => {
		//root storage ref
		const storageRef = firebase.storage().ref();
		//ref to image
		const photoUpload = storageRef.child('uploads/' + User.email);
		// file object
		const file = target.files[0];

		await photoUpload.put(file);

		const URL = await photoUpload.getDownloadURL();

		try {
			await User.updateProfile({
				photoURL: URL,
			});

			setUpdating(true);
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<Card className={clsx(classes.root, className)} {...rest}>
			<CardContent>
				<Box alignItems="center" display="flex" flexDirection="column">
					<Avatar
						className={classes.avatar}
						src={
							User?.photoURL
						}
					/>
					<Typography color="textPrimary" gutterBottom variant="h3">
						{user.name}
					</Typography>
					<Typography color="textSecondary" variant="body1">
						{`${user.city} ${user.country}`}
					</Typography>
					<Typography
						className={classes.dateText}
						color="textSecondary"
						variant="body1"
					>
						{/* {`${moment().format('hh:mm A')} ${user.timezone}`} */}
					</Typography>
				</Box>
			</CardContent>
			<Divider />
			<CardActions>
				<input
					type="file"
					className={classes.inputImage}
					ref={imageInputRef}
					onChange={upLoadImage}
					accept=".jpg,.png"
				></input>
				<Button color="primary" fullWidth variant="text" onClick={trigger}>
					Upload picture
				</Button>
			</CardActions>
		</Card>
	);
};

Profile.propTypes = {
	className: PropTypes.string,
};

export default Profile;
