import React,{useContext} from 'react';
import AddParams from './AddParams';
import {UserContext} from '../../App'




const Bill = () => {

const {user,firebase:{database}}=useContext(UserContext)
	return (
		<>
			<AddParams userKey={user[1]?.email.split('@')[0]} database={database}></AddParams>
		</>
	);
};

export default Bill;
