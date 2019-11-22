import { Container, Row } from "shards-react";

import PropTypes from "prop-types";
import React from "react";

const LoginFooter = ({ copyright }) => (
  <footer className="main-footer d-flex p-2 px-3 bg-white border-top">
    <Container>
      <Row>
        <span className="copyright ml-auto my-auto mr-2">{copyright}</span>
      </Row>
    </Container>
  </footer>
);

LoginFooter.propTypes = {
  /**
   * The copyright info.
   */
  copyright: PropTypes.string
};

LoginFooter.defaultProps = {
  contained: false,
  copyright: "Copyright © 2018 DesignRevision"
};

export default LoginFooter;