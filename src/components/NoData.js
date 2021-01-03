import React from 'react'
import {ReactComponent as SearchIcon} from '../img/search.svg'
import {Typography,Button,makeStyles} from '@material-ui/core'

const useStyles=makeStyles(theme=>({
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
            fill:theme.palette.secondary.main,
            margin:'3rem 0'
    
        },
        '& p':{
            color:'#808080',
            fontSize:'2rem',
            marginTop:'1rem'
        }
    }

}))

const NoData = ({children,button}) => {
    const classes=useStyles()
    return (
        <div className={classes.root}>
            <Typography>{children}</Typography>
            <SearchIcon></SearchIcon>
            {/* <Button variant="contained" color="primary" href="/import">Add Customers</Button> */}
            {button}
        </div>
    )
}

export default NoData
