import React, { useState, useContext, useEffect } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Toolbar from './Toolbar';
import Results from './Results';
import getCustom from '../../helpers/getCustom';
import { UserContext } from '../../App';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.dark,
		minHeight: '100%',
		paddingBottom: theme.spacing(3),
		paddingTop: theme.spacing(3),
	},
}));

const Customers = () => {
	//customers data state from firebase based on the current user
    const [data, setData] = useState([]);
    
    //search string
    const [search,setSearch]=useState('')

	//Get the Global firebase  objects
	const { firebase } = useContext(UserContext).firebase;

	//get data from firebase based on the current User
	useEffect(() => {
		getCustom(firebase).then((data) => {
			setData(data);
		});
	}, []);

	return (
		<div>
			<Toolbar search={{search,setSearch}}></Toolbar>
			<Results data={data} search={search}></Results>
		</div>
	);
};

export default Customers;
