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

async function loginUser(credentials) {
  return fetch('/api/users/authenticate', {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: { 'Content-Type': 'application/json' }
      })
    .then(data => data.json());
 }

export default function SignIn({ setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      email,
      password
    });
    token.error? showAlert({ message: `Error logging in: ${token.error}` }) : setToken(token);
  };

  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <AlertModal />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Library Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
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
            id="submit-button"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
        <Link id="registration-link" href="/registration" variant="body2">
          {'Don\'t have an account? Sign Up'}
        </Link>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
