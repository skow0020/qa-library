import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';

export default function PageTitle({ title }) {
  return (
      <Typography gutterBottom className="page-title" variant="h3">
        {title}
      </Typography>
  );
};

PageTitle.propTypes = {
  title: PropTypes.string.isRequired
};