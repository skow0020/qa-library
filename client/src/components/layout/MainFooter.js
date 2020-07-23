import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/components/footerStyle.js';

const useStyles = makeStyles(styles);

export default function Footer() {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a href="/qa-dashboard" className={classes.block}>
                Home
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="/info" className={classes.block}>
                Info
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="https://skow-contact-form.herokuapp.com" className={classes.block}>
                Contact
              </a>
            </ListItem>
          </List>
        </div>
        <p className={classes.right}>
          &copy; {1900 + new Date().getYear()}{' '}
          <a
            href="https://www.github.com/skow0020"
            target="_blank"
            rel="noopener noreferrer"
            className={classes.a}
          >
            Colin Skow
          </a>
        </p>
      </div>
    </footer>
  );
}
