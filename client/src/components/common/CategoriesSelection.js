import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import Select from '@material-ui/core/Select';
import { Store } from "../../flux";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

export default function CategoriesSelection(props) {
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor="category">Categories</InputLabel>
      <Select type="text" onChange={props.onChange} {...props}>
        {Store.getCategoryOptions().map((category, idx) => (
          <MenuItem key={`category-option-${idx}`} value={category}>{category}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
