import Colors from 'utils/Colors.js';
import Container from '@material-ui/core/Container';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const backgroundImage = require('images/code1.jpg');

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
    width: '100%',
    height: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
}));

export default function Info() {
  const classes = useStyles();

  return (
    <Container id="info-container">
      <img className={classes.image} src={backgroundImage} alt="info" />
      <div className={classes.caption}>
        <Typography gutterBottom className={classes.captionText} align='center' variant="h5">
          This site is a hub of resources for learning programming languages, tools, testing, and best practices across the industry
        </Typography>
        <Typography className={classes.captionText} align='center' variant="h5">
          For more information, google it
        </Typography>
      </div>
    </Container>
  );
}