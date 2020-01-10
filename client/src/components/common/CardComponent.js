import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Colors from 'utils/Colors';
import PropTypes from "prop-types";
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { getCategoryTheme } from "utils/util";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  cardImage: {
    position: "relative",
    minHeight: "10.3125rem",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  }
}));

export default function ComponentCard(props) {
  const classes = useStyles();
  const { idx, url, title, subheader, category, backgroundImage, body, urlTarget, pdf, children } = props;

  return (
    <Card id={idx}>
      <a href={url} target={urlTarget} rel="noopener noreferrer" aria-label="Navigate to the article url" style={{ color: Colors.black }}>
        <CardHeader
          titleTypographyProps={{ variant: 'h6' }}
          title={title}
          subheader={subheader}
          avatar={
            <Avatar aria-label="category" style={{ backgroundColor: getCategoryTheme(category) }}>
              {category.substring(0, 3)}
            </Avatar>
          }
        />
        <div
          className={classes.cardImage}
          style={{ backgroundImage: `url('${backgroundImage}')` }}
        />
      </a>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {body}
        </Typography>
        {pdf && <a className="text-fiord-blue" href={pdf} target="_blank" rel="noopener noreferrer">PDF Version</a>}
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
  category: PropTypes.string.isRequired,
  backgroundImage: PropTypes.string.isRequired,
  body: PropTypes.string,
  pdf: PropTypes.string
};