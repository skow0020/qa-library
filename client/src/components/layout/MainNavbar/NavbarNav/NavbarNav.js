import { Nav } from "shards-react";
import React from "react";
import UserActions from "./UserActions";

export default () => (
  <Nav navbar className="border-left flex-row">
    <UserActions />
  </Nav>
);
