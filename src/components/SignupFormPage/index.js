import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CameraIcon from '@material-ui/icons/Camera';
import { makeStyles } from '@material-ui/core/styles';
import * as sessionActions from "../../store/session";
import './SignupForm.css'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: "center",
  },
  title: {
    textAlign: 'center',
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
  paper: {
    margin: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    width: '100vw', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: "20px",
  },
  killmenow: {
    width: '100%',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: "200px",
  },
}))

const SignupFormPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState('');
  const classes = useStyles();
  const history = useHistory();

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(res => {
          if (res.data && res.data.errors) {
            setErrors(res.data.errors)
          } else {
            history.push('/')
          }
        });
    }
    return setErrors(['Passwords do not match']);
  };

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <CameraIcon />
          </Avatar>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              id="email"
              label="Email Address"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              variant="outlined"
              margin="normal"
              id="username"
              label="Desired User Name"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <TextField
              variant="outlined"
              margin="normal"
              id="password"
              label="Password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              Sign Up
          </Button>
          </form>
          <ul>
            {errors &&
              errors.map((error, idx) =>
                <li key={idx}>{error}</li>)}
          </ul>
        </div>
      </Grid>
    </Grid>
  )
}

export default SignupFormPage
