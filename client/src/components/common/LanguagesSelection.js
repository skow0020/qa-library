import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import Select from '@material-ui/core/Select';
import { Store } from '../../flux';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150
  }
}));

export default function LanguagesSelection(props) {
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor="language-selection">Language</InputLabel>
      <Select type="text" onChange={props.onChange} {...props}>
        {Store.getLanguages().map((language, idx) => (
          <MenuItem key={`language-option-${idx}`} value={language}>{language}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};