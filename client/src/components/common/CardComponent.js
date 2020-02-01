import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Colors from 'utils/Colors';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  cardImage: {
    position: 'relative',
    minHeight: '10.3125rem',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }
}));

export default function ComponentCard(props) {
  const classes = useStyles();
  const { idx, url, title, subheader, avatar, backgroundImage, body, urlTarget, children } = props;

  return (
    <Card id={idx} className="card-post">
      <a href={url} target={urlTarget} rel="noopener noreferrer" aria-label="Navigate to the url" style={{ color: Colors.black }}>
        <CardHeader
          titleTypographyProps={{ variant: 'h6' }}
          title={title}
          subheader={subheader}
          avatar={avatar}
        />
        {backgroundImage ? <div
          className={classes.cardImage}
          style={{ backgroundImage: `url('${backgroundImage}')` }}
        /> : undefined}
      </a>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {body}
        </Typography>
        {children}
      </CardContent>
    </Card>
  );
}
ComponentCard.propTypes = {
  idx: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  urlTarget: PropTypes.string,
  title: PropTypes.string.isRequired,
  subheader: PropTypes.string,
  avatar: PropTypes.element,
  backgroundImage: PropTypes.string,
  body: PropTypes.string
};