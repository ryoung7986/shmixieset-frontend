import React from 'react'
import Grid from '@material-ui/core/Grid';
import { Box, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      // border: "1px solid black",
      // margin: theme.spacing(1),
      // width: theme.spacing(32),
      // height: theme.spacing(16),
      // padding: theme.spacing(2)
      // margin: theme.spacing(4)
    }
  }
}))


function LandingPage() {
  const classes = useStyles();

  const handleClick = (e) => {
    e.preventDefault();
    <Redirect to="/" />
  }

  return (
    <div className={classes.root}>
      <h1>Welcome to Shmixieset</h1>
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
      >
        <Grid onClick={() => {
          console.log('Create Gallery Component');
          window.location.href = "/owned-galleries"
        }}>
          <Paper
            elevation={3}
            className={classes.paper}>
            <Box p={10}>
              <Typography variant="h5">Owned Galleries</Typography>
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
          window.location.href = "/create-gallery"
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
      </Grid>
    </div>
  )
}

export default LandingPage;
