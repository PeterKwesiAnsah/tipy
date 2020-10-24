import React,{useContext} from 'react'
import { TextField } from '@material-ui/core';
import addCustom from '../helpers/addCustom'
import { UserContext } from '../App';

const Home = () => {

    
	//Get the Global firebase  objects
	const { firebase, database } = useContext(UserContext).firebase;

    const handleChange=({target})=>{
        addCustom(target.files[0],firebase)
    }
    return (
        <div style={{display:'grid',placeItems:'center',height:'100vh'}}>
            <TextField type='file' variant='outlined' onChange={handleChange}></TextField>  
        </div>
    )
}

export default Home
