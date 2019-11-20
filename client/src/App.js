import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import LibraryLogin from "./views/LibraryLogin/LibraryLogin";
import { LoginLayout } from "./layouts";
import React from "react";
import Registration from "./views/Registration/Registration";
import routes from "./routes";
import withAuth from "./withAuth";

export default () => (
  <Router basename={process.env.REACT_APP_BASENAME || ""}>
    <div>
      <Switch>
        <Route path="/library-login" component={LibraryLogin} layout={LoginLayout} />
        <Route path="/registration" component={Registration} layout={LoginLayout} />
        {routes.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={withAuth(props => {
                return (
                  <route.layout {...props}>
                    <route.component {...props} />
                  </route.layout>
                );
              })}
            />
          );
        })}
      </Switch>
    </div>
  </Router>
);
