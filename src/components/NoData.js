import React from 'react'
import {ReactComponent as SearchIcon} from '../img/search.svg'
import {Typography,Button,makeStyles} from '@material-ui/core'

const useStyles=makeStyles({
    root:{
        fontSize:'1.5rem',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        '& *':{
            fontSize:'inherit'
        },
        '& svg':{
            width: '6.3rem !important',
            height: '6.3rem !important', 
            fill:'#808080',
            margin:'5rem 0'
    
        },
        '& p':{
            color:'#808080',
            fontSize:'2rem',
            marginTop:'1rem'
        }
    }

})

const NoData = () => {
    const classes=useStyles()
    return (
        <div className={classes.root}>
            <Typography>No Data Available</Typography>
            <SearchIcon></SearchIcon>
            <Button variant="contained" color="primary" href="/import">Add Customers</Button>
        </div>
    )
}

export default NoData
