import {
  Container,
  InputGroup,
  InputGroupText,
  NavLink,
  Navbar
} from "shards-react";

import { Link } from "react-router-dom";
import NavbarNav from "./NavbarNav/NavbarNav";
import NavbarToggle from "./NavbarToggle";
import React from "react";
import classNames from "classnames";

class MainNavbar extends React.Component {
  render() {
    const classes = classNames(
      "main-navbar",
      "bg-white",
      "sticky-top"
    );

    return (
      <div className={classes}>
        <Container className="p-0">
          <Navbar type="light" className="align-items-stretch flex-md-nowrap p-0">
            <InputGroup className="ml-3">
              <NavLink id="search-button" tag={Link} to={'/search'}>
                <InputGroupText>
                  <i className="material-icons">search</i>
                </InputGroupText>
              </NavLink>
            </InputGroup>
            <NavbarNav />
            <NavbarToggle />
          </Navbar>
        </Container>
      </div>
    );
  }
}

MainNavbar.defaultProps = {
  stickyTop: true
};

export default MainNavbar;
