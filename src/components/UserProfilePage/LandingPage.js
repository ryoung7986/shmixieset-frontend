import React from 'react'
import Grid from '@material-ui/core/Grid';
import { Box, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect, useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  body: {
    margin: '0',
  },
  root: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  gridContainer: {
    display: 'flex',
    flexDirection: 'row',
    // marginRight: '100px',
    justifyContent: 'space-around',
  },
  paper: {
    margin: '10px',
    textAlign: 'center',
    paddingTop: '66.66%',
    backgroundImage: 'url(https://shmixieset-gallery-images.s3.amazonaws.com/Portfolio/DSC_1618.jpg)',
    backgroundSize: 'cover',
    boxShadow: '2px 2px 20px #000000',
    height: '300px',
    width: '500px',
    // color: theme.palette.text.secondary,
  },
  title: {
    color: 'white',
    textShadow: '2px 2px 4px #000000',
    border: '1px solid white',
    borderRadius: '5px',
    width: '65%',
    padding: "10px",
    alignContent: 'center'
  }
}))

function LandingPage() {
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
            <Box p={10}>
              <Typography className={classes.title} variant="h5">Your Galleries</Typography>
            </Box>
          </Paper>
        </Grid>
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
            <Box p={10}>
              <Typography className={classes.title} variant="h5">Subscribed Galleries</Typography>
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
              backgroundImage: `url(https://shmixieset-gallery-images.s3.amazonaws.com/Portfolio/6-edit.jpg)`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}>
            <Box p={10}>
              <Typography className={classes.title} variant="h5">Create a Gallery</Typography>
            </Box>
          </Paper>
        </Grid>
      </div>
      {/* <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
      >
        <Grid onClick={() => {
          console.log('Create Gallery Component');
          history.push("/owned-galleries")
        }}>
          <Paper
            elevation={3}
            className={classes.paper}>
            <Box p={10}>
              <Typography variant="h5">Your Galleries</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid>
          <Paper
            elevation={3}
            className={classes.paper}>
            <Box p={10}>
              <Typography variant="h5">Subscribed Galleries</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid onClick={() => {
          console.log('Create Gallery Component');
          history.push("/create-gallery");
        }}>
          <Paper
            elevation={3}
            className={classes.paper}
          >
            <Box p={10}>
              <Typography variant="h5">Create a Gallery</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid> */}
    </div>
  )
}

export default LandingPage;
