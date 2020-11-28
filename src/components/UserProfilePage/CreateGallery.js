import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import * as awsActions from "../../store/aws";


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    display: "flex",
    alignItems: 'center',
    flexDirection: 'column',
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

  const dispatch = useDispatch();
  const classes = useStyles();

  const nextStep = (e) => {
    e.preventDefault(e)
    dispatch(awsActions.createGallery(ownerId, galleryName, galleryPassword));
    setStep(2);
  }

  const handleSubmit = async (e) => {
    console.log("submit");
  }

  const submitFiles = async (e) => {
    e.preventDefault();
    dispatch(awsActions.submitFiles(files));
    step = 1;
    console.log("STEP", step);
  };

  let sessionLinks
  if (step === 1) {
    sessionLinks = (
      <Grid className={classes.root}>
        <h1>Create your gallery</h1>
        <form className={classes.form} onSubmit={nextStep}>
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

  if (step !== 1) {
    sessionLinks = (
      <Grid className={classes.root}>
        <h1>Upload your images</h1>
        <form className={classes.form} onSubmit={handleSubmit}>
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
