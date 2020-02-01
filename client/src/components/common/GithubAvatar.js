import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7)
  }
}));

export default function GithubAvatar({ avatarUrl }) {
  const classes = useStyles();

  return (
    <Grid container alignItems="center">
      <Avatar alt="User Avatar" src={avatarUrl} className={classes.avatar} />
    </Grid>
  );
}
GithubAvatar.propTypes = {
  avatarUrl: PropTypes.string.isRequired
};