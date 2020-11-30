import { useState } from 'react';
import { useDispatch } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import * as sessionActions from '../../store/session';

const useStyles = makeStyles((theme) => ({
  navbar: {
    textAlign: "center",
  },
  navbarTitle: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  menuItem: {
    textDecoration: "none",
  }
}))

const NavBar = ({ sessionUser }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navclass = useStyles();
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  let sessionOptions;
  if (sessionUser) {
    sessionOptions = (
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link to="/" className={navclass.menuItem}>
          <MenuItem onClick={handleClose}>
            Home
          </MenuItem>
        </Link>
        <Link to="/" className={navclass.menuItem}>
          <MenuItem onClick={handleClose}>
            Profile
          </MenuItem>
        </Link>
        <Link to="/" className={navclass.menuItem}>
          <MenuItem onClick={logout}>
            Log Out
          </MenuItem>
        </Link>
      </Menu>
    )
  } else {
    sessionOptions = (
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link to="/signin" className={navclass.menuItem}>
          <MenuItem onClick={handleClose}>
            Sign In
          </MenuItem>
        </Link>
        <Link to="/signup" className={navclass.menuItem}>
          <MenuItem onClick={handleClose}>
            Sign Up
          </MenuItem>
        </Link>
      </Menu>
    )
  }

  return (
    <AppBar className={navclass.navbar}>
      <Toolbar>
        <IconButton edge="start"
          className={navclass.menuButton}
          color="inherit"
          aria-label="menu"
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MenuIcon />
        </IconButton>
        {sessionOptions}
        <Typography variant="h6" className={navclass.navbarTitle}>
          Shmixieset
          </Typography>
        {/* {sessionUser && <ProfileButton className={navclass.profileButton} />} */}
      </Toolbar>
    </AppBar>
  )
}

export default NavBar;
