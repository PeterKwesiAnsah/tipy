import React from 'react';
import { Link } from 'react-router-dom';
import userpic from '../../img/userpic.jpg';
import NavItem from '../Dashboard/NavItem';

import { Avatar, List, Typography, makeStyles } from '@material-ui/core';
import {
	BarChart as BarChartIcon,
	Settings as SettingsIcon,
	User as UserIcon,
	Users as UsersIcon,
	Clipboard as MeterIcon
} from 'react-feather';

const user = {
	avatar: userpic,
	UserType: 'Lower Level Management',
	name: 'Pantang LLW',
};

const useStyles = makeStyles({
	leftPane: {
		width: '20vw',
		height: '100%',
	},
	avatar: {
		cursor: 'pointer',
		width: 64,
		height: 64,
	},

	avatarBox: {
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'column',
		padding: '2rem 3rem',
		// borderBottom: '1px solid #80808085',
	},
	root: {
		fontSize: '1.5rem',
		paddingLeft: '1.5rem',
		'&  *': {
			fontSize: 'inherit',
		},
	},
});
const items = [
	{
		href: '/home/dashboard',
		icon: BarChartIcon,
		title: 'Dashboard',
	},
	{
		href: '/home/customers',
		icon: UsersIcon,
		title: 'Customers',
	},
	{
		href:'/home/meters',
		icon:MeterIcon,
		title:'Meters'
	},
	{
		href: '/home/account',
		icon: UserIcon,
		title: 'Account',
	},
	{
		href: '/home/settings',
		icon: SettingsIcon,
		title: 'Settings',
	}

];

const LeftPane = () => {
	const classes = useStyles();

	return (
		<div className={classes.leftPane}>
			<div className={classes.avatarBox}>
				<Avatar
					className={classes.avatar}
					component={Link}
					src={user.avatar}
					to="/home/account"
				/>
				<Typography className={classes.name} color="textPrimary" variant="h4">
					{user.name}
				</Typography>
				<Typography color="textSecondary" variant="h6">
					{user.UserType}
				</Typography>
			</div>
			<List className={classes.root}>
				{items.map((item) => (
					<NavItem
						href={item.href}
						key={item.title}
						title={item.title}
						icon={item.icon}
					/>
				))}
			</List>
		</div>
	);
};
export default LeftPane;
