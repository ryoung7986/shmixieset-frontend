import { fetchGalleries } from '../../store/aws';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { FormRow } from './FormRow';
import GalleryPage from './GalleryPage';

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(10),
      width: theme.spacing(200),
      height: theme.spacing(160),
      padding: theme.spacing(2),
      display: 'flex',
      justifyContent: 'space-around',
    }
  }
}));

export default function OwnedGalleries() {
  const userId = useSelector(state => state.session.user.id);
  const galleries = useSelector(state => state.files.galleries);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(fetchGalleries(userId));
  }, [userId, dispatch]);

  return (
    <div className={classes.root}>
      <Switch>
        <Route path="/galleries/:id" component={GalleryPage} />
        <Route path="*">
          <Grid container spacing={1}>
            <Grid container item xs={12} spacing={3} className={classes.rowDiv}>
              <FormRow galleries={galleries} />
            </Grid>
          </Grid>
        </Route>
      </Switch>
    </div>
  );
}
