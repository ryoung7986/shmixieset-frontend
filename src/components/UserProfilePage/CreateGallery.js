import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CameraIcon from '@material-ui/icons/Camera';
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
  const galleryOwner = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const classes = useStyles();

  const [step, setStep] = useState(1);
  const [galleryName, setGalleryName] = useState('');
  const [galleryPassword, setGalleryPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [galleryUrl, setGalleryUrl] = useState('');
  const [files, setFiles] = useState(null);

  const nextStep = () => {
    setStep(step + 1);
  }

  const submitFiles = async (e) => {
    e.preventDefault();
    return dispatch(awsActions.submitFiles(files));
  };

  return (
    <Grid className={classes.root}>
      <h1>Create your gallery</h1>
      <form className={classes.form} onSubmit={submitFiles}>
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
          Submit
        </Button>
      </form>
    </Grid>
  );
};

export default CreateGallery;
