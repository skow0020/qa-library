import {
  Collapse,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  NavItem,
  NavLink
} from "shards-react";

import { Link } from "react-router-dom";
import React from "react";

export default class UserActions extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      visible: false
    };

    this.toggleUserActions = this.toggleUserActions.bind(this);
  }

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible
    });
  }

  render() {
    return (
      <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
        <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
          <img
            className="user-avatar rounded-circle mr-2"
            src={require("./../../../../images/avatars/question.png")}
            alt="User Avatar"
          />{" "}
          <span className="d-none d-md-inline-block"></span>
        </DropdownToggle>
        <Collapse tag={DropdownMenu} right small open={this.state.visible}>
          <DropdownItem tag={Link} to="info">
            <i className="material-icons">&#xE7FD;</i> Info
          </DropdownItem>
        </Collapse>
      </NavItem>
    );
  }
}
