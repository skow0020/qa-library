import Grid from '@material-ui/core/Grid';
import React from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    textAlign: 'center'
  }
}));

export default function Error(props) {
  const classes = useStyles();

  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      style={{ minHeight: '60vh' }}
    >
      <div className={classes.root}>
        <h3>Something went wrong!</h3>
        <p>{props.error}</p>
      </div>
    </Grid>
  );
};