import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";
import "assets/css/material-dashboard-react.css?v=1.8.0";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import { DefaultLayout } from "./layouts/index";
import LibraryLogin from "./views/LibraryLogin/LibraryLogin";
import React from "react";
import Registration from "./views/Registration/Registration";

export default () => (
  <Router>
    <div>
      <Switch>
        <Route path="/library-login" component={LibraryLogin} />
        <Route path="/registration" component={Registration} />
        <Route path="/" component={DefaultLayout} />
      </Switch>
    </div>
  </Router>
);
