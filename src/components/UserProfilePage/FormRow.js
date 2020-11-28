import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    paddingTop: '66.66%',
    backgroundImage: 'url(https://shmixieset-gallery-images.s3.amazonaws.com/Portfolio/DSC_1618.jpg)',
    backgroundSize: 'cover',
    boxShadow: '2px 2px 20px #000000',
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
}));

export const FormRow = ({ galleries }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      {galleries &&
        galleries.map(gallery => (
          <Grid
            item xs={4}
            key={gallery.id}
            onClick={() => {
              history.push(`/galleries/${gallery.id}`)
            }}
          >
            <Paper className={classes.paper}>
              <h1 className={classes.title}>{gallery.name}</h1>
            </Paper>
          </Grid>
        ))}
    </>
  )
};
