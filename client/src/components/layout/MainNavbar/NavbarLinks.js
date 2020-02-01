import Button from 'components/common/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import { Link } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Person from '@material-ui/icons/Person';
import Poppers from '@material-ui/core/Popper';
import React from 'react';
import Search from '@material-ui/icons/Search';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/components/headerLinksStyle.js';

const useStyles = makeStyles(styles);

export default function NavbarLinks() {
  const classes = useStyles();
  const [openMenu, setOpenMenu] = React.useState(null);

  const handleClickMenu = event => {
    if (openMenu && openMenu.contains(event.target)) {
      setOpenMenu(null);
    } else {
      setOpenMenu(event.currentTarget);
    }
  };

  const handleCloseProfile = () => {
    setOpenMenu(null);
  };
  return (
    <div>
      <div className={classes.searchWrapper}>
        <Button id='search-button' color="white" aria-label="edit" justIcon round href='/search'>
          <Search />
        </Button>
      </div>

      <div className={classes.manager}>
        <Button
          id="user-avatar"
          color={window.innerWidth > 959 ? 'transparent' : 'white'}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={openMenu ? 'profile-menu-list-grow' : null}
          aria-haspopup="true"
          onClick={handleClickMenu}
          className={classes.buttonLink}
        >
          <Person className={classes.icons} />
        </Button>
        <Poppers
          open={Boolean(openMenu)}
          anchorEl={openMenu}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openMenu }) +
            ' ' +
            classes.popperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="profile-menu-list-grow"
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'center top' : 'center bottom'
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseProfile}>
                  <MenuList role="menu">
                    <MenuItem
                      className={classes.dropdownItem}
                      component={Link} to="/info"
                    >
                      Info
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
    </div>
  );
}
