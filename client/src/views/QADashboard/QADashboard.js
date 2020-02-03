import Colors from 'utils/Colors.js';
import Container from '@material-ui/core/Container';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const backgroundImage = require('images/lib1.jpg');

const useStyles = makeStyles(() => ({
  caption: {
    right: '15%',
    left: '15%',
    transform: 'translate(0%, -100%)',
    position: 'absolute'
  },
  captionText: {
    color: Colors.white
  },
  image: {
    opacity: '0.8',
    width: '100%',
    height: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
}));

export default function QADashboard() {
  const classes = useStyles();

  return (
    <Container id="welcomeDash">
      <img className={classes.image} src={backgroundImage} alt="welcome" />
      <div className={classes.caption}>
        <Typography gutterBottom className={classes.captionText} align='center' variant="h5">
          Behold! A library in which you can find everything you have ever wanted to search for!
        </Typography>
        <Typography className={classes.captionText} align='center' variant="h5">
          But not really...
        </Typography>
      </div>
    </Container>
  );
}

