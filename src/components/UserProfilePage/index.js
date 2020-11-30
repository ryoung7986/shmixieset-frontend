import React from 'react'
import Grid from '@material-ui/core/Grid';
import { Box, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect, useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  // body: {
  //   margin: '0',
  // },
  root: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  gridContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginRight: '400px',
    justifyContent: 'space-around',
  },
  paper: {
    margin: '10px',
    // textAlign: 'center',
    // paddingTop: '66.66%',
    backgroundSize: 'cover',
    boxShadow: '2px 2px 20px #000000',
    height: '300px',
    width: '500px',
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'flex-end',
  },
  title: {
    color: 'white',
    textShadow: '2px 2px 4px #000000',
    border: '1px solid white',
    borderRadius: '5px',
    width: '65%',
    padding: "10px",
    paddingLeft: '25px',
    paddingRight: '25px',
    display: 'flex',
    justifyContent: 'center',
  }
}))

function UserProfilePage() {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    <Redirect to="/" />
  }

  return (
    <div className={classes.root}>
      <h1>Welcome to Shmixieset</h1>
      <div className={classes.gridContainer}>
        <Grid
          item xs={1}
          onClick={() => {
            history.push('/owned-galleries')
          }}
        >
          <Paper
            className={classes.paper}
            style={{
              backgroundImage: `url(https://shmixieset-gallery-images.s3.amazonaws.com/Portfolio/6-edit.jpg)`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}>
            <Box p={1}>
              <Typography className={classes.title} variant="h5">Your Galleries</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid
          item xs={1}
          onClick={() => {
            history.push('/create-gallery')
          }}
        >
          <Paper
            className={classes.paper}
            style={{
              backgroundImage: `url(https://shmixieset-gallery-images.s3.amazonaws.com/Portfolio/8-edit.jpg)`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}>
            <Box p={1}>
              <Typography className={classes.title} variant="h5">Create a Gallery</Typography>
            </Box>
          </Paper>
        </Grid>
      </div>
    </div>
  )
}

export default UserProfilePage;


// import LandingPage from './LandingPage';

// function UserProfilePage() {
//   return (
//     <LandingPage />
//   )
// }

// export default UserProfilePage
