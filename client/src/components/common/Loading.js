import CircularProgress from '@material-ui/core/CircularProgress';
import Colors from 'utils/Colors';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2)
    }
  },
  circular: {
    color: Colors.primary
  }
}));

export default function Loading() {
  const classes = useStyles();

  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      style={{ minHeight: '60vh' }}
    >
      <div className={classes.root}>
        <CircularProgress id="loading" className={classes.circular} />
      </div>
    </Grid>
  );
}