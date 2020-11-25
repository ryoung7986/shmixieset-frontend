import { useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import UserProfilePage from '../UserProfilePage';
import LoginFormPage from '../LoginFormPage';
import SignupFormPage from '../SignupFormPage';
import Grid from '@material-ui/core/Grid';
import NavBar from './NavBar';
import { makeStyles } from '@material-ui/core/styles';
import CreateGallery from '../UserProfilePage/CreateGallery';
import OwnedGalleries from '../UserProfilePage/OwnedGalleries';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const Navigation = ({ isLoaded }) => {
  const sessionUser = useSelector(state => state.session.user);
  const classes = useStyles();

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className={classes.root}>
        <NavBar sessionUser={sessionUser} />
        <Switch>
          <Route exact path="/">
            <UserProfilePage />
          </Route>
          <Route path="/create-gallery">
            <CreateGallery />
          </Route>
          <Route path="/owned-galleries">
            <OwnedGalleries />
          </Route>
        </Switch>
      </div>
    );
  } else {
    sessionLinks = (
      <div className={classes.root}>
        <Grid container component="main">
          <NavBar />
          <Switch>
            <Route path="/signup"
              className="nav-link">
              <SignupFormPage />
            </Route>
            <Route path="*"
              className="nav-link">
              <LoginFormPage />
            </Route>
          </Switch>
        </Grid>
      </div>
    );
  }

  return (
    <>
      {isLoaded && sessionLinks}
    </>
  )
}

export default Navigation;
