import AppBar from '@material-ui/core/AppBar';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/icons/Menu';
import NavbarLinks from './NavbarLinks';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/components/headerStyle.js';

const useStyles = makeStyles(styles);

function MainNavbar(props) {
  const classes = useStyles();

  const { color } = props;
  const appBarClasses = classNames({
    [' ' + classes[color]]: color
  });

  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          <Typography>Hi, {props.authedUser}</Typography>
        </div>
        <Hidden smDown implementation="css">
          <NavbarLinks />
        </Hidden>
        <Hidden mdUp implementation="css">
          <IconButton
            id="mobile-menu"
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(MainNavbar)