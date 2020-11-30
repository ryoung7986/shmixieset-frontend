import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles, GridList, GridListTile, Grid } from '@material-ui/core';
import * as awsActions from "../../store/aws";

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    width: '100vw',
    alignItems: 'center',
    flexDirection: 'column',
    display: "flex",
    flexWrap: 'wrap',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: theme.palette.paper,
  },
  form: {
    width: '40%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: "40px",
    border: "1px solid lightgrey",
    borderRadius: "20px",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: "40%"
  },
}));

const CreateGallery = () => {
  const ownerId = useSelector(state => state.session.user.id);

  const [step, setStep] = useState(1);
  const [galleryName, setGalleryName] = useState('');
  const [galleryPassword, setGalleryPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [files, setFiles] = useState(null);
  const galleryImages = useSelector(state => state.files.galleryImages);
  const id = useSelector(state => state.files.galleryId);

  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    dispatch(awsActions.fetchGalleryImages(id))
  }, [dispatch, id, step])

  const handleCreateGallery = (e) => {
    e.preventDefault();
    dispatch(awsActions.createGallery(ownerId, galleryName, galleryPassword));
    setStep(2);
  }

  const handleSubmitFiles = async (e) => {
    e.preventDefault();
    dispatch(awsActions.submitFiles(files, id));
    history.push('/')
  };

  let sessionLinks
  if (step === 1) {
    sessionLinks = (
      <Grid className={classes.root}>
        <h1>Create your gallery</h1>
        <form className={classes.form} onSubmit={handleCreateGallery}>
          <TextField
            variant="outlined"
            margin="normal"
            id="gallery-name"
            label="Gallery Name"
            name="galleryName"
            value={galleryName}
            onChange={(e) => setGalleryName(e.target.value)}
            required
          />
          <TextField
            variant="outlined"
            margin="normal"
            id="password"
            label="Password"
            type="password"
            name="password"
            value={galleryPassword}
            onChange={(e) => setGalleryPassword(e.target.value)}
            password
            required
          />
          <TextField
            variant="outlined"
            margin="normal"
            type="password"
            id="confirmPassword"
            label="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create Gallery
        </Button>
        </form>
      </Grid>
    );
  }

  if (step === 2) {
    sessionLinks = (
      <Grid className={classes.root}>
        <h1>Upload your images</h1>
        <form className={classes.form} onSubmit={handleSubmitFiles}>
          <label>Upload files</label>
          <input
            type="file"
            name="filefield"
            multiple="multiple"
            onChange={event =>
              setFiles(event.target.files)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit Files
        </Button>
        </form>
      </Grid>
    );
  }

  return (
    <>
      {sessionLinks}
    </>
  );
};

export default CreateGallery;
