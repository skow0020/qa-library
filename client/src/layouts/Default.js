import "perfect-scrollbar/css/perfect-scrollbar.css";

import { Route, Switch } from "react-router-dom";

import MainFooter from "../components/layout/MainFooter";
import MainNavbar from "../components/layout/MainNavbar/MainNavbar";
import MainSidebar from "../components/layout/MainSidebar";
import PerfectScrollbar from "perfect-scrollbar";
import React from "react";
import bgImage from "../images/lib1.jpg";
import logo from "../images/book-logo.svg";
import { makeStyles } from '@material-ui/core/styles';
import routes from "../routes.js";
import withAuth from "withAuth";

let ps;

const switchRoutes = (
  <Switch>
    {routes.map((route, key) => {
      return (
        <Route
          path={route.path}
          component={withAuth(props => {
            return (
              <div>
                <route.component {...props} />
              </div>
            );
          })}
          key={key}
        />
      );
    })}
  </Switch>
);

const useStyles = makeStyles(theme => ({
  wrapper: {
    position: "relative",
    top: "0",
    height: "100vh"
  },
  mainPanel: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - 260px)`
    },
    overflow: "auto",
    position: "relative",
    float: "right",
    transition: "all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)",
    maxHeight: "100%",
    width: "100%",
    overflowScrolling: "touch"
  },
  content: {
    marginTop: "70px",
    padding: "30px 15px",
    minHeight: "calc(100vh - 123px)"
  },
  container: {
    paddingRight: "15px",
    paddingLeft: "15px",
    marginRight: "auto",
    marginLeft: "auto"
  }
}));

export default function DefaultLayout({ ...rest }) {
  const classes = useStyles();
  const mainPanel = React.createRef();

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [image] = React.useState(bgImage);
  const [color] = React.useState("green");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };

  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);

    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);

  return (
    <div className={classes.wrapper}>
      <MainSidebar
        routes={routes}
        logoText={"QA Library"}
        logo={logo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <MainNavbar
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        <div className={classes.content}>
          <div className={classes.container}>{switchRoutes}</div>
        </div>f
        <MainFooter />
      </div>
    </div>
  );
};
