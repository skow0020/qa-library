import {
  Form,
  FormInput,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "shards-react";

import React from "react";

export default () => (
  <Form className="main-navbar__search w-100 d-none d-md-flex d-lg-flex">
    <InputGroup seamless className="ml-3">
      <InputGroupAddon type="prepend">
        <InputGroupText>
          <i className="material-icons">search</i>
        </InputGroupText>
      </InputGroupAddon>
      <label className="text-muted font-weight-bold" htmlFor="navbar-search" style={{display: "none"}}>Search</label> 
      <FormInput
        id="navbar-search"
        className="navbar-search"
        placeholder="Search for something..."
      />
    </InputGroup>
  </Form>
);
