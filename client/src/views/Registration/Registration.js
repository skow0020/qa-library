import AlertModal, { showAlert } from 'components/common/AlertModal';
import React, { useState } from 'react';

import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Colors from 'utils/Colors';
import Container from '@material-ui/core/Container';
import Copyright from 'components/common/Copyright';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Navigate  } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: Colors.primary
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: Colors.primary,
    color: Colors.white
  }
}));

export default function Registration() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registered, setRegistered] = useState(false);

  function onSubmit(event) {
    event.preventDefault();
    fetch('/api/users/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(res => {
        if (res.success) setRegistered(true);
        else showAlert({ message: res.error });
      });
  }

  const classes = useStyles();
  if (registered) return <Navigate  to='/' />;
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <AlertModal />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Library Registration
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => { setEmail(e.target.value); }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => { setPassword(e.target.value); }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            id="registration-button"
            className={classes.submit}
          >
            Register
          </Button>
        </form>
        <Link id="login-link" href="/library-login" variant="body2">
          {'Go Log in'}
        </Link>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
