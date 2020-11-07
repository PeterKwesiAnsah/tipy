import React, { useContext, useEffect, useState } from 'react';
import Toolbar from './Toolbar';
import { UserContext } from '../../App';
import getReadings from '../../helpers/getReadings';
const Meter = () => {
	//Get the Global firebase  objects
	const { firebase } = useContext(UserContext).firebase;

	//Get the LLW id of the current user
    const [id] = useContext(UserContext).user;
	const [readings, setReadings] = useState([]);

	useEffect(() => {
		const fetchData=async()=>{
            const readings = await getReadings(firebase,id)
            console.log(readings)
        }

        fetchData()
        
    });
	return (
		<div>
			<Toolbar></Toolbar>
		</div>
	);
};

export default Meter;
