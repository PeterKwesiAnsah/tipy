import React, { useState, useContext, useEffect } from 'react';
import {makeStyles } from '@material-ui/core';
import Toolbar from './Toolbar';
import Results from './Results';
import getCustom from '../../helpers/getCustom';
import { UserContext } from '../../App';


const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor:''
	},
}));

const Customers = () => {


	const classes=useStyles()
	//customers data state from firebase based on the current user
	const [data, setData] = useState([]);
    
    //search string
    const [search,setSearch]=useState('')

	//Get the Global firebase  objects
	const { firebase } = useContext(UserContext).firebase;

	//Get the LLW id of the current user
	const [id]=useContext(UserContext).user

	//get data from firebase based on the current User
	useEffect(() => {

		//determines if the component is mounted or not 
		let mount=true
		
		getCustom(firebase,id).then((data) => {

			//update state only if the component is mounted
			if(mount)
			setData(data);
		});

		return ()=>{
			mount=false

		}
	});

	return (
		<div className={classes.root}>
			<Toolbar search={{search,setSearch}} data={data}></Toolbar>
			<Results data={data} search={search}></Results>
		</div>
	);
};

export default Customers;
