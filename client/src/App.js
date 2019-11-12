import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import React from "react";
import routes from "./routes";
import withTracker from "./withTracker";

export default () => (
  <Router basename={process.env.REACT_APP_BASENAME || ""}>
    <div>
      <Switch>
        {routes.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={withTracker(props => {
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
