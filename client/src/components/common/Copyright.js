import Link from '@material-ui/core/Link';
import React from 'react';
import Typography from '@material-ui/core/Typography';

export default function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/skow0020">
        Colin Skow
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}