import Colors from 'utils/Colors';
import PropTypes from 'prop-types';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  textField: {
    backgroundColor: Colors.white
  }
}));

export default function TextField2(props) {
  const classes = useStyles();
  const {
    onChange,
    value,
    id,
    label
  } = props;

  return (
    <TextField
      id={id}
      label={label}
      value={value}
      fullWidth
      variant="outlined"
      InputProps={{
        className: classes.textField
      }} onChange={onChange}
      {...props}
    />
  );
}

TextField2.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};
