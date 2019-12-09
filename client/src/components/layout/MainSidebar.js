import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/components/sidebarStyle.js";

const useStyles = makeStyles(styles);

export default function MainSidebar(props) {
  const classes = useStyles();

  function activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
  }

  function closeIfMobile() {
    if (props.open) props.handleDrawerToggle();
  }

  const { color, logo, image, logoText, routes } = props;

  var links = (
    <List className={classes.list}>
      {routes.map((prop, key) => {
        const whiteFontClasses = classNames({
          [" " + classes.whiteFont]: activeRoute(prop.path)
        });
        var listItemClasses;

        if (prop.icon) {
          listItemClasses = classNames({
            [" " + classes[color]]: activeRoute(prop.path)
          });

          return (
            <NavLink
              to={prop.path}
              onClick={closeIfMobile}
              className={classes.item}
              activeClassName="active"
              key={key}
            >
              <ListItem button className={classes.itemLink + listItemClasses}>
                <prop.icon className={classNames(classes.itemIcon, whiteFontClasses)} />
                <ListItemText
                  primary={prop.name}
                  className={classNames(classes.itemText, whiteFontClasses)}
                  disableTypography={true}
                />
              </ListItem>
            </NavLink>
          );
        }
        return false;
      })}
    </List>
  );

  var brand = (
    <div className={classes.logo}>
      <div className={classes.logoLink}>
        <div className={classes.logoImage}>
          <img src={logo} alt="logo" className={classes.img} />
        </div>
        {logoText}
      </div>
    </div>
  );
  
  return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor="right"
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper)
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            {links}
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          id="drawer-sidebar"
          anchor="left"
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.drawerPaper)
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
}

MainSidebar.propTypes = {
  handleDrawerToggle: PropTypes.func,
  bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
  logo: PropTypes.string,
  image: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool
};
