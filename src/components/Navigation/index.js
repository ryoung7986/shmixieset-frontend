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
import GalleryPage from '../UserProfilePage/GalleryPage';
import './Navigation.css'

const Navigation = ({ isLoaded }) => {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div>
        <NavBar sessionUser={sessionUser} />
        <Switch>
          <Route exact path="/" component={UserProfilePage} />
          <Route path="/create-gallery" component={CreateGallery} />
          <Route path="/owned-galleries" component={OwnedGalleries} />
          <Route path="/galleries/:id" component={GalleryPage} />
        </Switch>
      </div>
    );
  } else {
    sessionLinks = (
      <div >
        <Grid container component="main">
          <NavBar />
          <Switch>
            <Route path="/signup" component={SignupFormPage} />
            <Route path="*" component={LoginFormPage} />
          </Switch>
        </Grid>
      </div>
    );
  }

  return (
    <div>
      {isLoaded && sessionLinks}
    </div>
  )
}

export default Navigation;
