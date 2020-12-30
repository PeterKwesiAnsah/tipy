import React from 'react';
import {
  Container,
  Grid,
  makeStyles,
  Paper
} from '@material-ui/core';

import Profile from './Profile';
import ProfileDetails from './ProfileDetails';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    backgroundColor:'#F4F6F8',
    borderRadius:'none',
    display:'flex',
    flexDirection:'column'
  }
}));

const Account = ({firebase,id}) => {
  const classes = useStyles();

  return (
    <Paper
      className={classes.root}
      title="Account"
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
         <Profile firebase={firebase} ></Profile>
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <ProfileDetails />
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
};
export default Account;
